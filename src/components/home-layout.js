import React, {useEffect, useState} from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import { useIntl } from 'react-intl';
import { FaCalculator, FaPlusCircle, FaMinusCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa'

import {
  useStaticQuery,
  graphql
} from 'gatsby';

function posTop() {
  return typeof window.pageYOffset != 'undefined' ? window.pageYOffset: document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop? document.body.scrollTop:0;
}

export default ({ data }) => {
  const intl = useIntl();
  let locale = `${intl.locale}-ca`;
  const cmsAndEstimatorData = useStaticQuery(graphql`
    query cmsAndEstimatorData {
      allPrismicStandaloneestimatorHomepage {
        nodes {
          data {
            prototype_footer {
              html
            }
            landing_page_lead {
              html
            }
            landing_page_title_2 {
              text
            }
            landing_page_content {
              html
            }
            landing_page_action_button_text
            land_page_action_button_link
          }
          lang
        }
      }
      allPrismicStandaloneestimatorCopy {
        nodes {
          data {
            disclaimer
            disclaimer_body {
              html
            }
            explainer_body {
              html
            }
            explainer_title {
              text
            }
          }
          lang
        }
      }
    }
  `);

  let homePageCopy = cmsAndEstimatorData.allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;
  let estimatorCopy = cmsAndEstimatorData.allPrismicStandaloneestimatorCopy.nodes.find(function(o){ return o.lang === locale }).data;

  function formattedMessage(prismicKey, classes) {
    let messageType = typeof estimatorCopy[prismicKey]
    let message;
    if (messageType === 'string') {
        message = estimatorCopy[prismicKey]
    } else if (messageType === 'object' && estimatorCopy[prismicKey] !== null) {
        message = <span className={classes} dangerouslySetInnerHTML={{ __html: estimatorCopy[prismicKey].html }}></span>
    } else {
        message = 'MISSING MESSAGE ' + prismicKey
    }
    return message
  }

    const [pos, setPos] = useState("top");

    useEffect (()=>{
      document.addEventListener("scroll", e => {
          let scrolled = posTop();
          if (scrolled >= 5){
             setPos("moved")
          } else {
             setPos("top")
          }
      })
    },[])

    const [explainerCollapsed, setExplainerCollapsed] = useState(true);
    const [disclaimerCollapsed, setDisclaimerCollapsed] = useState(true);

    return (
      <Layout>
        <SEO aria-hidden="true" title={homePageCopy.landing_page_title_2.text} lang={locale.substring(0,2)} />
        <w-screen mt-4="true" fluid="true" id="container">
          <div>
            <main id="main-content" role="main">
              <div className="container mt-4">
                <div className="mb-5" dangerouslySetInnerHTML={{ __html: homePageCopy.landing_page_lead.html }}></div>
                <h2 className="mb-4">{homePageCopy.landing_page_title_2.text}</h2>
                <div className="mb-4" dangerouslySetInnerHTML={{ __html: homePageCopy.landing_page_content.html }}></div>
                <a className="btn btn-primary mb-5" href={homePageCopy.land_page_action_button_link} role="button">{homePageCopy.landing_page_action_button_text}</a>
                <div className="card bg-white py-4 px-5 mb-2">
                  <div className="row">
                      <button className="col-sm-12 pl-2 pb-1 btn btn-plain" aria-expanded="false" onClick={() => setExplainerCollapsed(!explainerCollapsed)}>
                          <h2 className='h3'><FaCalculator focusable="false" aria-hidden="true" focusable="false" aria-hidden="true" size="20" className='mb-1 mr-2' />{estimatorCopy.explainer_title.text}</h2>
                          {explainerCollapsed &&
                            <FaCaretDown focusable="false"
                              aria-hidden="true"
                              size="25"
                              className="explainer-carets"
                            />
                          }
                          {!explainerCollapsed &&
                            <FaCaretUp focusable="false"
                                aria-hidden="true"
                              size="25"
                              className="explainer-carets"
                            />
                          }
                      </button>
                      {!explainerCollapsed &&
                          <React.Fragment>
                              <div className="col-sm-12 mt-2" dangerouslySetInnerHTML={{ __html: estimatorCopy.explainer_body.html }}>
                              </div>
                          </React.Fragment>
                      }
                      {explainerCollapsed &&
                          <React.Fragment>
                              <div className="col-sm-12" />
                          </React.Fragment>
                      }
                  </div>
              </div>
              <div className="mb-4">
                <h4 className="step-disclaimer-header mt-5 pl-4">
                    <button className="button-explainer btn btn-plain pb-3" aria-expanded="false" onClick={() => setDisclaimerCollapsed(!disclaimerCollapsed)}>
                      {disclaimerCollapsed &&
                          <FaPlusCircle focusable="false" aria-hidden="true" size="15" />}
                      {!disclaimerCollapsed &&
                          <FaMinusCircle focusable="false" aria-hidden="true" size="15" />
                      }
                      <span>{formattedMessage('disclaimer')}</span>
                    </button>
                </h4>
                {!disclaimerCollapsed &&
                    <div className="px-5 pb-3">{formattedMessage('disclaimer_body')}</div>
                }
                {disclaimerCollapsed &&
                    <div className="mb-4"></div>
                }
              </div>
              </div>
              {pos === "top" && <div dangerouslySetInnerHTML={{ __html: homePageCopy.prototype_footer.html }} className="prototype-banner fixed-bottom"></div>}
            </main>
          </div>
        </w-screen>
      </Layout>
  )
}
