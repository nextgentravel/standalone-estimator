import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"
import Link from 'gatsby-link';
import SelectLanguage from './languageSelect';
import { FormattedMessage, useIntl } from 'react-intl';
import SearchForm from "../components/search-form"

const Header = ({siteTitle, langs, showLanguageSelect, homeLink}) => {
  const intl = useIntl();
  return (
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
        <div className="row mt-2">
          <nav>
            <a className="sr-only sr-only-focusable aurora-skip skiplink" href="#main-content"><FormattedMessage id="skipToMain" /></a>
          </nav>
          <section className='col-sm-4 col-md-12 text-right mb-2'>
            {showLanguageSelect &&
              <>
                <h2 className="sr-only sr-only-focusable aurora-skip"><FormattedMessage id="languageSelection" /></h2>
                <SelectLanguage langs={langs} />
              </>
            }
          </section>
          <div className="col-sm-5 pt-1 pb-4" property="publisher" typeof="GovernmentOrganization">
            <Link to={homeLink}>
                <Image
                  filename="sig-blk-en.svg"
                  alt={ intl.formatMessage({ id: 'governmentOfCanada' })}
                  className="gc-logo"
                />
            </Link>
          </div>
          <section className='col-sm-5 ml-auto'>
            <SearchForm />
          </section>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
