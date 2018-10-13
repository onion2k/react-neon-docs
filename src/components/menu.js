import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import './menu.css'

const Menu = () => (
  <StaticQuery
    query={graphql`
      query pagesQuery {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: { frontmatter: { tags: { ne: "effect" } } }
        ) {
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
      <div className="pages">
        <h3>React Neon</h3>
        <ul>
          {data.allMdx.edges.map(({ node }) => {
            return (
              !node.frontmatter.draft && (
                <li key={node.id}>
                  <Link
                    to={`/${node.parent.relativeDirectory}/${
                      node.parent.name
                    }/`}
                  >
                    {node.frontmatter.title || node.parent.name}
                  </Link>
                </li>
              )
            )
          })}
          <li>
            <a href="https://github.com/onion2k/react-neon/">Github</a>
          </li>
        </ul>
      </div>
    )}
  />
)

export default Menu
