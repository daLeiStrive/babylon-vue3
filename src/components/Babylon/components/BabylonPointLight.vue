<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-30
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-30
 * @FilePath: src/components/Babylon/components/BabylonPointLight.vue
 * @Description: 点光
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
import { PointLight, Vector3 } from '@babylonjs/core'
import { onBeforeUnmount, unref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    args?: unknown[]
    name?: string
    position?: Vector3Like
    intensity?: number
    diffuse?: Color3Like
    specular?: Color3Like
    parent?: PointLight['parent']
  }>(),
  {
    name: 'PointLight',
    position: () => [0, 1, 0],
    intensity: 1,
  },
)

const { scene } = useBabylonStore()
const sceneValue = unref(scene)

const baseArgs = props.args?.length
  ? [...props.args]
  : [props.name, resolveVector3(props.position, new Vector3(0, 1, 0))]

if (props.args?.length) {
  const positionArg = baseArgs[1]
  if (Array.isArray(positionArg) || typeof positionArg === 'number')
    baseArgs[1] = resolveVector3(positionArg as Vector3Like, new Vector3(0, 1, 0))
}

const resolvedArgs = withSceneArgs(baseArgs, sceneValue, 2)
const light = new PointLight(...(resolvedArgs as ConstructorParameters<typeof PointLight>))

watchEffect(() => {
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
