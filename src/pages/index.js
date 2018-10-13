import React from 'react'
import { graphql } from 'gatsby'
import { rhythm } from '../utils/typography'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = ({ data, location }) => <Layout location={location} />

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
