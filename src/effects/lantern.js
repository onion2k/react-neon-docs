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
    this.camera.position.z = 15

    let box_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    let box_material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this.cube = new THREE.Mesh(box_geometry, box_material)
    this.cube.position.set(5, 5, 0)
    this.scene.add(this.cube)

    let light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(5, 5, 0)
    this.scene.add(light)

    const sphere_geometry = new THREE.SphereGeometry(0.5, 12, 12)

    this.fairylights = []

    const sphere_colors = [
      new THREE.MeshStandardMaterial({
        color: 0xffff00,
        shading: THREE.FlatShading
      }),
      new THREE.MeshStandardMaterial({
        color: 0xff00ff,
        shading: THREE.FlatShading
      }),
      new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        shading: THREE.FlatShading
      }),
      new THREE.MeshStandardMaterial({
        color: 0xff0000,
        shading: THREE.FlatShading
      }),
      new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        shading: THREE.FlatShading
      }),
      new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        shading: THREE.FlatShading
      })
    ]
    for (let x = 0; x < 24; x++) {
      this.fairylights.push(
        new THREE.Mesh(sphere_geometry, sphere_colors[x % sphere_colors.length])
      )
      this.fairylights[x].position.set(Math.floor(x / 6) - 4, (x % 6) - 4, 0)
      this.scene.add(this.fairylights[x])
    }

    // const loader = new GLTFLoader();
    // const model = withPrefix('model.gltf');

    // loader.load(
    //   model,
    //   gltf => {
    //     this.cube = new THREE.Mesh(
    //       gltf.scene.children[0].geometry,
    //       gltf.scene.children[0].material
    //     )
    //     this.scene.add(this.cube)

    //     // this.cube.position.set(0, 0, 0);
    //     this.cube.scale.set(10, 10, 10)

    //     // toScreenPosition(gltf.scene, this.camera);
    //   },
    //   undefined,
    //   error => {
    //     // console.error(error);
    //   }
    // )

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.ctx.canvas,
      antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.bb.width, this.bb.height)
  }

  draw() {
    this.renderer.render(this.scene, this.camera)

    this.fairylights.forEach(f => {
      f.rotation.x += 0.01
      f.rotation.z += 0.01
    })

    this.raf = requestAnimationFrame(this.draw)
  }
}
