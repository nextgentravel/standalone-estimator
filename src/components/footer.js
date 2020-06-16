import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Footer = ({ siteTitle }) => (
    <footer className="footer">
    <div className="foot-container container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf9y3VY3ADLpQ4kQLGvOo4cIdEEi5Hs3en-0lWRc4wQeTRheg/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Suggest an Update
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://github.com/nextgentravel/travel-guidebook">
            <small>View this page on Github</small>
          </a>
        </li>
      </ul>
    </div>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
