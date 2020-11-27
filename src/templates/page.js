import * as React from 'react'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'

import Layout from '../components/layout'

// `data` will automatically include preview data when previewing from Prismic.
const Template = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <h1>Preview</h1>
    </Layout>
  )
}

export const query = graphql`
  query Steps($uid: String!) {
    prismicTravelSection(uid: { eq: $uid }) {
      data {
        title {
          text
        }
      }
    }

    allPrismicTravelStep(filter: {data: {belongs_to: {uid: {eq: $uid}}}}, sort: {fields: data___order}) {
      nodes {
        data {
          action_title {
            text
          }
          action_link
          belongs_to {
            slug
          }
          title {
            text
          }
          content {
            html
          }
          show_step_number
        }
      }
    }
  }
`

export default withPreview(Template)