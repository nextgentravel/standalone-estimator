import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RatesChecker from "../components/rates-checker"
import Breadcrumbs from "../components/breadcrumb"

const RatesPage = () => {
  return (
    <Layout>
      <SEO title="Rates and Limits" />
      <w-screen mt-4="true" fluid="true" id="container">
        <div>
          <main id="main-content" role="main">
            <Breadcrumbs pageTitle={'Find Your Rates and Limits'} homeLink={'/en/'} />
            <div className="container mt-4">
              <RatesChecker />
            </div>
          </main>
        </div>
      </w-screen>
    </Layout>
  )
}

export default RatesPage;
