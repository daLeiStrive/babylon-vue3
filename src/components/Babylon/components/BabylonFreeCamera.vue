<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-29 18:10:35
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-30 11:30:51
 * @FilePath: src/components/Babylon/components/BabylonFreeCamera.vue
 * @Description: 轨道类型的相机
 -->

<script setup lang="ts">
import { useBabylonStore } from '@/components/Babylon/stores/useBabylonStore.ts'
import {
  resolveVector3,
  withSceneArgs,
  type Vector3Like,
} from '@/components/Babylon/utils/babylonHelpers'
import { FreeCamera, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount, unref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    args?: unknown[]
    name?: string
    position?: Vector3Like
    target?: Vector3Like
    setActiveOnSceneIfNoneActive?: boolean
    attachControl?: boolean
    speed?: number
    minZ?: number
    maxZ?: number
    inertia?: number
  }>(),
  {
    name: 'FreeCamera',
    position: () => [0, 5, -10],
    target: () => [0, 0, 0],
    attachControl: true,
  },
)

const { scene, canvasRef, camera: cameraRef } = useBabylonStore()
const sceneValue = unref(scene)

const baseArgs = props.args?.length
  ? [...props.args]
  : [props.name, resolveVector3(props.position, new Vector3(0, 5, -10))]

if (props.args?.length) {
  const positionArg = baseArgs[1]
  if (Array.isArray(positionArg) || typeof positionArg === 'number')
    baseArgs[1] = resolveVector3(positionArg as Vector3Like, new Vector3(0, 5, -10))
}

const resolvedArgs = withSceneArgs(baseArgs, sceneValue, 2)

const camera = new FreeCamera(...(resolvedArgs as ConstructorParameters<typeof FreeCamera>))

// 启用鼠标滚轮输入。
camera.inputs.addMouseWheel()
cameraRef.value = camera

if (props.attachControl) {
  camera.attachControl(unref(canvasRef), false)
}

watchEffect(() => {
  if (props.position != null) {
    camera.position.copyFrom(resolveVector3(props.position, camera.position))
  }
  if (props.target != null) {
    camera.setTarget(resolveVector3(props.target, Vector3.Zero()))
  }
  if (props.speed != null) {
    camera.speed = props.speed
  }
  if (props.minZ != null) {
    camera.minZ = props.minZ
  }
  if (props.maxZ != null) {
    camera.maxZ = props.maxZ
  }
  if (props.inertia != null) {
    camera.inertia = props.inertia
  }
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
