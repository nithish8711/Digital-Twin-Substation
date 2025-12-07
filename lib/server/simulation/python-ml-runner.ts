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
      
      // Check if stdout contains a JSON error object (Python script may return error as JSON)
      let stdoutError: any = null
      if (stdout.trim()) {
        try {
          const parsed = JSON.parse(stdout.trim())
          if (parsed && typeof parsed === "object" && "error" in parsed) {
            stdoutError = parsed
          }
        } catch {
          // Not JSON or not an error object, continue
        }
      }

      // If stdout has content and stderr only contains warnings, treat as success
      // This handles cases where TensorFlow writes to stderr but the script succeeds
      if (code === 0 || (stdout.trim().length > 0 && allLinesAreWarnings && !stdoutError)) {
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
        } else if (stdoutError) {
          // Python script returned an error in JSON format
          reject(new Error(stdoutError.error || "Python script returned an error"))
        } else {
          resolve(stdout.trim())
        }
      } else {
        // Only reject if there are actual errors (not just TensorFlow warnings)
        if (allLinesAreWarnings && stdout.trim().length > 0 && !stdoutError) {
          // Stderr only has warnings but we have stdout, so treat as success
          resolve(stdout.trim())
        } else {
          // There are real errors
          if (stdoutError) {
            // Python script returned error as JSON
            const errorMsg = stdoutError.error || "Python script error"
            console.error("[Python ML] Python script error:", stdoutError)
            reject(new Error(errorMsg))
          } else {
            const errorMsg = stderr.trim() || `Python exited with code ${code}`
            console.error("[Python ML] Execution error:", { code, stderr: stderr.trim(), stdout: stdout.trim().substring(0, 200) })
            reject(new Error(errorMsg))
          }
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

  console.log("[Python ML Runner] Executing command:", args.join(" "))
  const output = await runCommand(args)
  console.log("[Python ML Runner] Raw output length:", output.length, "characters")

  // The Python script may emit auxiliary JSON lines (e.g. warnings) or logs
  // before the final prediction payload. We only want to parse the last
  // well-formed JSON object from stdout.
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (lines.length === 0) {
    console.error("[Python ML Runner] Empty output from script")
    throw new Error("Empty output from simulation_predictor.py")
  }

  console.log("[Python ML Runner] Output lines:", lines.length)
  console.log("[Python ML Runner] Last few lines:", lines.slice(-3))

  // Find the last valid JSON object
  let candidate: string | null = null
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    if (line.startsWith("{") && line.endsWith("}")) {
      try {
        // Try to parse to verify it's valid JSON
        JSON.parse(line)
        candidate = line
        break
      } catch {
        // Not valid JSON, continue searching
        continue
      }
    }
  }

  if (!candidate) {
    console.error("[Python ML Runner] No valid JSON found in output")
    console.error("[Python ML Runner] All lines:", lines)
    throw new Error("No valid JSON output found from simulation_predictor.py")
  }

  try {
    const parsed = JSON.parse(candidate)
    console.log("[Python ML Runner] Successfully parsed prediction:", {
      keys: Object.keys(parsed),
      sampleValues: Object.fromEntries(Object.entries(parsed).slice(0, 5))
    })
    return parsed
  } catch (parseError) {
    console.error("[Python ML Runner] JSON parse error:", parseError)
    console.error("[Python ML Runner] Candidate line:", candidate)
    throw new Error(`Failed to parse JSON from simulation_predictor.py: ${parseError instanceof Error ? parseError.message : String(parseError)}`)
  }
}




