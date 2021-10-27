import React from "react";

import { useIntl } from 'react-intl';

import Layout from "../components/layout"
import SEO from "../components/seo";
import Estimator from "../components/estimator"

import {
  useStaticQuery,
  graphql
} from 'gatsby';

export default ({ data }) => {
    const intl = useIntl();
    let locale = `${intl.locale}-ca`;
    const { allPrismicStandaloneestimatorHomepage } = useStaticQuery(graphql`
    {
      allPrismicStandaloneestimatorHomepage {
        nodes {
          data {
            title {
              text
            }
          }
          lang
        }
      }
    }`)

    let homePageCopy = allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;

    return (
      <Layout>
        <SEO title={homePageCopy.title.text} lang={locale.substring(0,2)} />
        <w-screen mt-4="true" fluid="true" id="container">
          <div>
            <main id="main-content" aria-labelledby="h2-label">
              <div className="container mt-4">
                <Estimator />
              </div>
            </main>
          </div>
        </w-screen>
      </Layout>
  )
}
