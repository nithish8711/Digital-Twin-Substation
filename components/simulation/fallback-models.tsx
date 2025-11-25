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
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.2, 4),
    new THREE.MeshStandardMaterial({ color: 0x4a5568 })
  )
  base.position.set(0, 0, 0)
  group.add(base)

  const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
  for (let i = 0; i < 3; i++) {
    const building = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.2), buildingMaterial)
    building.position.set(-2 + i * 2, 0.65, -0.5)
    group.add(building)
  }

  const yardTowerMaterial = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 })
  for (let i = 0; i < 4; i++) {
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 12), yardTowerMaterial)
    tower.position.set(-2.4 + i * 1.6, 1, 1.2)
    group.add(tower)
  }

  const bus = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 5.5, 16),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc })
  )
  bus.position.set(0, 1.6, 1.2)
  bus.rotation.z = Math.PI / 2
  group.add(bus)
}

