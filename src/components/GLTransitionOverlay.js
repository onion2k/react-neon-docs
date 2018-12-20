import React from 'react'
import * as twgl from 'twgl.js'

let transitionTime = 1000

const fs = `
  #ifdef GL_ES
    precision mediump float;
  #endif

  uniform vec2 u_resolution;
  uniform float u_opacity;
  uniform float u_time;

  #define SCALE 50.0
  #define SPEED 1.0

  float getColorComponent(float dist, float angle) {
    return pow(
        (sin(dist * (SCALE) + angle - (u_time * SPEED) ) + 1.0),
        1.2
    );
  }

  void main() {
    vec2 delta = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;
    float dist = length(delta),
    angle = atan(delta.x, delta.y);

    gl_FragColor = vec4(
      getColorComponent(dist, angle),
      getColorComponent(dist, angle),
      getColorComponent(dist, angle),
      1. - getColorComponent(dist, angle)
    );
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
    this.w = this.cover.clientWidth / 3
    this.h = this.cover.clientHeight / 3
    this.cover.width = this.w
    this.cover.height = this.h
  }

  componentDidMount() {
    this.resize()

    this.raf = null
    // let gl = document.getElementById('cover').getContext('webgl')

    this.gl = twgl.getWebGLContext(this.cover, { premultipliedAlpha: false })
    this.programInfo = twgl.createProgramInfo(this.gl, [vs, fs])

    // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    // this.gl.blendFuncSeparate(
    //   this.gl.SRC_ALPHA,
    //   this.gl.ONE_MINUS_SRC_ALPHA,
    //   this.gl.ONE,
    //   this.gl.ONE_MINUS_SRC_ALPHA
    // )

    this.arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
    }

    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, this.arrays)
    this.renderGL()
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.transition === 'exit') {
      this.target = 1
    } else if (newProps.transition === 'entry') {
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

      let uniforms = {
        u_time: this.ramp * 0.01,
        u_opacity: this.ramp / transitionTime,
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
