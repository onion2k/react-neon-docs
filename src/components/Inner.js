import React from 'react'
import Menu from './menu'
import Effects from './effects'
import Fullscreen from './fullscreen'
import GLTransitionOverlay from './GLTransitionOverlay'

export default class Inner extends React.Component {
  constructor() {
    super()
    this.setTransition = this.setTransition.bind(this)
    this.state = { transition: null }
  }
  setTransition(dir) {
    console.log('Set transition', dir)
    this.setState({ transition: dir })
  }
  render() {
    let { children } = this.props
    return (
      <div className="wrapper">
        <div className="menu">
          <Menu setTransition={this.setTransition} />
          <Effects setTransition={this.setTransition} />
          <Fullscreen setTransition={this.setTransition} />
        </div>
        <div className="main">{children}</div>
        <GLTransitionOverlay transition={this.state.transition} />
      </div>
    )
  }
}
