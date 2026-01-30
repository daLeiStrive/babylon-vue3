import { Color3, Scene, Vector3 } from '@babylonjs/core'

export type Vector3Like = Vector3 | [number, number, number] | number
export type Color3Like = Color3 | [number, number, number]

export function resolveVector3(value: Vector3Like | undefined, fallback: Vector3): Vector3 {
  if (value == null)
    return fallback
  if (typeof value === 'number')
    return new Vector3(value, value, value)
  if (Array.isArray(value))
    return new Vector3(value[0] ?? 0, value[1] ?? 0, value[2] ?? 0)
  return value
}

export function applyVector3(target: Vector3, value?: Vector3Like) {
  if (value == null)
    return
  if (typeof value === 'number') {
    target.set(value, value, value)
    return
  }
  if (Array.isArray(value)) {
    target.set(value[0] ?? 0, value[1] ?? 0, value[2] ?? 0)
    return
  }
  target.copyFrom(value)
}

export function applyColor3(target: Color3, value?: Color3Like) {
  if (value == null)
    return
  if (Array.isArray(value)) {
    target.set(value[0] ?? 0, value[1] ?? 0, value[2] ?? 0)
    return
  }
  target.copyFrom(value)
}

export function withSceneArgs<T extends unknown[]>(
  args: T | undefined,
  scene: Scene,
  sceneIndex: number,
): T {
  const resolved = args ? [...args] : []
  if (resolved[sceneIndex] instanceof Scene)
    return resolved as T
  if (resolved.length > sceneIndex)
    resolved.splice(sceneIndex, 0, scene)
  else
    resolved[sceneIndex] = scene
  return resolved as T
}
