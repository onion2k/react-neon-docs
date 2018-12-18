import React from 'react'
import * as twgl from 'twgl.js'

let transitionTime = 1000

const fs = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec3 u_color;
  uniform float u_opacity;
  uniform vec2 u_resolution;
  uniform float u_time;

  void main()
  {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      uv = uv + vec2(0.5 - cos(uv.y * 8.0), 2.0) * (sin(u_time) * 0.05);
      float cb = floor(uv.x*25.) + floor(uv.y*25.);
      vec3 color = u_color * mod(cb, 2.0);
      gl_FragColor = vec4(color, u_opacity);
  }
`

const vs = `
  // Vertex shader
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`

export default class GLTransitionOverylay extends React.Component {
  constructor(props) {
    super(props)
    this.transition = null
    this.g = 1.0
    this.ramp = 0
    this.target = 0
    this.pTime = Date.now()
    this.raf = null
    this.renderGL = this.renderGL.bind(this)
  }

  resize() {
    this.cover = document.getElementById('cover')
    this.w = this.cover.clientWidth
    this.h = this.cover.clientHeight
    this.cover.width = this.w
    this.cover.height = this.h
  }

  componentDidMount() {
    this.resize()

    this.raf = null
    this.gl = twgl.getWebGLContext(this.cover)
    this.programInfo = twgl.createProgramInfo(this.gl, [vs, fs])

    this.arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
    }

    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.arrays)
    this.renderGL()
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.transition === 'exit') {
      this.target = 1
      // this.resize()
    } else if (newProps.transition === 'entry') {
      // this.resize()
      this.target = -1
    }
  }

  renderGL() {
    let time = Date.now()
    let delta = time - this.pTime
    this.pTime = time

    if (this.target === 1) {
      this.ramp += delta
    } else if (this.target === -1) {
      this.ramp -= delta
    }

    if (this.ramp < 0) {
      this.ramp = 0
      this.target = 0
    } else {
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)

      let r = 1.0
      let g = 0.0
      let b = 0.0

      let uniforms = {
        u_color: [r, g, b],
        u_opacity: this.ramp / transitionTime,
        u_time: this.ramp * 0.001,
        u_resolution: [this.gl.canvas.width, this.gl.canvas.height]
      }

      this.gl.useProgram(this.programInfo.program)

      twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo)
      twgl.setUniforms(this.programInfo, uniforms)
      twgl.drawBufferInfo(this.gl, this.bufferInfo)
    }

    this.raf = requestAnimationFrame(this.renderGL)
  }

  render() {
    return <canvas id={'cover'} className="cover" />
  }
}
