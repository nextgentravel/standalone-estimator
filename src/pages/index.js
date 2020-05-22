import React from "react"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <main id="main-content" role="main">
      <SEO title="Language Select" />
      <h1>Choose Language</h1>
      <Link to="/en">English</Link>
      <Link to="/fr">François</Link>
  </main>
)

export default IndexPage
