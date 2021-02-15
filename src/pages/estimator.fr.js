import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Estimator from "../components/estimator"

const EstimatorLayout = () => {
  return (
    <Layout>
      <SEO title="Estimator" />
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

export default EstimatorLayout;
