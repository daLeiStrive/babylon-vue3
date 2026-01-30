<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-29 18:10:35
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-30 09:56:05
 * @FilePath: src/components/Babylon/components/BabylonArcRotateCamera.vue
 * @Description: 轨道类型的相机
 -->

<script setup lang="ts">
import { useBabylonStore } from '@/components/Babylon/stores/useBabylonStore.ts'
import {
  applyVector3,
  resolveVector3,
  withSceneArgs,
  type Vector3Like,
} from '@/components/Babylon/utils/babylonHelpers'
import { ArcRotateCamera, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount, unref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    args?: unknown[]
    name?: string
    alpha?: number
    beta?: number
    radius?: number
    target?: Vector3Like
    setActiveOnSceneIfNoneActive?: boolean
    attachControl?: boolean
    wheelPrecision?: number
    panningSensibility?: number
    lowerRadiusLimit?: number
    upperRadiusLimit?: number
    minZ?: number
    maxZ?: number
  }>(),
  {
    name: 'ArcRotateCamera',
    alpha: 0,
    beta: Math.PI / 2,
    radius: 15,
    target: () => [0, 0, 0],
    attachControl: true,
  },
)

const { scene, canvasRef, camera: cameraRef } = useBabylonStore()
const sceneValue = unref(scene)

const baseArgs = props.args?.length
  ? [...props.args]
  : [
      props.name,
      props.alpha,
      props.beta,
      props.radius,
      resolveVector3(props.target, Vector3.Zero()),
    ]

if (props.args?.length) {
  const targetArg = baseArgs[4]
  if (Array.isArray(targetArg) || typeof targetArg === 'number')
    baseArgs[4] = resolveVector3(targetArg as Vector3Like, Vector3.Zero())
}

const resolvedArgs = withSceneArgs(baseArgs, sceneValue, 5)
const argsSetActive = typeof resolvedArgs[6] === 'boolean' ? (resolvedArgs[6] as boolean) : undefined
const shouldSetActive = props.setActiveOnSceneIfNoneActive ?? argsSetActive ?? true
if (resolvedArgs.length <= 6)
  resolvedArgs[6] = shouldSetActive

const camera = new ArcRotateCamera(
  ...(resolvedArgs as ConstructorParameters<typeof ArcRotateCamera>),
)

cameraRef.value = camera
if (shouldSetActive && !sceneValue.activeCamera)
  sceneValue.activeCamera = camera

if (props.attachControl)
  camera.attachControl(unref(canvasRef), false)

watchEffect(() => {
  if (props.alpha != null)
    camera.alpha = props.alpha
  if (props.beta != null)
    camera.beta = props.beta
  if (props.radius != null)
    camera.radius = props.radius
  if (props.target != null)
    applyVector3(camera.target, props.target)
  if (props.wheelPrecision != null)
    camera.wheelPrecision = props.wheelPrecision
  if (props.panningSensibility != null)
    camera.panningSensibility = props.panningSensibility
  if (props.lowerRadiusLimit != null)
    camera.lowerRadiusLimit = props.lowerRadiusLimit
  if (props.upperRadiusLimit != null)
    camera.upperRadiusLimit = props.upperRadiusLimit
  if (props.minZ != null)
    camera.minZ = props.minZ
  if (props.maxZ != null)
    camera.maxZ = props.maxZ
})

onBeforeUnmount(() => {
  camera.detachControl()
  camera.dispose()
})

defineExpose({
  instance: camera,
})
</script>

<template></template>

<style scoped></style>
