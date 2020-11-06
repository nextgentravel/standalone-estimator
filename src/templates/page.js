import * as React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'

import { Layout } from '../components/layout'

// `data` will automatically include preview data when previewing from Prismic.
const PageTemplate = ({ data }) => (
  <Layout>
    <h1>{data.prismicTravelSection.data.title.text}</h1>
  </Layout>
)

export default withPreview(PageTemplate)

export const query = graphql`
  query PageTemplate($uid: String!) {
    prismicTravelSection(uid: { eq: $uid }) {
      data {
        title {
          text
        }
      }
    }
    prismicTravelStep(uid: { eq: $uid }) {
      data {
        title {
          text
        }
      }
    }

  }
`