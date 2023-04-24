import {
    ACESFilmicToneMapping,
    AxesHelper,
    Color,
    PCFShadowMap,
    Scene,
    WebGLRenderer,
    sRGBEncoding,
} from 'three'
import { gui } from './gui'

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Scene
export const scene = new Scene()
scene.background = new Color('#333')

const canvas: HTMLElement = document.querySelector('#app') as HTMLElement

// Renderer
export const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
})

// More realistic shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFShadowMap
renderer.useLegacyLights = true
renderer.outputEncoding = sRGBEncoding
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 1

// Axes Helper
const axes_helper = new AxesHelper()
scene.add(axes_helper)

gui.addInput(axes_helper, 'visible', {
    label: 'AxesHelper',
})

function update_renderer() {
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // To avoid performance problems on devices with higher pixel ratio
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    update_renderer()
})

update_renderer()

export default {
    renderer,
    gui,
}