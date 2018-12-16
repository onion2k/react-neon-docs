import React from 'react'
import * as twgl from 'twgl.js'

const fs = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec3 u_color;
  uniform vec2 u_resolution;
  uniform float u_time;

  void main()
  {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      uv = uv + vec2(0.5 - cos(uv.y * 8.0), 2.0) * (sin(u_time) * 0.05);
      float cb = floor(uv.x*25.) + floor(uv.y*25.);
      gl_FragColor = vec4(u_color, mod(cb, 2.0));
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
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.transition === 'exit') {
      if (this.raf) {
        cancelAnimationFrame(this.raf)
      }
      this.g = 1.0
      this.resize()
      this.renderGL(Date.now())
    } else if (newProps.transition === 'entry') {
      if (this.raf) {
        cancelAnimationFrame(this.raf)
      }
      this.g = 0.0
      this.resize()
      this.renderGL(Date.now())
    }
  }

  renderGL(time) {
    // twgl.resizeCanvasToDisplaySize(this.gl.canvas)

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)

    let r = 0.0
    let g = this.g
    let b = 0.0

    let uniforms = {
      u_color: [r, g, b],
      u_time: time * 0.001,
      u_resolution: [this.gl.canvas.width, this.gl.canvas.height]
    }

    this.gl.useProgram(this.programInfo.program)

    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo)
    twgl.setUniforms(this.programInfo, uniforms)
    twgl.drawBufferInfo(this.gl, this.bufferInfo)

    this.raf = requestAnimationFrame(this.renderGL)
  }

  render() {
    return <canvas id={'cover'} className="cover" />
  }
}
