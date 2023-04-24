import { PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from 'three';
const canvas: HTMLElement = document.querySelector('#app') as HTMLElement

export function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer({ canvas, antialias: true });

  renderer.useLegacyLights = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = sRGBEncoding;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap

  return renderer;
}
