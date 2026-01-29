/**
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2026-01-29 17:05:51
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-29 17:08:27
 * @FilePath: src/components/Babylon/index.ts
 * @Description: Babylon.js 入口文件
 */

import { defineAsyncComponent } from 'vue'

export const BabylonCanvas = defineAsyncComponent(() => import('./index.vue'))
