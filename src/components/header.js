import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"
import Link from 'gatsby-link';
import SelectLanguage from './languageSelect';
import { FormattedMessage } from 'react-intl';

const Header = ({siteTitle, langs, showLanguageSelect, homeLink}) => (

<header className="mb-4">
  <div
    style={{
      backgroundColor: "#FAF2CC",
      textAlign: "left",
      verticalAlign: "middle"
    }}
  >
    <div className="container py-3">
      <button
        style={{
          background: "#FEC04F",
          border: "1px solid #000000",
          borderRadius: 20,
          marginRight: 10
        }}
      >
        <strong><FormattedMessage id="alpha" /></strong>
      </button>
      <span><FormattedMessage id="underDevelopment" /></span>
    </div>
  </div>

	<div className="container">
		<div className="row mt-4">
      <div className="brand col-xs-9 col-sm-5 col-md-4" property="publisher" typeof="GovernmentOrganization">
        <Link to={homeLink}>
            <Image
              filename="sig-blk-en.svg"
              alt="Government of Canada"
            />
        </Link>
      </div>
      <nav>
        <a className="sr-only sr-only-focusable aurora-skip skiplink" href="#main-content"><FormattedMessage id="mainSkip" /></a>
      </nav>
      <section className='col-xs-3 ml-auto mr-3'>
        {showLanguageSelect &&
          <>
            <span className="d-none sr-only sr-only-focusable aurora-skip"><FormattedMessage  id="languageSelect" /></span>
            <SelectLanguage langs={langs} />
          </>
        }
      </section>
		</div>
	</div>
</header>


)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
