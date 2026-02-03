<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-29 16:43:16
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-02-02 15:17:40
 * @FilePath: src/components/Babylon/index.vue
 * @Description: Babylon.js 入口文件
 -->

<script setup lang="ts">
import { useProvideBabylonStore } from './stores/useBabylonStore.ts'
import type { BabylonProps } from '@/components/Babylon/index.d'

const props = defineProps<BabylonProps>()

console.log('🚀进入Babylon')
const { scene, canvasRef } = useProvideBabylonStore(props)
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
