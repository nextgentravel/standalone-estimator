import React, {useEffect, useState} from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import Estimator from "../components/estimator"
import { useIntl } from 'react-intl';

import {
  StaticQuery,
  graphql
} from 'gatsby';

function posTop() {
  return typeof window.pageYOffset != 'undefined' ? window.pageYOffset: document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop? document.body.scrollTop:0;
}

export default ({ data }) => {
    const [pos, setPos] = useState("top");
    const intl = useIntl()
    let locale = `${intl.locale}-ca`;
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
    return (
      <StaticQuery query = {
        graphql `
            query homePage {
              allPrismicStandaloneestimatorHomepage {
                nodes {
                  data {
                    lead {
                      html
                    }
                    title {
                      text
                    }
                    prototype_footer {
                      html
                    }
                  }
                  lang
                }
              }
            }
        `
      }
      render = {
        data => {
          let messages = data.allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;
          return (
            <Layout>
              <SEO title="Home" />
              <w-screen mt-4="true" fluid="true" id="container">
                <div>
                  <main id="main-content" role="main">
                    <div className="container mt-4">
                      <Estimator />
                    </div>
                    {pos === "top" && <div dangerouslySetInnerHTML={{ __html: messages.prototype_footer.html }} className="prototype-banner fixed-bottom"></div>}
                  </main>
                </div>
              </w-screen>
            </Layout>
          )
        }
      }
    />
  )
}
