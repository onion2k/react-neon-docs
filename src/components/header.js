import React from 'react'
import Link from './link'
import Headroom from 'react-headroom'
import { rhythm, scale } from '../utils/typography'
import PropTypes from 'prop-types'

const Header = ({ siteTitle, location }) => {
  return (
    <Headroom
      style={{
        margin: '0 auto',
        maxWidth: rhythm(22),
        background: 'white',
        boxShadow: '0px 15px 10px -15px gray'
      }}
    >
      <div
        style={{
          ...scale(0.5),
          padding: `${rhythm(0.25)} ${rhythm(0.5)}`
        }}
      >
        <Link to="/">{siteTitle}</Link>
      </div>
    </Headroom>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

export default Header
