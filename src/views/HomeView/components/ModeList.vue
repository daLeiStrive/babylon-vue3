<!--
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-02-02 16:41:49
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-02-03 10:38:12
 * @FilePath: src/views/HomeView/components/ModeList.vue
 * @Description: 加载模型
 -->

<script setup lang="ts">
// import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic'
import { AppendSceneAsync, Tools } from '@babylonjs/core'
import { useBabylonStore } from '@/components/Babylon/stores/useBabylonStore.ts'
// import '@babylonjs/loaders/glTF/2.0'
// Tools.ScriptBaseUrl = 'https://cdn.babylonjs.com/v8.49.6'
// import 'babylonjs-loaders'
// registerBuiltInLoaders()
import { unref } from 'vue'
const { scene } = useBabylonStore()
const init = async () => {
  const model = await AppendSceneAsync(
    'https://playground.babylonjs.com/scenes/BoomBox.glb',
    unref(scene),
  )
}
init()
</script>

<template></template>

<style scoped></style>
