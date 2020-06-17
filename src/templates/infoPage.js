import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
        <SEO title={post.frontmatter.title} />
        <div className="info-page-container container">
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