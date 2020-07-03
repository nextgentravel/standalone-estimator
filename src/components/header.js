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

	<div class="container">
		<div class="row mt-4">
      <div class="brand col-xs-9 col-sm-5 col-md-4" property="publisher" typeof="GovernmentOrganization">
        <Link to={homeLink}>
            <Image
              filename="sig-blk-en.svg"
              alt="Government of Canada"
            />
        </Link>
      </div>
      <div className='ml-auto mr-3'>
        {showLanguageSelect && <SelectLanguage langs={langs} />}
      </div>
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
