"use client"

import * as THREE from "three"
import { applyGlow, getGlowColor } from "@/lib/live-trend/glow-utils"
import { createTransformerFallbackModel } from "./transformer-fallback-model"

export function createFallbackModel(
  componentType: "transformer" | "bayLines" | "circuitBreaker" | "isolator" | "busbar" | "substation",
  glowData: Record<string, number | string> = {},
  showGlow: boolean = false
): THREE.Group {
  const group = new THREE.Group()

  switch (componentType) {
    case "transformer":
      createTransformerModel(group, glowData, showGlow)
      break
    case "bayLines":
      createBayLinesModel(group, glowData, showGlow)
      break
    case "circuitBreaker":
      createCircuitBreakerModel(group, glowData, showGlow)
      break
    case "isolator":
      createIsolatorModel(group, glowData, showGlow)
      break
    case "busbar":
      createBusbarModel(group, glowData, showGlow)
      break
    case "substation":
      createSubstationModel(group)
      break
  }

  return group
}

function createTransformerModel(
  group: THREE.Group,
  glowData: Record<string, number | string>,
  showGlow: boolean
) {
  // Use the detailed transformer model
  const transformerModel = createTransformerFallbackModel(glowData, showGlow)
  group.add(transformerModel)
}

function createBayLinesModel(
  group: THREE.Group,
  glowData: Record<string, number | string>,
  showGlow: boolean
) {
  // Towers
  const towerGeometry = new THREE.BoxGeometry(0.3, 4, 0.3)
  const towerMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a })
  
  for (let i = 0; i < 3; i++) {
    const tower = new THREE.Mesh(towerGeometry, towerMaterial.clone())
    tower.position.set(-2 + i * 2, 2, 0)
    group.add(tower)
  }

  // Insulators (stacked torus/cylinder)
  const insulatorGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16)
  const insulatorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const insulator = new THREE.Mesh(insulatorGeometry, insulatorMaterial.clone())
      insulator.position.set(-2 + i * 2, 3.5 + j * 0.4, 0)
      group.add(insulator)
    }
  }

  // CT (torus + cylinder)
  const ctGeometry = new THREE.TorusGeometry(0.4, 0.15, 8, 16)
  const ctMaterial = new THREE.MeshStandardMaterial({ color: 0x8a8a8a })
  const ct = new THREE.Mesh(ctGeometry, ctMaterial)
  ct.position.set(0, 4.5, 0)
  ct.rotation.x = Math.PI / 2
  group.add(ct)

  // VT (box + cylinder)
  const vtBoxGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.5)
  const vtBoxMaterial = new THREE.MeshStandardMaterial({ color: 0x6a6a6a })
  const vtBox = new THREE.Mesh(vtBoxGeometry, vtBoxMaterial)
  vtBox.position.set(1.5, 4.5, 0)
  group.add(vtBox)

  const vtCylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16)
  const vtCylinder = new THREE.Mesh(vtCylinderGeometry, vtBoxMaterial.clone())
  vtCylinder.position.set(1.5, 4.9, 0)
  group.add(vtCylinder)

  // Power lines
  const lineGeometry = new THREE.CylinderGeometry(0.05, 0.05, 4, 8)
  const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc })
  for (let i = 0; i < 3; i++) {
    const line = new THREE.Mesh(lineGeometry, lineMaterial.clone())
    line.position.set(-2 + i * 2, 4.5, 0)
    line.rotation.z = Math.PI / 2
    group.add(line)
  }

  if (showGlow && Object.keys(glowData).length > 0) {
    Object.entries(glowData).forEach(([key, value]) => {
      const glowColor = getGlowColor(key, value)
      if (glowColor) {
        applyGlow(group, glowColor)
      }
    })
  }
}

function createCircuitBreakerModel(
  group: THREE.Group,
  glowData: Record<string, number | string>,
  showGlow: boolean
) {
  // Chamber (box)
  const chamberGeometry = new THREE.BoxGeometry(1.5, 2, 1.5)
  const chamberMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a })
  const chamber = new THREE.Mesh(chamberGeometry, chamberMaterial)
  chamber.position.set(0, 1, 0)
  group.add(chamber)

  // SF6 tank (cylinder)
  const tankGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 16)
  const tankMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a })
  const tank = new THREE.Mesh(tankGeometry, tankMaterial)
  tank.position.set(0, 2.5, 0)
  group.add(tank)

  // Linkage mechanism (small boxes)
  const linkageGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.2)
  const linkageMaterial = new THREE.MeshStandardMaterial({ color: 0x5a5a5a })
  for (let i = 0; i < 3; i++) {
    const linkage = new THREE.Mesh(linkageGeometry, linkageMaterial.clone())
    linkage.position.set(-0.6 + i * 0.6, 0.5, 0)
    group.add(linkage)
  }

  // Breaker arm (for animation)
  const armGeometry = new THREE.BoxGeometry(0.3, 1.5, 0.3)
  const armMaterial = new THREE.MeshStandardMaterial({ color: 0x6a6a6a })
  const arm = new THREE.Mesh(armGeometry, armMaterial)
  arm.position.set(0, 0.75, 0.8)
  arm.rotation.x = -0.3
  group.add(arm)
  group.userData.breakerArm = arm

  if (showGlow && Object.keys(glowData).length > 0) {
    Object.entries(glowData).forEach(([key, value]) => {
      const glowColor = getGlowColor(key, value)
      if (glowColor) {
        applyGlow(group, glowColor)
      }
    })
  }
}

