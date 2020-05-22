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
          <div className="sidebar">
            <div className="spacer"></div>
            <div className="card card-body ">
              <h4>Suggest an update</h4>
              <p><a href="https://docs.google.com/forms/d/e/1FAIpQLSf9y3VY3ADLpQ4kQLGvOo4cIdEEi5Hs3en-0lWRc4wQeTRheg/viewform?usp=sf_link" target="_blank">Submit anonymous feedback here</a></p>
            </div>
            <div className="card info-card">
              <div className="card-body">
                <h4>Still have travel-related questions?</h4>
                  <p>
                    Your <a target="_blank" href="https://www.tbs-sct.gc.ca/ap/list-liste/dtc-cmv-eng.asp">Designated Departmental Travel Coordinator</a> should be able to help!
                  </p>
              </div>
            </div>
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