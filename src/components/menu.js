import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import './menu.css'

const entryCleanup = () => {
  const cover = document.getElementById('cover')
  cover.classList.remove('entering')
}

const exitFunc = ({ exit, node }) => {
  const cover = document.getElementById('cover')
  cover.classList.remove('entering')
  cover.classList.add('exiting')
}

const entryFunc = ({ entry, node }) => {
  const cover = document.getElementById('cover')
  cover.classList.remove('exiting')
  cover.classList.add('entering')
  setTimeout(entryCleanup, 1000)
}

const Menu = () => (
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
    render={data => (
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
          <TransitionLink
            exit={{
              trigger: ({ exit, node }) => {},
              length: 1
            }}
            entry={{
              delay: 1
            }}
            to="/"
          >
            React Neon
          </TransitionLink>
        </h3>
        <ul>
          {data.allMdx.edges.map(({ node }) => {
            return (
              !node.frontmatter.draft && (
                <li key={node.id}>
                  <TransitionLink
                    exit={{
                      trigger: exitFunc,
                      length: 2
                    }}
                    entry={{
                      delay: 2,
                      length: 2,
                      trigger: entryFunc
                    }}
                    to={`/${node.parent.relativeDirectory}/${
                      node.parent.name
                    }/`}
                  >
                    {node.frontmatter.title || node.parent.name}
                  </TransitionLink>
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
