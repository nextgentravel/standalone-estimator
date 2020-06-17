import React from "react"
import { Link } from "gatsby"

import { FormattedMessage } from 'react-intl';

const Footer = ({ siteTitle }) => (
    <footer className="footer">
    <div className="foot-container container">
      <ul>
        <li>
          <Link to="/"><FormattedMessage id="home" /></Link>
        </li>
        <li>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf9y3VY3ADLpQ4kQLGvOo4cIdEEi5Hs3en-0lWRc4wQeTRheg/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="suggestAnUpdate" />
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://github.com/nextgentravel/travel-guidebook-client">
            <small><FormattedMessage id="viewThisPageOnGithub" /></small>
          </a>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer
