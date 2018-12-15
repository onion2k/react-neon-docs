import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'

let t = 0
let c
let then = Date.now()
let delta
let now
let dir = 1
let transitionTime = 500
let ctx, w, h

const lastExitToTransition = () => {
  now = Date.now()
  delta = now - then
  then = now
  t += delta
  if (t > transitionTime) {
    const cover = document.getElementById('cover')
    cover.classList.remove('exiting')
    cover.classList.remove('entering')
  } else {
    let x
    ctx.clearRect(0, 0, w, h)
    if (dir === -1) {
      x = w - w * (t / transitionTime)
      ctx.fillRect(0, 0, x, h)
    } else {
      x = w * (t / transitionTime)
      ctx.fillRect(0, 0, x, h)
    }
    c = requestAnimationFrame(lastExitToTransition)
  }
}

const exitFunc = () => {
  if (c) {
    cancelAnimationFrame(c)
  }
  const cover = document.getElementById('cover')
  cover.classList.remove('entering')
  cover.classList.add('exiting')
  then = Date.now()
  t = 0
  dir = 1
  w = cover.clientWidth
  h = cover.clientHeight

  cover.width = w
  cover.height = h
  ctx = cover.getContext('2d')
  lastExitToTransition()
}

const entryFunc = () => {
  if (c) {
    cancelAnimationFrame(c)
  }
  const cover = document.getElementById('cover')
  cover.classList.remove('exiting')
  cover.classList.add('entering')
  then = Date.now()
  t = 0
  dir = -1
  w = cover.clientWidth
  h = cover.clientHeight
  cover.width = w
  cover.height = h
  ctx = cover.getContext('2d')
  lastExitToTransition()
}

export default class GLTransitionLink extends React.Component {
  render() {
    return (
      <TransitionLink
        exit={{
          trigger: exitFunc,
          delay: 0,
          length: transitionTime / 1000
        }}
        entry={{
          delay: transitionTime / 1000,
          length: transitionTime / 1000,
          trigger: entryFunc
        }}
        to={this.props.to}
      >
        {this.props.children}
      </TransitionLink>
    )
  }
}
