import * as React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'

import Layout from '../components/layout'

// `data` will automatically include preview data when previewing from Prismic.
const Template = ({ data }) => {
  return (
    <Layout>
      <h1>Preview</h1>
    </Layout>
  )
}

export default withPreview(Template)