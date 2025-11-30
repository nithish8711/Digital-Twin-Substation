import { spawn } from "node:child_process"
import path from "node:path"

import type { ComponentType } from "@/lib/analysis-config"

const runCommand = (args: string[]) =>
  new Promise<string>((resolve, reject) => {
    // Prefer explicit Python 3 path to avoid accidentally using a Python 2.x
    // installation (which cannot run type-annotated code like simulation_predictor.py).
    const defaultCmd =
      process.env.PYTHON_PATH ||
      (process.platform === "win32"
        ? "C:\\Users\\Lenovo\\AppData\\Local\\Programs\\Python\\Python313\\python.exe"
        : "python3")

    const subprocess = spawn(defaultCmd, args, { stdio: ["ignore", "pipe", "pipe"] })
    let stdout = ""
    let stderr = ""

    subprocess.stdout.on("data", (chunk) => {
      stdout += chunk.toString()
    })
    subprocess.stderr.on("data", (chunk) => {
      stderr += chunk.toString()
    })
    subprocess.on("error", (error) => reject(error))
    subprocess.on("close", (code) => {
      // Filter out known TensorFlow/info messages from stderr - these are non-fatal
      const warningPatterns = [
        /InconsistentVersionWarning/i,
        /Trying to unpickle estimator/i,
        /TensorFlow binary is optimized/i,
        /CPU instructions/i,
        /oneDNN custom operations/i,
        /tensorflow\/core\/util\/port/i,
        /tensorflow\/core\/platform\/cpu_feature_guard/i,
        /floating-point round-off errors/i,
        /To enable the following instructions/i,
        /rebuild TensorFlow/i,
        /I tensorflow/i, // TensorFlow info messages
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+: I tensorflow/i, // Timestamped TensorFlow messages
      ]
      
      // Split stderr into lines and check if all lines match warning patterns
      const stderrLines = stderr.split(/\r?\n/).filter((line) => line.trim().length > 0)
      const allLinesAreWarnings = stderrLines.length === 0 || 
        stderrLines.every((line) => 
          warningPatterns.some((pattern) => pattern.test(line))
        )
      
      // If stdout has content and stderr only contains warnings, treat as success
      // This handles cases where TensorFlow writes to stderr but the script succeeds
      if (code === 0 || (stdout.trim().length > 0 && allLinesAreWarnings)) {
        // If stderr contains only warnings/info messages, log them but don't fail
        if (stderr && allLinesAreWarnings) {
          // Only log if there are actual warnings (not just TensorFlow info)
          const hasActualWarnings = warningPatterns.slice(0, 2).some((pattern) => 
            stderrLines.some((line) => pattern.test(line))
          )
          if (hasActualWarnings) {
            console.warn("[Python ML] Non-fatal warnings:", stderr.trim())
          }
          // TensorFlow info messages are silently ignored
        } else if (stderr && !allLinesAreWarnings) {
          // If there are actual errors (not just warnings), log them
          console.error("[Python ML] stderr output:", stderr.trim())
        }
        
        if (stdout.trim().length === 0) {
          reject(new Error("Empty output from Python script"))
        } else {
          resolve(stdout.trim())
        }
      } else {
        // Only reject if there are actual errors (not just TensorFlow warnings)
        if (allLinesAreWarnings && stdout.trim().length > 0) {
          // Stderr only has warnings but we have stdout, so treat as success
          resolve(stdout.trim())
        } else {
          // There are real errors
          const errorMsg = stderr.trim() || `Python exited with code ${code}`
          reject(new Error(errorMsg))
        }
      }
    })
  })

export async function invokeSimulationPredictor(opts: {
  componentType: ComponentType
  substationId: string
  inputValues: Record<string, any>
}) {
  const { componentType, substationId, inputValues } = opts
  const scriptPath = path.join(process.cwd(), "backend", "ml", "simulation_predictor.py")
  const args = [
    scriptPath,
    "--component",
    componentType,
    "--substation",
    substationId,
    "--inputs",
    JSON.stringify(inputValues),
  ]

  const output = await runCommand(args)

  // The Python script may emit auxiliary JSON lines (e.g. warnings) or logs
  // before the final prediction payload. We only want to parse the last
  // well-formed JSON object from stdout.
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (lines.length === 0) {
    throw new Error("Empty output from simulation_predictor.py")
  }

  const candidate =
    [...lines].reverse().find((line) => line.startsWith("{") && line.endsWith("}")) ?? lines[lines.length - 1]

  return JSON.parse(candidate)
}




