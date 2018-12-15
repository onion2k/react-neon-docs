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
    light.position.set(0, 0, 0)
    this.scene.add(light)

    const pts = []
    const numPts = 20
    for (let i = 0; i < numPts * 2; i++) {
      let l = i % 2 == 1 ? 2.5 : 2.6
      let a = (i / numPts) * Math.PI
      pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l))
    }
    const shape = new THREE.Shape(pts)

    const saleMat = new THREE.MeshStandardMaterial({
      color: 0xe9ff32,
      flatShading: true
    })

    let extrudeSettings = {
      depth: 0.25,
      steps: 2,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 1
    }
    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings)
    this.sale = new THREE.Mesh(geometry, saleMat)

    const px = ((this.bb.width * 0.85) / this.bb.width) * 2 - 1
    const py = ((this.bb.height * 0.15) / this.bb.height) * 2 - 1
    let pos = screenToWorld(new THREE.Vector3(px, py, -25), this.camera)

    this.sale.position.set(pos.x, pos.y, pos.z)
    this.scene.add(this.sale)

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.ctx.canvas,
      antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.bb.width, this.bb.height)
  }

  draw() {
    this.renderer.render(this.scene, this.camera)
    this.sale.rotation.y += 0.04
    this.raf = requestAnimationFrame(this.draw)
  }
}
