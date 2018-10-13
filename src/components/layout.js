import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Menu from './menu'
import Effects from './effects'
import './layout.css'

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        >
          <html lang="en" />
        </Helmet>

        <div className="wrapper">
          <div className="menu">
            <Menu />
            <Effects />
          </div>
          <div className="main">{children}</div>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
