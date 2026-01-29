<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-29 17:37:35
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-29 17:51:37
 * @FilePath: src/views/HomeView/components/Demo1.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->

<script setup lang="ts">
import { useBabylonStore } from '@/components/Babylon/stores/useBabylonStore.ts'
import { MeshBuilder } from '@babylonjs/core'
import { unref } from 'vue'

const { scene: sceneRef } = useBabylonStore()
const scene = unref(sceneRef)
// Our built-in 'sphere' shape. Params: name, options, scene
const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene)

// Move the sphere upward 1/2 its height
sphere.position.y = 1

// Our built-in 'ground' shape. Params: name, options, scene
const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
window.ground = ground
</script>

<template></template>

<style scoped></style>
