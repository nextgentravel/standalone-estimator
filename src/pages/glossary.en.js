import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumbs from "../components/breadcrumb"
import GlossaryItems from "../components/glossary"

const Glossary = () => {
  return (
    <Layout>
      <SEO title="Glossary" />
      <w-screen mt-4="true" fluid="true" id="container">
        <div>
          <main id="main-content" role="main">
            <Breadcrumbs pageTitle={'Glossary'} homeLink={'/en/'} />
            <div className="container mt-4">
              <GlossaryItems />
            </div>
          </main>
        </div>
      </w-screen>
    </Layout>
  )
}

export default Glossary;