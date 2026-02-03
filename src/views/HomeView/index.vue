<script setup lang="ts">
import {
  BabylonCanvas,
  BabylonFreeCamera,
  BabylonHemisphericLight,
  BabylonArcRotateCamera,
} from '@/components/Babylon/index.ts'

import Demo1 from './components/Demo1.vue'

const cameraArgs = ['mainCamera', [0, 5, -10]]
const lightArgs = ['hemiLight', [0, 1, 0]]
</script>

<template>
  <BabylonCanvas webGpu>
    <BabylonFreeCamera :args="cameraArgs"></BabylonFreeCamera>
    <!--    <BabylonArcRotateCamera :args="cameraArgs"></BabylonArcRotateCamera>-->
    <BabylonHemisphericLight :args="lightArgs" :intensity="0.8"></BabylonHemisphericLight>
    <Demo1></Demo1>
  </BabylonCanvas>
</template>
