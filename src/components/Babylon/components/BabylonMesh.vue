<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-30
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-30 13:16:08
 * @FilePath: src/components/Babylon/components/BabylonMesh.vue
 * @Description: 空网格（类似 TresMesh）
 -->

<script setup lang="ts">
import { useBabylonStore } from '@/components/Babylon/stores/useBabylonStore.ts'
import {
  applyVector3,
  withSceneArgs,
  type Vector3Like,
} from '@/components/Babylon/utils/babylonHelpers'
import { Mesh, type Node } from '@babylonjs/core'
import { onBeforeUnmount, unref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    args?: unknown[]
    name?: string
    position?: Vector3Like
    rotation?: Vector3Like
    scaling?: Vector3Like
    isVisible?: boolean
    parent?: Node | null
  }>(),
  {
    name: 'mesh',
    isVisible: true,
  },
)

const { scene } = useBabylonStore()
const sceneValue = unref(scene)

const baseArgs = props.args?.length ? [...props.args] : [props.name]
const resolvedArgs = withSceneArgs(baseArgs, sceneValue, 1)
const mesh = new Mesh(...(resolvedArgs as ConstructorParameters<typeof Mesh>))

watchEffect(() => {
  if (props.position != null) applyVector3(mesh.position, props.position)
  if (props.rotation != null) applyVector3(mesh.rotation, props.rotation)
  if (props.scaling != null) applyVector3(mesh.scaling, props.scaling)
  if (props.isVisible != null) mesh.isVisible = props.isVisible
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
