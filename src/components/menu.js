import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import GLTransitionLink from './GLTransitionLink'

import './menu.css'

const Menu = props => (
  <StaticQuery
    query={graphql`
      query pagesQuery {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: { frontmatter: { tags: { nin: ["effect", "fullscreen"] } } }
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
    render={data => {
      return (
        <>
          <div className="pages">
            <a
              href="#"
              onClick={() => {
                document.querySelector('.menu').classList.toggle('open')
              }}
              className="menu-toggle"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 250 250"
                style={{
                  fill: 'grey',
                  color: '#fff',
                  position: 'absolute',
                  right: 0,
                  top: 0
                }}
                aria-hidden="true"
              >
                <path d="M0,0 L115,115 L250,250 L250,0 Z" />
                <rect x="120" y="20" width="100" height="20" fill="white" />
                <rect x="120" y="50" width="100" height="20" fill="white" />
                <rect x="120" y="80" width="100" height="20" fill="white" />
              </svg>
            </a>
            <h3>
              <GLTransitionLink setTransition={props.setTransition} to="/">
                React Neon
              </GLTransitionLink>
            </h3>
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
              <li>
                <a href="https://github.com/onion2k/react-neon/">Github</a>
              </li>
            </ul>
          </div>
        </>
      )
    }}
  />
)

export default Menu
