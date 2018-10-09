import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import './menu.css'

const Menu = () => (
  <StaticQuery
    query={graphql`
      query MenuQuery {
        allMdx(sort: { fields: [frontmatter___title], order: DESC }) {
          edges {
            node {
              id
              excerpt
              parent {
                ... on File {
                  name
                  absolutePath
                  relativeDirectory
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
      <div className="menu">
        {data.allMdx.edges.map(({ node }) => {
          return (
            !node.frontmatter.draft && (
              <div key={node.id}>
                <h4
                  style={{
                    marginBottom: rhythm(1 / 4)
                  }}
                >
                  <Link
                    to={`/${node.parent.relativeDirectory}/${
                      node.parent.name
                    }/`}
                  >
                    {node.frontmatter.title || node.parent.name}
                  </Link>
                </h4>
              </div>
            )
          )
        })}
      </div>
    )}
  />
)

export default Menu
