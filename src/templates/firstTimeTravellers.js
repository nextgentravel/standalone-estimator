import React, { useState } from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Breadcrumbs from "../components/breadcrumb"
import SEO from "../components/seo"
import { FormattedMessage } from 'react-intl';
import { navigate } from "gatsby"
import { getCurrentLangKey } from 'ptz-i18n';
import 'intl';
import { globalHistory } from "@reach/router"
import { withPreview } from 'gatsby-source-prismic'
import usePreviewData from '../utils/usePreviewData'

import TravelStep from '../components/travel-step'

const FirstTimeTravellers = ({ data }) => {
  const liveData = usePreviewData(data)
  const firstTimeTravellersData = liveData.prismicFirstTimeTravellers.data;
  const steps = liveData.prismicFirstTimeTravellers.data.steps;
  console.log('STEPS: ', steps)
  const url = globalHistory.location.pathname;
  const { langs, defaultLangKey } = liveData.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;

  console.log(liveData)

  const jumpTo = (e) => {
    navigate(
      e.target.value,
      { replace: true }
    )
  }

  return (
    <Layout>
      <main id="main-content">
        <Breadcrumbs pageTitle={firstTimeTravellersData.title.text} homeLink={homeLink} />
        <SEO title={firstTimeTravellersData.title.text} />
        <div className="hero-holder">
          <div className="container">
            <nav className="skiphold" aria-label="sidebar skiplink"><a className="sr-only sr-only-focusable aurora-skip skiplink" id="sidebar-skiplink" href="#sidebar" aria-label="skip to side"><FormattedMessage id="skipToSide"/></a></nav>
            <div className="row mb-4">
              <div className="col-sm-8"><h2>{firstTimeTravellersData.title.text}</h2></div>
              {firstTimeTravellersData.jumpTo && <div className="col-sm-2 ml-auto">
                <div className="form-group">
                  <select onBlur={jumpTo} className="custom-select text-secondary align-middle">
                    <option value="">Jump to...</option>
                    {/* {firstTimeTravellersData.jumpTo.map((item) => {
                      return (
                        <option value={`${homeLink}${item.link}`}>{item.label}</option>
                      )
                    })} */}
                  </select>
                </div>
              </div>}
            </div>
            
            <div className="lead" dangerouslySetInnerHTML={{ __html: firstTimeTravellersData.lead.html }}>
            </div>
          </div>
        </div>
        <div className="container p-0">
          <article className="content-left col-xs-12 col-sm-12 col-md-12">
            {steps.map((node, index) => {
              const data = {
                title: node.step_title,
                content: node.step_content,
                show_step_number: node.show_step_number,
                action_title: { text: node.action_title},
                action_link: node.action_link,
                action_new_window: node.action_new_window,
              }
              return (
                <TravelStep data={data} index={index} key={index} />
              )
            })}

            <p className="text-center">
              <a
                href={`${homeLink}plan`}
                className="btn btn-primary my-4 px-4 mr-4"
              >
                Plan your trip
              </a>
              <a
                href={`${homeLink}`}
                className="btn btn-outline-primary my-4 px-4 mr-4"
              >
                Back to home
              </a>
            </p>
          </article>
        </div>
      </main>
    </Layout>
  );
};

export default withPreview(FirstTimeTravellers)

export const query = graphql`
  query firstTimeTravellers($lang: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }      
      }
    }
    prismicFirstTimeTravellers(lang: {eq: $lang}) {
      data {
        lead {
          html
        }
        steps {
          step_content {
            html
          }
          step_title {
            text
          }
          show_step_number
          action_title
          action_link
          action_new_window
        }
        title {
          text
        }
      }
      lang
    }
  }
`;