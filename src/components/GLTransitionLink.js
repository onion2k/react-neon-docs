import React from 'react'
import * as twgl from 'twgl.js'
import TransitionLink from 'gatsby-plugin-transition-link'

let transitionTime = 2000

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

// var gl = twgl.getWebGLContext(canvas);
// var programInfo = twgl.createProgramInfo(gl, [vs, fs]);

// var arrays = {
//   position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
// };

// var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

// function render(time) {

//   twgl.resizeCanvasToDisplaySize(gl.canvas);

//   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

//   var uniforms = {
//     u_time: time * 0.001,
//     u_resolution: [gl.canvas.width, gl.canvas.height]
//   };

//   gl.useProgram(programInfo.program);

//   twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
//   twgl.setUniforms(programInfo, uniforms);
//   twgl.drawBufferInfo(gl, bufferInfo);

//   requestAnimationFrame(render);

// }

// document.addEventListener('DOMContentLoaded', ()=>{
//   requestAnimationFrame(render);
// });

// let t = 0
// let c
// let then = Date.now()
// let delta
// let now
// let dir = 1
// let transitionTime = 1500
// let ctx, w, h

// const lastExitToTransition = () => {
//   now = Date.now()
//   delta = now - then
//   then = now
//   t += delta
//   if (t > transitionTime) {
//     const cover = document.getElementById('cover')
//     cover.classList.remove('exiting')
//     cover.classList.remove('entering')
//   } else {
//     let x
//     ctx.clearRect(0, 0, w, h)
//     if (dir === -1) {
//       x = w - w * (t / transitionTime)
//       ctx.fillRect(0, 0, x, h)
//     } else {
//       x = w * (t / transitionTime)
//       ctx.fillRect(0, 0, x, h)
//     }
//     c = requestAnimationFrame(lastExitToTransition)
//   }
// }

// const exitFunc = () => {
//   if (c) {
//     cancelAnimationFrame(c)
//   }
//   then = Date.now()
//   t = 0
//   dir = 1
//   ctx = cover.getContext('2d')
//   lastExitToTransition()
// }

// const entryFunc = () => {
//   if (c) {
//     cancelAnimationFrame(c)
//   }
//   then = Date.now()
//   t = 0
//   dir = -1
//   ctx = cover.getContext('2d')
//   lastExitToTransition()
// }

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

  exitFunc() {
    this.cover.classList.remove('entering')
    this.cover.classList.add('exiting')
    this.renderGL()
  }

  entryFunc() {
    this.cover.classList.remove('exiting')
    this.cover.classList.add('entering')
    this.renderGL()
  }

  render() {
    return (
      <TransitionLink
        exit={{
          trigger: () => {
            this.exitFunc()
          },
          delay: 0,
          length: transitionTime / 1000
        }}
        entry={{
          delay: transitionTime / 1000,
          length: transitionTime / 1000,
          trigger: () => {
            this.entryFunc()
          }
        }}
        to={this.props.to}
      >
        {this.props.children}
      </TransitionLink>
    )
  }
}
