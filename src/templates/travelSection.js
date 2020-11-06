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
import { withPreview } from 'gatsby-source-prismic'
import usePreviewData from '../utils/usePreviewData'

const TravelSection = ({ data }) => {
  const liveData = usePreviewData(data);
  const travelSteps = data.allPrismicTravelStep;
  const travelSection = data.prismicTravelSection.data;
  const faqItems = data.allPrismicFaqQuestion.nodes;
  console.log('faqItems', faqItems)
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
        <Breadcrumbs pageTitle={travelSection.title.text} homeLink={homeLink} />
        <SEO title={travelSection.title.text} />
        <div className="hero-holder">
          <div className="container">
            <nav className="skiphold" aria-label="sidebar skiplink"><a className="sr-only sr-only-focusable aurora-skip skiplink" id="sidebar-skiplink" href="#sidebar"><FormattedMessage id="skipToSide"/></a></nav>
            <div className="row mb-4">
              <div className="col-sm-8"><h2 className="display-5">{travelSection.title.text}</h2></div>
              {travelSection.jumpTo && <div className="col-sm-2 ml-auto">
                <div className="form-group">
                  <select onChange={jumpTo} className="custom-select text-secondary align-middle">
                    <option value="">Jump to...</option>
                    {/* {travelSection.jumpTo.map((item) => {
                      return (
                        <option value={`${homeLink}${item.link}`}>{item.label}</option>
                      )
                    })} */}
                  </select>
                </div>
              </div>}
            </div>
            
            <div className="lead" dangerouslySetInnerHTML={{ __html: travelSection.lead.html }}>
            </div>
          </div>
        </div>
        <div className="container p-0">
          <article className="content-left col-xs-12 col-sm-12 col-md-12">
            {travelSteps.nodes.map((node, index) => {
              return (
                <div className="card px-4 pt-4 my-4 bg-light">
                  <div className="row">
                    <div className="col-sm-8">
                      <h3 className="mb-3">
                        {node.data.show_step_number &&
                          <span className="text-secondary pr-3">
                            Step {index + 1}
                          </span>
                        }
                        {node.data.title.text}
                      </h3>
                      <div dangerouslySetInnerHTML={{ __html: node.data.content.html }}></div>
                    </div>
                    <div className="col-sm-4">
                        {node.data.action_link &&
                          <p className="text-center">
                            <a
                              href={node.data.action_link}
                              className="btn btn-primary my-4 px-4"
                              target={node.data.action_new_window ? '_blank' : '' }
                            >
                              {node.data.action_title.text}
                            </a>
                          </p>
                        }
                    </div>
                  </div>
                </div>
              )
            })}

            
            {faqItems.length > 0 &&
              <>
                <h3 className="pt-5">Frequently Asked Questions</h3>

                {faqItems.map ((item, index) => {
                  return (
                    <div
                      className="card px-4 pt-4 pb-3 my-4"
                      key={index}
                    >
                      <div className="row">
                        <div className="col-sm-12">
                          <p className="lead mb-1">
                            {item.data.question.text}
                          </p>
                        </div>
                        <React.Fragment>
                          <div className="col-sm-12 mt-2">
                            {item.data.answer.text}
                          </div>
                        </React.Fragment>
                      </div>
                    </div>
                  );
                })}
              </>
            }

            <p className="text-center">
              {travelSection.next_section.document &&
                <a
                  href={`${homeLink}${travelSection.next_section.document.uid}`}
                  className="btn btn-primary my-4 px-4 mr-4"
                >
                  View {travelSection.next_section.document.data.title.text}
                </a>
              }
              {travelSection.previous_section.document &&
                <a
                  href={`${homeLink}${travelSection.previous_section.document.uid}`}
                  className="btn btn-outline-primary my-4 px-4"
                >
                  Back to {travelSection.previous_section.document.data.title.text}
                </a>
              }
            </p>
          </article>
        </div>
      </main>
    </Layout>
  );
};

export default withPreview(TravelSection)

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
    allPrismicTravelStep(filter: {data: {belongs_to: {uid: {eq: $uid}}}}, sort: {fields: data___order}) {
      nodes {
        data {
          action_title {
            text
          }
          action_link
          belongs_to {
            slug
          }
          title {
            text
          }
          content {
            html
          }
          show_step_number
        }
      }
    }
    allPrismicFaqQuestion(filter: {data: {belongs_to: {uid: {eq: $uid}}}}, sort: {fields: data___order}) {
      nodes {
        data {
          answer {
            text
          }
          question {
            text
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
        next_section {
          document {
            ... on PrismicTravelSection {
              data {
                title {
                  text
                }
              }
              uid
            }
          }
        }
        previous_section {
          document {
            ... on PrismicTravelSection {
              data {
                title {
                  text
                }
              }
              uid
            }
          }
        }
    }
  }


  }
`;