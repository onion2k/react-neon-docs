import React from 'react'
import Menu from './menu'
import Effects from './effects'
import Fullscreen from './fullscreen'

export default class Inner extends React.Component {
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
      </div>
    )
  }
}
