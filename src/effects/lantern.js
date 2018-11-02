import { Fx } from 'react-neon/dist/index.babel.js'
import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
import { withPrefix } from 'gatsby'

/**
 *
 * Basic particles radiating from the user's mouse, with more when the user clicks.
 *
 **/
export default class Lantern extends Fx {
  context = 'webgl'

  init() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.bb.width / this.bb.height,
      0.1,
      1000
    )
    this.camera.position.z = 20

    let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this.cube = new THREE.Mesh(geometry, material)
    this.cube.position.set(5, 5, 0)
    this.scene.add(this.cube)

    let light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(5, 5, 0)
    this.scene.add(light)

    const loader = new GLTFLoader()
    const model = withPrefix('model.gltf')

    loader.load(
      model,
      gltf => {
        // this.cube = gltf.scene;
        gltf.scene.scale.set(10, 10, 10)
        gltf.scene.position.set(0, -15, 0)
        this.scene.add(gltf.scene)
      },
      undefined,
      error => {
        // console.error(error);
      }
    )

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.ctx.canvas,
      antialias: true
    })
    this.renderer.setSize(this.bb.width, this.bb.height)
  }

  draw() {
    this.renderer.render(this.scene, this.camera)

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.raf = requestAnimationFrame(this.draw)
  }
}
