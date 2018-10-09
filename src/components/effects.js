import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import './menu.css'

const Effects = () => (
  <StaticQuery
    query={graphql`
      query EffectsQuery {
        allMdx(
          sort: { fields: [frontmatter___title], order: DESC }
          filter: { frontmatter: { tags: { eq: "effect" } } }
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
      <div className="effects">
        <h3>Effects</h3>
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
        </ul>
      </div>
    )}
  />
)

export default Effects
