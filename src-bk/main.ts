// import camera from '$lib/camera'
// import { controls } from '$lib/controls'
// import { fps_graph, gui } from '$lib/gui'
// import { renderer, scene } from '$lib/renderer'
// import * as THREE from 'three'

// import './index.css'

// // Shaders
// import fragmentShader from '$lib/shaders/fragment.glsl'
// import vertexShader from '$lib/shaders/vertex.glsl'

// // Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.normalBias = 0.05
// directionalLight.position.set(0.25, 2, 2.25)

// scene.add(directionalLight)

// const sphereMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//     uTime: { value: 0 },
//     uFrequency: { value: new THREE.Vector2(20, 15) },
//   },
//   vertexShader,
//   fragmentShader,
// })

// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(1, 32, 32),
//   sphereMaterial,
// )

// sphere.position.set(0, 2, 0)
// sphere.castShadow = true
// scene.add(sphere)

// const DirectionalLightFolder = gui.addFolder({
//   title: 'Directional Light',
// })

// Object.keys(directionalLight.position).forEach(key => {
//   DirectionalLightFolder.addInput(
//     directionalLight.position,
//     key as keyof THREE.Vector3,
//     {
//       min: -100,
//       max: 100,
//       step: 1,
//     },
//   )
// })

// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(10, 10, 10, 10),
//   new THREE.MeshToonMaterial({ color: '#444' }),
// )

// plane.rotation.set(-Math.PI / 2, 0, 0)
// plane.receiveShadow = true
// scene.add(plane)

// const clock = new THREE.Clock()

// const loop = () => {
//   const elapsedTime = clock.getElapsedTime()

//   sphereMaterial.uniforms.uTime.value = elapsedTime

//   fps_graph.begin()

//   controls.update()
//   renderer.render(scene, camera)

//   fps_graph.end()
//   requestAnimationFrame(loop)
// }

// loop()
import * as THREE from "three";

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;


const canvas: HTMLElement = document.querySelector('#app') as HTMLElement

// Renderer
export const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
})

// Create a spotlight to represent the flashlight
const spotlight = new THREE.SpotLight(0xffffff, 1, 100);
spotlight.position.set(0, 0, 0);
scene.add(spotlight);

// Create a fog object to represent the volumetric lighting
const fog = new THREE.Fog(0xffffff, 1, 15);

// Create a sphere to represent the fog volume
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.5,
});
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
scene.add(sphere);

// Render the scene
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

// Update the spotlight and fog positions based on the mouse position
document.addEventListener("mousemove", (event) => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;
  const target = new THREE.Vector3(
    (x - 0.5) * 10,
    (y - 0.5) * -10,
    -5
  );
  spotlight.target.position.copy(target);
  fog.color.setHSL(
    0.6,
    1,
    Math.max(0, Math.min(1, (target.z + 5) / 10))
  );
  fog.far = target.distanceTo(camera.position) + 1;
  scene.fog = fog;
});

// Resize the renderer when the window is resized
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
