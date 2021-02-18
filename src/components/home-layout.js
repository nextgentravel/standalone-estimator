import React, {useEffect, useState} from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import Estimator from "../components/estimator"

import {
  StaticQuery,
  graphql
} from 'gatsby';

export default ({ data }) => {
    const [pos, setPos] = useState("top")
    useEffect (()=>{
      document.addEventListener("scroll", e => {
          let scrolled = document.scrollingElement.scrollTop;
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
              prismicStandaloneestimatorHomepage {
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
                }
            }
        `
      }
      render = {
        data => {
          const homePage = data.prismicStandaloneestimatorHomepage.data;
          return (
            <Layout>
              <SEO title="Home" />
              <w-screen mt-4="true" fluid="true" id="container">
                <div>
                  <main id="main-content" role="main">
                    <div className="container mt-4">
                      <Estimator />
                    </div>
                  </main>
                </div>
              </w-screen>
              {pos === "top" && <footer dangerouslySetInnerHTML={{ __html: homePage.prototype_footer.html }} className="prototype-banner fixed-bottom"></footer>}
            </Layout>
          )
        }
      }
    />
  )
}
