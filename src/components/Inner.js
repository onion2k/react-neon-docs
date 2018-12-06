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
          <Menu />
          <Effects />
          <Fullscreen />
        </div>
        <div className="main">{children}</div>
      </div>
    )
  }
}
