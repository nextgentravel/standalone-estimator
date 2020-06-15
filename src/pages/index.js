import React from "react"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <main id="main-content" role="main">
    <div id="bg"></div>
      <SEO title="Language Select" />
      <div className="card lang">
        <div className="card-body">
          <image></image>
          <Link to="/fr" className="langlink btn btn-primary">Français</Link>
          <Link to="/en" className="langlink btn btn-primary">English</Link>
        </div>
        <div className="card-body splash">
          <div className="col-6">
            <p><a href="https://www.canada.ca/fr/transparence/avis.html">Avis</a>
            <span id="divider">●</span>
            <a href="https://www.canada.ca/en/transparency/terms.html">Terms and conditions</a></p> 
          </div>
          <div className="col-6">
            <image></image>
          </div>
        </div>
      </div>
  </main>
)
export default IndexPage
