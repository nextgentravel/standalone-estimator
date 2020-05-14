import React from "react"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <div>
      <SEO title="Language Select" />
      <Link to="/en">English</Link>
      <Link to="/fr">François</Link>
  </div>
)

export default IndexPage