function createIsolatorModel(
  group: THREE.Group,
  glowData: Record<string, number | string>,
  showGlow: boolean
) {
  // Vertical column (cylinders)
  const columnGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 16)
  const columnMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a })
  const column = new THREE.Mesh(columnGeometry, columnMaterial)
  column.position.set(0, 1.5, 0)
  group.add(column)

  // Switch blade (rotating box)
  const bladeGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.3)
  const bladeMaterial = new THREE.MeshStandardMaterial({ color: 0x6a6a6a })
  const blade = new THREE.Mesh(bladeGeometry, bladeMaterial)
  blade.position.set(0, 2.5, 0.2)
  blade.rotation.z = -0.5
  group.add(blade)
  group.userData.switchBlade = blade

  // Base
  const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16)
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3a3a })
  const base = new THREE.Mesh(baseGeometry, baseMaterial)
  base.position.set(0, 0.1, 0)
  group.add(base)

  // Status-based glow
  if (showGlow && glowData.status) {
    const status = String(glowData.status).toUpperCase()
    const glowColor = status === "OPEN" ? "#808080" : "#00FF00"
    applyGlow(group, glowColor)
  }
}

function createBusbarModel(
  group: THREE.Group,
  glowData: Record<string, number | string>,
  showGlow: boolean
) {
  // Conductor (long cylinder)
  const conductorGeometry = new THREE.CylinderGeometry(0.15, 0.15, 6, 16)
  const conductorMaterial = new THREE.MeshStandardMaterial({ color: 0x8a8a8a })
  const conductor = new THREE.Mesh(conductorGeometry, conductorMaterial)
  conductor.position.set(0, 2, 0)
  conductor.rotation.z = Math.PI / 2
  group.add(conductor)

  // Joints (spheres)
  const jointGeometry = new THREE.SphereGeometry(0.25, 16, 16)
  const jointMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
  for (let i = 0; i < 3; i++) {
    const joint = new THREE.Mesh(jointGeometry, jointMaterial.clone())
    joint.position.set(-2 + i * 2, 2, 0)
    group.add(joint)
  }

  // Supports (boxes)
  const supportGeometry = new THREE.BoxGeometry(0.3, 1.5, 0.3)
  const supportMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a })
  for (let i = 0; i < 3; i++) {
    const support = new THREE.Mesh(supportGeometry, supportMaterial.clone())
    support.position.set(-2 + i * 2, 0.75, 0)
    group.add(support)
  }

  if (showGlow && Object.keys(glowData).length > 0) {
    Object.entries(glowData).forEach(([key, value]) => {
      const glowColor = getGlowColor(key, value)
      if (glowColor) {
        applyGlow(group, glowColor)
      }
    })
  }
}

