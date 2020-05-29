import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { html } = markdownRemark
  // left this previous dec of frontmatter for reference.
  // const { frontmatter, html } = markdownRemark
  return (
    <Layout>
        <div className="info-page-container holder">
          <div className="info-page inside">
              <div
              className="info-page-content"
              dangerouslySetInnerHTML={{ __html: html }}
              />
          </div>
        </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`