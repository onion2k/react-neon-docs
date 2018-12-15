import React from 'react'
import * as twgl from 'twgl.js'

const fs = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec2 u_resolution;
  uniform float u_time;

  void main()
  {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      uv = uv + vec2(0.5 - cos(uv.y * 8.0), 2.0) * (sin(u_time) * 0.05);
      float cb = floor(uv.x*25.) + floor(uv.y*25.);
      gl_FragColor = vec4(0.0, 0.0, 0.0,mod(cb, 2.0));
  }
`

const vs = `
  // Vertex shader
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`

export default class GLTransitionLink extends React.Component {
  constructor() {
    super()
    this.renderGL = this.renderGL.bind(this)
  }

  componentDidMount() {
    this.cover = document.getElementById('cover')
    this.w = this.cover.clientWidth
    this.h = this.cover.clientHeight
    this.cover.width = this.w
    this.cover.height = this.h

    this.gl = twgl.getWebGLContext(this.cover)
    this.programInfo = twgl.createProgramInfo(this.gl, [vs, fs])

    this.arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
    }

    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.arrays)
    // this.renderGL();
  }

  renderGL(time) {
    twgl.resizeCanvasToDisplaySize(this.gl.canvas)

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)

    let uniforms = {
      u_time: time * 0.001,
      u_resolution: [this.gl.canvas.width, this.gl.canvas.height]
    }

    this.gl.useProgram(this.programInfo.program)

    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo)
    twgl.setUniforms(this.programInfo, uniforms)
    twgl.drawBufferInfo(this.gl, this.bufferInfo)

    requestAnimationFrame(this.renderGL)
  }

  render() {
    return <canvas id={'cover'} className="cover" />
  }
}
