<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-30
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-30 13:13:05
 * @FilePath: src/components/Babylon/components/BabylonGround.vue
 * @Description: 地面
 -->

<script setup lang="ts">
import { useBabylonStore } from '@/components/Babylon/stores/useBabylonStore.ts'
import {
  applyVector3,
  withSceneArgs,
  type Vector3Like,
} from '@/components/Babylon/utils/babylonHelpers'
import { MeshBuilder, type Node } from '@babylonjs/core'
import { onBeforeUnmount, unref, watchEffect } from 'vue'

type GroundOptions = Parameters<typeof MeshBuilder.CreateGround>[1]

const props = withDefaults(
  defineProps<{
    args?: unknown[]
    name?: string
    options?: GroundOptions
    position?: Vector3Like
    rotation?: Vector3Like
    scaling?: Vector3Like
    isVisible?: boolean
    parent?: Node | null
  }>(),
  {
    name: 'ground',
    options: () => ({ width: 1, height: 1 }),
    isVisible: true,
  },
)

const { scene } = useBabylonStore()
const sceneValue = unref(scene)

const baseArgs = props.args?.length ? [...props.args] : [props.name, props.options]
const resolvedArgs = withSceneArgs(baseArgs, sceneValue, 2)
const mesh = MeshBuilder.CreateGround(
  ...(resolvedArgs as Parameters<typeof MeshBuilder.CreateGround>),
)

watchEffect(() => {
  if (props.position != undefined) applyVector3(mesh.position, props.position)
  if (props.rotation != undefined) applyVector3(mesh.rotation, props.rotation)
  if (props.scaling != undefined) applyVector3(mesh.scaling, props.scaling)
  if (props.isVisible != undefined) mesh.isVisible = props.isVisible
  if (props.parent !== undefined) mesh.parent = props.parent ?? null
})

onBeforeUnmount(() => {
  mesh.dispose()
})

defineExpose({
  instance: mesh,
})
</script>

<template></template>

<style scoped></style>
