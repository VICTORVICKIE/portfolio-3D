import { PerspectiveCamera } from 'three'
import { scene, sizes } from './renderer'

const FOV = 45 // degrees 45 is the normal

export const camera = new PerspectiveCamera(
  FOV,
  sizes.width / sizes.height,
)

camera.position.set(9, 4, 9)

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
})

scene.add(camera)

export default camera