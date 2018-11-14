import React from 'react'
import './tile.css'

class Tile extends React.Component {
  render() {
    let { children, className } = this.props

    className = className ? className + ' Tile' : 'Tile'

    return (
      <div
        style={{
          backgroundColor: this.props.bg || 'black',
          backgroundImage: this.props.bgIm ? `url(${this.props.bgIm})` : ''
        }}
        className={className}
      >
        {children}
      </div>
    )
  }
}

class ImgTile extends React.Component {
  render() {
    return <Tile bgIm="https://source.unsplash.com/featured/?night" />
  }
}

export { ImgTile as default, Tile }
