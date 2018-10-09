import React from 'react'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'
import { rhythm, scale } from '../utils/typography'
import PropTypes from 'prop-types'

const Header = ({ siteTitle, location }) => {
  console.log(location)
  return (
    <Headroom
      style={{
        boxShadow: '0px 15px 10px -15px gray'
      }}
      wrapperStyle={{
        marginBottom: '30px'
      }}
    >
      <div
        style={{
          ...scale(0.5),
          padding: `${rhythm(0.25)} ${rhythm(0.5)}`
        }}
      >
        <Link to="/">
          {siteTitle} {location.pathname}
        </Link>
      </div>
    </Headroom>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

export default Header
