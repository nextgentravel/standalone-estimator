import PropTypes from "prop-types"
import React from "react"
import SelectLanguage from './languageSelect';
import { FormattedMessage } from 'react-intl';

const Header = ({siteTitle, langs, showLanguageSelect}) => (
<header className="shadow-sm">
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
  <div
    style={{ backgroundColor: "#137991", borderBottom: "10px solid #002D42" }}
  >
    <div className="container py-2 h-100" style={{ color: "#fff" }}>
      <div className="row">
        <div className="col-8">
          <h1 className="mb-3 mt-3 h4"><FormattedMessage id="pageTitle" /></h1>
        </div>
        <div className="col-4 align-self-center">
          <span className="float-right d-none d-md-block">
            {showLanguageSelect && <SelectLanguage langs={langs} />}
          </span>
        </div>
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
