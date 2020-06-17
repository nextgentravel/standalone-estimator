import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
        <div className="info-page-container container">
          <div class="container pl-0">
              <nav aria-label="breadcrumb">
                  <ol class="breadcrumb pl-0">
                      <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                      <li class="breadcrumb-item active" aria-current="page">Suggest an Update</li>
                  </ol>
              </nav>
          </div>
          <div className="info-page row">
              <main
              className="info-page-content col-12"
              dangerouslySetInnerHTML={{ __html: post.html }}
              />
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