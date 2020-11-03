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
  console.log('data', data)
  const travelStep = data.allPrismicTravelStep;
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
        <Breadcrumbs pageTitle={travelStep.title} homeLink={homeLink} />
        <SEO title={travelStep.title} />
        <div className="hero-holder">
          <div className="container">
            <nav className="skiphold" aria-label="sidebar skiplink"><a className="sr-only sr-only-focusable aurora-skip skiplink" id="sidebar-skiplink" href="#sidebar"><FormattedMessage id="skipToSide"/></a></nav>
            <div className="row mb-4">
              <div className="col-sm-8"><h2 className="display-5">{travelStep.title}</h2></div>
              {travelStep.jumpTo && <div className="col-sm-2 ml-auto">
                <div className="form-group">
                  <select onChange={jumpTo} className="custom-select text-secondary align-middle">
                    <option value="">Jump to...</option>
                    {travelStep.jumpTo.map((item) => {
                      return (
                        <option value={`${homeLink}${item.link}`}>{item.label}</option>
                      )
                    })}
                  </select>
                </div>
              </div>}
            </div>
            
            <p className="lead">
              {travelStep.lead}
            </p>
          </div>
        </div>
        <div className="container">
          <div
            className="row"
            dangerouslySetInnerHTML={{ __html: travelStep.html }}
          />
        </div>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($uid: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }      
      }
    }
    allPrismicTravelStep(filter: {data: {belongs_to: {uid: {eq: $uid}}}}) {
      nodes {
        data {
          action_title {
            text
          }
          belongs_to {
            slug
          }
        }
      }
    }
    prismicTravelSection(uid: {eq: $uid}) {
      data {
        lead {
          html
        }
        title {
          text
        }
    }
  }


  }
`;