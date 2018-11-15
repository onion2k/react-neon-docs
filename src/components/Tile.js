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

class CaptionedTile extends React.Component {
  render() {
    let { caption } = this.props
    return (
      <div className="CaptionedTile">
        <Tile
          bgIm={`https://source.unsplash.com/random?r=${Math.floor(
            Math.random() * 10000
          )}`}
        />
        {caption}
      </div>
    )
  }
}

class ImgTile extends React.Component {
  render() {
    return (
      <Tile
        bgIm={`https://source.unsplash.com/random?r=${Math.floor(
          Math.random() * 10000
        )}`}
      />
    )
  }
}

export { ImgTile as default, CaptionedTile, Tile }
