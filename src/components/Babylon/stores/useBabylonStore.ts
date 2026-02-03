/**
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2025-10-10 15:11:48
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-02-02 16:45:50
 * @FilePath: src/components/Babylon/stores/useBabylonStore.ts
 * @Description: 这个是状态参考方法其他状态管理方法可以复制这个文件进行修改
 */
import { createInjectionState } from '@vueuse/core'
import { Camera, Engine, Scene, WebGPUEngine } from '@babylonjs/core'
import { type DefineProps, onMounted, shallowRef, unref, useTemplateRef } from 'vue'
import type { BabylonProps } from '@/components/Babylon/index.d'

const [useProvideBabylonStore, _useBabylonStore] = createInjectionState((props: BabylonProps) => {
  const engine = shallowRef<Engine | WebGPUEngine>(null as unknown as Engine)
  const scene = shallowRef<Scene>(null as unknown as Scene)
  const camera = shallowRef<Camera>(null as unknown as Camera)
  const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

  const CreateScene = async () => {
    if (!canvasRef.value) {
      return
    }
    if (props.webGpu) {
      engine.value = new WebGPUEngine(unref(canvasRef) as HTMLCanvasElement)
      await engine.value.initAsync()
    } else {
      engine.value = new Engine(unref(canvasRef))
    }
    scene.value = new Scene(unref(engine))

    engine.value.runRenderLoop(() => {
      if (scene.value?.activeCamera) {
        scene.value.render()
      }
    })
  }

  onMounted(CreateScene)

  return {
    engine,
    scene,
    camera,
    canvasRef,
  }
})

export { useProvideBabylonStore }

export type BabylonStoreReturn = ReturnType<typeof _useBabylonStore>

export function useBabylonStore(): Exclude<BabylonStoreReturn, undefined> {
  const counterStore = _useBabylonStore()
  if (counterStore == null)
    throw new Error('Please call `useProvideBabylonStore` on the appropriate parent component')
  return counterStore
}
