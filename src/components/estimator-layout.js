import React, {useEffect, useState} from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import Estimator from "../components/estimator"
import { useIntl } from 'react-intl';

import {
  graphql
} from 'gatsby';

export default () => {
    return (
      <Layout>
        <SEO title="GC Travel Calculator Tool" />
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
