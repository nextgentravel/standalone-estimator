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
    const estimatorData = useStaticQuery(graphql`
      query estimatorData {
        allPrismicStandaloneestimatorCopy {
          nodes {
            data {
              title {
                text
              }
            }
            lang
          }
        }
      }
    `);

    let estimatorCopy = estimatorData.allPrismicStandaloneestimatorCopy.nodes.find(function(o){ return o.lang === locale }).data;

    return (
      <Layout>
        <SEO title={estimatorCopy.title.text} lang={locale.substring(0,2)} />
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
