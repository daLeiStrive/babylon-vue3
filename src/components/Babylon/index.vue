<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-29 16:43:16
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-30 11:12:49
 * @FilePath: src/components/Babylon/index.vue
 * @Description: Babylon.js 入口文件
 -->

<script setup lang="ts">
import { useProvideBabylonStore } from './stores/useBabylonStore.ts'

console.log('🚀进入Babylon')
const { scene, canvasRef } = useProvideBabylonStore()
</script>

<template>
  <div class="babylon-wrapper">
    <canvas ref="canvasRef" class="babylon-canvas"></canvas>

    <slot v-if="scene"></slot>
  </div>
</template>

<style scoped lang="scss">
.babylon-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.babylon-canvas {
  width: 100%;
  height: 100%;
  &:focus-visible {
    outline: none;
  }
}
</style>
