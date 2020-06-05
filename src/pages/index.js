import React from "react"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <main id="main-content" role="main">
    <div id="bg"></div>
      <SEO title="Language Select" />
      <div className="card lang">
        <div className="card-body">
          <h1 className="card-title">Choose Language</h1>
          <Link to="/en" className="langlink btn btn-primary">English</Link>
          <Link to="/fr" className="langlink btn btn-primary">Français</Link>
        </div>
      </div>
  </main>
)
export default IndexPage
