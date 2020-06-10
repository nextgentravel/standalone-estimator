import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
        <div className="info-page-container holder">
          <div className="info-page inside">
              <main
              className="info-page-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
              >
              </main>
          </div>
        </div>
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;