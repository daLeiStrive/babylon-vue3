<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-29 17:37:35
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-02-02 16:45:38
 * @FilePath: src/views/HomeView/components/Demo1.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->

<script setup lang="ts">
import { BabylonGround, BabylonSphere } from '@/components/Babylon/index.ts'
import ModeList from './ModeList.vue'
const sphereArgs = ['sphere', { diameter: 2, segments: 32 }]
const groundArgs = ['ground', { width: 6, height: 6 }]
</script>

<template>
  <BabylonSphere :args="sphereArgs" :position="[0, 1, 0]"></BabylonSphere>
  <BabylonGround :args="groundArgs"></BabylonGround>
  <ModeList></ModeList>
</template>

<style scoped></style>
