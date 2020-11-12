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

const GenericPageTemplate = ({ data }) => {
  const url = globalHistory.location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  const page = data.prismicGenericContentPage.data;
  return (
    <Layout>
      <main id="main-content">
        <Breadcrumbs pageTitle={page.title.text} homeLink={homeLink} />
        <SEO title={page.title.text} />
        <div className="hero-holder">
          <div className="container">
            <nav className="skiphold" aria-label="sidebar skiplink"><a className="sr-only sr-only-focusable aurora-skip skiplink" id="sidebar-skiplink" href="#sidebar"><FormattedMessage id="skipToSide"/></a></nav>
            <div className="row mb-4">
              <div className="col-sm-8"><h2 className="display-5">{page.title.text}</h2></div>
            </div>
            <div className="lead">
              Add lead text
            </div>
          </div>
        </div>
        <div className="container p-0">
          <article className="content-left col-xs-12 col-sm-12 col-md-12" dangerouslySetInnerHTML={{ __html: page.content.html }}>
          </article>
        </div>
      </main>
    </Layout>
  );
};

export default GenericPageTemplate

export const query = graphql`
  query GenericContent($uid: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }      
      }
    }
    prismicGenericContentPage(uid: {eq: $uid}) {
      data {
        content {
          html
        }
        title {
          text
        }
      }
    }
  }
`;