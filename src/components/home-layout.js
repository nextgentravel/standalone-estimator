import React, { useState } from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import { FaMinus } from 'react-icons/fa';
import Estimator from "../components/estimator"

import {
  StaticQuery,
  graphql
} from 'gatsby';

export default ({ data }) => {
    const [showContactCard, setShowContactCard] = useState(false);
    const handleShowContactCardToggle = () => {
      setShowContactCard(!showContactCard);
    }
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
            </Layout>
          )
        }
      }
    />
  )
}
