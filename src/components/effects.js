import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import GLTransitionLink from './GLTransitionLink'
import './menu.css'

const Effects = props => (
  <StaticQuery
    query={graphql`
      query EffectsQuery {
        allMdx(
          sort: { fields: [frontmatter___title], order: ASC }
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
                  <GLTransitionLink
                    setTransition={props.setTransition}
                    to={`/${node.parent.relativeDirectory}/${
                      node.parent.name
                    }/`}
                  >
                    {node.frontmatter.title || node.parent.name}
                  </GLTransitionLink>
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
