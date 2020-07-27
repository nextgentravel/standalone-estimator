import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Breadcrumbs from "../components/breadcrumb"
import SEO from "../components/seo"
import { FormattedMessage } from 'react-intl';

import { getCurrentLangKey } from 'ptz-i18n';
import 'intl';
import { globalHistory } from "@reach/router"

export default ({ data }) => {
  const post = data.markdownRemark;
  const url = globalHistory.location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  return (
    <Layout>
        <section id="main-content">
          <SEO title={post.frontmatter.title} />
          <Breadcrumbs pageTitle={post.frontmatter.title} homeLink={homeLink} />
          <div className="hero-holder">
            <div className="container">
              <nav className="skiphold"><a className="sr-only sr-only-focusable aurora-skip skiplink" href="#sidebar"><FormattedMessage id="skipToSide"/></a></nav>
              <h1 className="display-5">{post.frontmatter.heading}</h1>
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
        </section>
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($slug: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }      
      }
    }
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