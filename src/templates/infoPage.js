import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Breadcrumbs from "../components/breadcrumb"
import SEO from "../components/seo"

import { getCurrentLangKey } from 'ptz-i18n';
import 'intl';
import { globalHistory } from "@reach/router"
import { FormattedMessage } from "react-intl";

export default ({ data }) => {
  const post = data.markdownRemark;
  const url = globalHistory.location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  return (
    <Layout>
        <main id="main-content">
          <SEO title={post.frontmatter.title} />
          <Breadcrumbs pageTitle={post.frontmatter.title} homeLink={homeLink} />
          <div className="hero-holder">
            <div className="container">
              <a className="sr-only sr-only-focusable aurora-skip skiplink" href="#sidebar"><FormattedMessage id="sidebarSkip"/></a>
              <h1 className="display-5">{post.frontmatter.heading}</h1>
              <p className="lead">
                {post.frontmatter.lead}
              </p>
            </div>
          </div>
          <article className="container">
            <div
              className="row"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        </main>
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