import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumbs from "../components/breadcrumb"

const Rates = () => (
  <Layout>
  <SEO title="Rates and Limits" />
  <w-screen mt-4="true" fluid="true" id="container">
    <div>
      <main id="main-content" role="main">
        <Breadcrumbs pageTitle={'Trouvez vos tarifs et limites'} homeLink={'/fr/'} />
        <div className="container mt-4">
          <p>Developing in English, for now.</p>
        </div>
      </main>
    </div>
  </w-screen>
</Layout>
)

export default Rates;
