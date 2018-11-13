import { Fx } from 'react-neon/dist/index.babel.js'
import * as THREE from 'three'

//input THREE.Vector3
function screenToWorld(position, cam) {
  var z = position.z
  position.z = 0
  position.unproject(cam)
  return cam.position.clone().add(
    position
      .sub(cam.position)
      .normalize()
      .multiplyScalar(-(cam.position.z - z) / position.z)
  )
}

/**
 *
 * Basic particles radiating from the user's mouse, with more when the user clicks.
 *
 **/
export default class Lantern extends Fx {
  context = 'webgl'

  init() {
    this.fairylights = []

    this.addFairyLight.bind(this)
    this.initGeometry()
    this.initColors()

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.bb.width / this.bb.height,
      0.1,
      1000
    )
    this.camera.position.z = 0

    let box_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    let box_material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this.cube = new THREE.Mesh(box_geometry, box_material)
    this.cube.position.set(5, 5, 0)
    this.scene.add(this.cube)

    let light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(5, 5, 0)
    this.scene.add(light)

    const w = this.bb.width
    const h = this.bb.height
    const p = this.options.padding

    for (let x = 0; x < 8; x++) {
      let px = ((p + (x % 8) * ((w - p * 2) / 7)) / w) * 2 - 1
      let py = ((p + 0 * ((h - p * 2) / 7)) / h) * 2 - 1
      this.addFairyLight(x, px, py)
    }

    for (let x = 8; x < 16; x++) {
      let px = ((p + (x % 8) * ((w - p * 2) / 7)) / w) * 2 - 1
      let py = ((p + 7 * ((h - p * 2) / 7)) / h) * 2 - 1
      this.addFairyLight(x, px, py)
    }

    for (let x = 16; x < 22; x++) {
      let px = ((p + 0 * ((w - p * 2) / 7)) / w) * 2 - 1
      let py = ((p + ((x + 1) % 8) * ((h - p * 2) / 7)) / h) * 2 - 1
      this.addFairyLight(x, px, py)
    }

    for (let x = 22; x < 28; x++) {
      let px = ((p + 7 * ((w - p * 2) / 7)) / w) * 2 - 1
      let py = ((p + ((x + 3) % 8) * ((h - p * 2) / 7)) / h) * 2 - 1
      this.addFairyLight(x, px, py)
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.ctx.canvas,
      antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.bb.width, this.bb.height)
  }

  initGeometry() {
    this.sphere_geometry = new THREE.SphereGeometry(0.5, 12, 12)
  }

  initColors() {
    this.sphere_colors = [
      new THREE.MeshStandardMaterial({
        color: 0xffff00,
        flatShading: true
      }),
      new THREE.MeshStandardMaterial({
        color: 0xff00ff,
        flatShading: true
      }),
      new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        flatShading: true
      }),
      new THREE.MeshStandardMaterial({
        color: 0xff0000,
        flatShading: true
      }),
      new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        flatShading: true
      }),
      new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        flatShading: true
      })
    ]
  }

  addFairyLight(x, px, py) {
    this.fairylights.push(
      new THREE.Mesh(
        this.sphere_geometry,
        this.sphere_colors[x % this.sphere_colors.length]
      )
    )

    let pos = screenToWorld(new THREE.Vector3(px, py, -15), this.camera)

    this.fairylights[x].position.set(pos.x, pos.y, pos.z)
    this.scene.add(this.fairylights[x])
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
