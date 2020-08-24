import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumbs from "../components/breadcrumb"
import Kilometrics from "../components/kilometrics"

const KilometricsPage = () => {
  return (
    <Layout>
      <SEO title="Tarifs kilométriques" />
      <w-screen mt-4="true" fluid="true" id="container">
        <div>
          <main id="main-content" role="main">
            <Breadcrumbs pageTitle={'Tarifs kilométriques'} homeLink={'/fr/'} />
            <div className="container mt-4">
              <Kilometrics />
            </div>
          </main>
        </div>
      </w-screen>
    </Layout>
  )
}

export default KilometricsPage;