function createSubstationModel(group: THREE.Group) {
  // Materials inspired by the detailed transformer fallback
  const matSteelGalv = new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.5, metalness: 0.4 })
  const matSteelPaint = new THREE.MeshStandardMaterial({ color: 0x546e7a, roughness: 0.4, metalness: 0.2 })
  const matPorcelain = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.1, metalness: 0 })
  const matGreyIns = new THREE.MeshStandardMaterial({ color: 0xcfd8dc, roughness: 0.4, metalness: 0.1 })
  const matConductor = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.5, metalness: 0.5 })
  const matConcrete = new THREE.MeshStandardMaterial({ color: 0x9e9e9e, roughness: 0.9, metalness: 0 })

  // Helper: small concrete foundation
  const foundation = (w: number, d: number, h = 0.25) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matConcrete)
    mesh.position.y = h / 2
    return mesh
  }

  // Helper: simple lattice tower
  const latticeTower = (h: number, w = 0.6, d = 0.6) => {
    const g = new THREE.Group()
    const legGeo = new THREE.BoxGeometry(0.08, h, 0.08)
    const pos = [
      [-w / 2, -d / 2],
      [w / 2, -d / 2],
      [-w / 2, d / 2],
      [w / 2, d / 2],
    ]
    pos.forEach(([x, z]) => {
      const leg = new THREE.Mesh(legGeo, matSteelGalv)
      leg.position.set(x, h / 2, z)
      g.add(leg)
    })
    // Cross beam
    const beam = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.08, d + 0.2), matSteelGalv)
    beam.position.y = h
    g.add(beam)
    return g
  }

  // Helper: slim insulator stack
  const insulatorStack = (h: number, r: number) => {
    const stack = new THREE.Group()
    const core = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.4, r * 0.4, h, 12), matPorcelain)
    stack.add(core)
    const sheds = Math.max(6, Math.floor(h * 6))
    const shedGeo = new THREE.CylinderGeometry(r, r * 0.7, 0.02, 12)
    const spacing = h / sheds
    for (let i = 0; i < sheds; i++) {
      const shed = new THREE.Mesh(shedGeo, matPorcelain)
      shed.position.y = -h / 2 + i * spacing + spacing / 2
      stack.add(shed)
    }
    return stack
  }

  // Two gantries with a simple bus
  const gantry1 = latticeTower(2.8, 1.4, 1.4)
  gantry1.position.set(-4, 0, -1.5)
  group.add(foundation(1.4, 1.4).translateX(-4).translateZ(-1.5))
  group.add(gantry1)

  const gantry2 = latticeTower(2.8, 1.4, 1.4)
  gantry2.position.set(-4, 0, 1.5)
  group.add(foundation(1.4, 1.4).translateX(-4).translateZ(1.5))
  group.add(gantry2)

  const busSpan = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.2, 12), matConductor)
  busSpan.position.set(-4, 2.9, 0)
  busSpan.rotation.z = Math.PI / 2
  group.add(busSpan)

  // Simple transformer using the transformer fallback body
  const transformer = createTransformerFallbackModel({}, false)
  transformer.scale.set(0.18, 0.18, 0.18)
  transformer.position.set(2, 0, 0)
  group.add(transformer)

  // Surge arrester + CVT + breaker + isolator chain (scaled down)
  const chainZ = 0
  const la = insulatorStack(1.2, 0.12)
  la.position.set(-1.5, 1.2, chainZ)
  const laBase = foundation(0.8, 0.8, 0.2)
  laBase.position.set(-1.5, 0.1, chainZ)
  group.add(la, laBase)

  const cvt = insulatorStack(1.0, 0.11)
  const cvtBox = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.5), matSteelPaint)
  cvtBox.position.set(-0.3, 0.5, chainZ)
  cvt.position.set(-0.3, 1.35, chainZ)
  group.add(foundation(0.9, 0.9, 0.2).translateX(-0.3).translateZ(chainZ), cvtBox, cvt)

  const isolator = insulatorStack(0.9, 0.1)
  isolator.position.set(0.8, 1.0, chainZ)
  const isoBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.2, 12), matGreyIns)
  isoBase.position.set(0.8, 0.1, chainZ)
  group.add(foundation(1.2, 0.8, 0.18).translateX(0.8).translateZ(chainZ), isoBase, isolator)

  const breakerBody = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.6), matSteelPaint)
  breakerBody.position.set(1.4, 0.6, chainZ)
  const breakerStack = insulatorStack(0.8, 0.1)
  breakerStack.position.set(1.4, 1.3, chainZ)
  group.add(foundation(1.0, 0.8, 0.18).translateX(1.4).translateZ(chainZ), breakerBody, breakerStack)

  // Connectors (rigid buses)
  const busSegment = (start: THREE.Vector3, end: THREE.Vector3) => {
    const len = start.distanceTo(end)
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, len, 12), matConductor)
    cyl.position.copy(start).add(end).multiplyScalar(0.5)
    cyl.lookAt(end)
    cyl.rotation.x += Math.PI / 2
    return cyl
  }

  group.add(
    busSegment(new THREE.Vector3(-4, 2.7, chainZ), new THREE.Vector3(-1.5, 1.6, chainZ)),
    busSegment(new THREE.Vector3(-1.5, 1.6, chainZ), new THREE.Vector3(-0.3, 1.6, chainZ)),
    busSegment(new THREE.Vector3(-0.3, 1.6, chainZ), new THREE.Vector3(0.8, 1.4, chainZ)),
    busSegment(new THREE.Vector3(0.8, 1.4, chainZ), new THREE.Vector3(1.4, 1.6, chainZ)),
    busSegment(new THREE.Vector3(1.4, 1.6, chainZ), new THREE.Vector3(2, 1.4, chainZ))
  )
}

