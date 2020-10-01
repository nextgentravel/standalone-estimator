import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Breadcrumbs from "../components/breadcrumb"
import SEO from "../components/seo"
import { FormattedMessage } from 'react-intl';
import { navigate } from "gatsby"
import { getCurrentLangKey } from 'ptz-i18n';
import 'intl';
import { globalHistory } from "@reach/router"

export default ({ data }) => {
  const post = data.markdownRemark;
  const url = globalHistory.location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;

  const jumpTo = (e) => {
    navigate(
      e.target.value,
      { replace: true }
    )
  }

  return (
    <Layout>
      <main id="main-content">
        <Breadcrumbs pageTitle={post.frontmatter.title} homeLink={homeLink} />
        <SEO title={post.frontmatter.title} />
        <div className="hero-holder">
          <div className="container">
            <nav className="skiphold" aria-label="sidebar skiplink"><a className="sr-only sr-only-focusable aurora-skip skiplink" id="sidebar-skiplink" href="#sidebar"><FormattedMessage id="skipToSide"/></a></nav>
            <div className="row mb-4">
              <div className="col-sm-8"><h2 className="display-5">{post.frontmatter.title}</h2></div>
              {post.frontmatter.jumpTo && <div className="col-sm-2 ml-auto">
                <div class="form-group">
                  <select onChange={jumpTo} class="custom-select text-secondary align-middle">
                    <option value="">Jump to...</option>
                    {post.frontmatter.jumpTo.map((item) => {
                      return (
                        <option value={`${homeLink}${item.link}`}>{item.label}</option>
                      )
                    })}
                  </select>
                </div>
              </div>}
            </div>
            
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
        lead
        jumpTo {
          label
          link
        }
      }
    }
  }
`;