/**
 * @Author: strivelei strivelei@foxmail.com
 * @Date: 2025-10-10 15:11:48
 * @LastEditors: strivelei strivelei@foxmail.com
 * @LastEditTime: 2026-01-29 18:01:45
 * @FilePath: src/components/Babylon/stores/useBabylonStore.ts
 * @Description: 这个是状态参考方法其他状态管理方法可以复制这个文件进行修改
 */
import { createInjectionState } from '@vueuse/core'
import { Scene, FreeCamera, Engine, Vector3, HemisphericLight } from '@babylonjs/core'
import { onMounted, shallowRef, unref, useTemplateRef } from 'vue'

const [useProvideBabylonStore, _useBabylonStore] = createInjectionState(() => {
  const engine = shallowRef<Engine>(null as unknown as Engine)
  const scene = shallowRef<Scene>(null as unknown as Scene)
  const camera = shallowRef<FreeCamera>(null as unknown as FreeCamera)
  const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

  const CreateScene = () => {
    engine.value = new Engine(unref(canvasRef))
    scene.value = new Scene(unref(engine))
    // This creates and positions a free camera (non-mesh)
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), unref(scene))

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero())

    // This attaches the camera to the canvas
    camera.attachControl(unref(canvasRef), false)

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), unref(scene))

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7
    engine.value.runRenderLoop(() => {
      scene.value.render()
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
