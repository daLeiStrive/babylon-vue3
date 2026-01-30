/**
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-29 17:05:51
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-30 13:24:31
 * @FilePath: src/components/Babylon/index.ts
 * @Description: Babylon.js 入口文件
 */

import { defineAsyncComponent } from 'vue'

export const BabylonCanvas = defineAsyncComponent(() => import('./index.vue'))

export const BabylonArcRotateCamera = defineAsyncComponent(
  () => import('./components/BabylonArcRotateCamera.vue'),
)
export const BabylonFreeCamera = defineAsyncComponent(
  () => import('./components/BabylonFreeCamera.vue'),
)

export const BabylonHemisphericLight = defineAsyncComponent(
  () => import('./components/BabylonHemisphericLight.vue'),
)
export const BabylonDirectionalLight = defineAsyncComponent(
  () => import('./components/BabylonDirectionalLight.vue'),
)
export const BabylonPointLight = defineAsyncComponent(
  () => import('./components/BabylonPointLight.vue'),
)
export const BabylonSpotLight = defineAsyncComponent(
  () => import('./components/BabylonSpotLight.vue'),
)

export const BabylonMesh = defineAsyncComponent(() => import('./components/BabylonMesh.vue'))

export const BabylonSphere = defineAsyncComponent(() => import('./components/BabylonSphere.vue'))
export const BabylonGround = defineAsyncComponent(() => import('./components/BabylonGround.vue'))
