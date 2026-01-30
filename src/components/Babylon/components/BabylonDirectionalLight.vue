<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-30
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-30
 * @FilePath: src/components/Babylon/components/BabylonDirectionalLight.vue
 * @Description: 平行光
 -->

<script setup lang="ts">
import { useBabylonStore } from '@/components/Babylon/stores/useBabylonStore.ts'
import {
  applyColor3,
  applyVector3,
  resolveVector3,
  withSceneArgs,
  type Color3Like,
  type Vector3Like,
} from '@/components/Babylon/utils/babylonHelpers'
import { DirectionalLight, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount, unref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    args?: unknown[]
    name?: string
    direction?: Vector3Like
    position?: Vector3Like
    intensity?: number
    diffuse?: Color3Like
    specular?: Color3Like
    parent?: DirectionalLight['parent']
  }>(),
  {
    name: 'DirectionalLight',
    direction: () => [0, -1, 0],
    position: () => [0, 1, 0],
    intensity: 1,
  },
)

const { scene } = useBabylonStore()
const sceneValue = unref(scene)

const baseArgs = props.args?.length
  ? [...props.args]
  : [props.name, resolveVector3(props.direction, new Vector3(0, -1, 0))]

if (props.args?.length) {
  const directionArg = baseArgs[1]
  if (Array.isArray(directionArg) || typeof directionArg === 'number')
    baseArgs[1] = resolveVector3(directionArg as Vector3Like, new Vector3(0, -1, 0))
}

const resolvedArgs = withSceneArgs(baseArgs, sceneValue, 2)
const light = new DirectionalLight(
  ...(resolvedArgs as ConstructorParameters<typeof DirectionalLight>),
)

watchEffect(() => {
  if (props.direction != null)
    applyVector3(light.direction, props.direction)
  if (props.position != null)
    applyVector3(light.position, props.position)
  if (props.intensity != null)
    light.intensity = props.intensity
  if (props.diffuse != null)
    applyColor3(light.diffuse, props.diffuse)
  if (props.specular != null)
    applyColor3(light.specular, props.specular)
  if (props.parent !== undefined)
    light.parent = props.parent ?? null
})

onBeforeUnmount(() => {
  light.dispose()
})

defineExpose({
  instance: light,
})
</script>

<template></template>

<style scoped></style>
