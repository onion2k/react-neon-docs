import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
              excerpt
              parent {
                ... on File {
                  name
                  absolutePath
                  relativePath
                }
              }
              timeToRead
              frontmatter {
                title
                author
                draft
                date(formatString: "DD MMMM, YYYY")
                tags
              }
            }
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
        <Header siteTitle={data.site.siteMetadata.title} location={location} />

        {data.allMdx.edges.map(
          ({ node }) =>
            !node.frontmatter.draft && (
              <div key={node.id}>
                <h4
                  style={{
                    marginBottom: rhythm(1 / 4)
                  }}
                >
                  <Link to={`/${node.parent.name}/`}>
                    {node.frontmatter.title || node.parent.name}
                  </Link>
                </h4>
              </div>
            )
        )}


        <div
          style={{
            margin: '0 auto',
            maxWidth: rhythm(22),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
          }}
        >
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

