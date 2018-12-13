import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'

import './menu.css'

let t = 0
let c
let then = Date.now()
let delta
let now
let dir
let transitionTime = 3000

const lastExitToTransition = () => {
  now = Date.now()
  delta = now - then
  then = now
  t += delta
  if (t > transitionTime) {
    const cover = document.getElementById('cover')
    cover.classList.remove('exiting')
    cover.classList.remove('entering')
  } else {
    c = requestAnimationFrame(lastExitToTransition)
  }
}

const exitFunc = () => {
  cancelAnimationFrame(c)
  const cover = document.getElementById('cover')
  cover.classList.remove('entering')
  cover.classList.add('exiting')
  then = Date.now()
  t = 0
  dir = 1
  lastExitToTransition()
}

const entryFunc = () => {
  cancelAnimationFrame(c)
  const cover = document.getElementById('cover')
  cover.classList.remove('exiting')
  cover.classList.add('entering')
  then = Date.now()
  t = 0
  dir = -1
  lastExitToTransition()
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
              trigger: exitFunc,
              length: 1
            }}
            entry={{
              trigger: entryFunc,
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
                      delay: 0,
                      length: transitionTime / 1000
                    }}
                    entry={{
                      delay: transitionTime / 1000,
                      length: transitionTime / 1000,
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
