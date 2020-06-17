import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
        <main>
          <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb pl-0">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{post.frontmatter.title}</li>
                </ol>
            </nav>
          </div>
          <div className="hero-holder">
            <div className="container">
              <h2 className="display-5">{post.frontmatter.heading}</h2>
              <p className="lead">
                {post.frontmatter.lead}
              </p>
            </div>
          </div>
          <div className="container">
            <div
              className="row"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </main>
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        heading
        lead
      }
    }
  }
`;