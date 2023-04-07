import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)

// Point light
const pointLight = new THREE.PointLight(0xff9000, 10, 2)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)

// RectArea light
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

// Spot light
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)

spotLight.target.position.x = -0.75
spotLight.target.name = 'spotLightTarget'
scene.add(spotLight.target)

/**
 * Helpers
 */

// Hemisphere light
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
)
scene.add(hemisphereLightHelper)
hemisphereLightHelper.visible = false

// Directional light
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false

// Point light
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)
pointLightHelper.visible = false

// RectArea light
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)
rectAreaLightHelper.visible = false

// Spot light
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
spotLightHelper.visible = false

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.x = -1.5
sphere.name = 'sphere'

// Cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)
cube.name = 'cube'

// Torus
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
)
torus.position.x = 1.5
torus.name = 'torus'

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65
plane.name = 'plane'

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * GUI  -  Lights
 */
const guiFolderLights = gui.addFolder('Lights')
guiFolderLights.close()

// Ambient Light
const guiFolderLightsAmbientLight = guiFolderLights
  .addFolder('Ambient Light')
  .close()
guiFolderLightsAmbientLight.add(ambientLight, 'visible').name('visible')
guiFolderLightsAmbientLight
  .add(ambientLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.001)
  .name('intensity')

// Directional Light
const guiFolderLightsDirectionalLight = guiFolderLights
  .addFolder('Directional Light')
  .close()
guiFolderLightsDirectionalLight.add(directionalLight, 'visible').name('visible')
guiFolderLightsDirectionalLight
  .add(directionalLightHelper, 'visible')
  .name('helper')
guiFolderLightsDirectionalLight
  .add(directionalLightHelper, 'visible')
  .name('directionalLightHelperVisible')
guiFolderLightsDirectionalLight
  .add(directionalLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.001)
  .name('intensity')

// Hemisphere Light
const guiFolderLightsHemisphereLight = guiFolderLights
  .addFolder('Hemisphere Light')
  .close()
guiFolderLightsHemisphereLight.add(hemisphereLight, 'visible').name('visible')
guiFolderLightsHemisphereLight
  .add(hemisphereLightHelper, 'visible')
  .name('helper')
guiFolderLightsHemisphereLight
  .add(hemisphereLightHelper, 'visible')
  .name('hemisphereLightHelperVisible')
guiFolderLightsHemisphereLight
  .add(hemisphereLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.001)
  .name('intensity')

// Point Light
const guiFolderLightsPointLight = guiFolderLights
  .addFolder('Point Light')
  .close()
guiFolderLightsPointLight.add(pointLight, 'visible').name('visible')
guiFolderLightsPointLight.add(pointLightHelper, 'visible').name('helper')
guiFolderLightsPointLight
  .add(pointLightHelper, 'visible')
  .name('pointLightHelperVisible')
guiFolderLightsPointLight
  .add(pointLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.001)
  .name('intensity')

// RectArea Light
const guiFolderLightsRectAreaLight = guiFolderLights
  .addFolder('RectArea Light')
  .close()
guiFolderLightsRectAreaLight.add(rectAreaLight, 'visible').name('visible')
guiFolderLightsRectAreaLight.add(rectAreaLightHelper, 'visible').name('helper')
guiFolderLightsRectAreaLight
  .add(rectAreaLightHelper, 'visible')
  .name('rectAreaLightHelperVisible')
guiFolderLightsRectAreaLight
  .add(rectAreaLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.001)
  .name('intensity')

// Spot Light
const guiFolderLightsSpotLight = guiFolderLights.addFolder('Spot Light').close()
guiFolderLightsSpotLight.add(spotLight, 'visible').name('visible')
guiFolderLightsSpotLight.add(spotLightHelper, 'visible').name('helper')
guiFolderLightsSpotLight
  .add(spotLightHelper, 'visible')
  .name('spotLightHelperVisible')
guiFolderLightsSpotLight
  .add(spotLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.001)
  .name('intensity')

/**
 * GUI  -  Objects3D
 */
const guiFolderObjects3D = gui.addFolder('Objects3D').close()
scene.children.forEach(child => {
  const guiFolder = guiFolderObjects3D
    .addFolder(child.name !== '' ? child.name : child.type)
    .close()
  const position = guiFolder.addFolder('position').close()
  const rotation = guiFolder.addFolder('rotation').close()
  const scale = guiFolder.addFolder('scale').close()
  position.add(child.position, 'x').min(-3).max(3).step(0.01).name('positionX')
  position.add(child.position, 'y').min(-3).max(3).step(0.01).name('positionY')
  position.add(child.position, 'z').min(-3).max(3).step(0.01).name('positionZ')
  rotation.add(child.rotation, 'x').min(-3).max(3).step(0.01).name('rotationX')
  rotation.add(child.rotation, 'y').min(-3).max(3).step(0.01).name('rotationY')
  rotation.add(child.rotation, 'z').min(-3).max(3).step(0.01).name('rotationZ')
  scale.add(child.scale, 'x').min(-3).max(3).step(0.01).name('scaleX')
  scale.add(child.scale, 'y').min(-3).max(3).step(0.01).name('scaleY')
  scale.add(child.scale, 'z').min(-3).max(3).step(0.01).name('scaleZ')
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
