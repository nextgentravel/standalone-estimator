import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"
import Link from 'gatsby-link';
import SelectLanguage from './languageSelect';
import { FormattedMessage, useIntl } from 'react-intl';
import SearchForm from "../components/search-form"

const Header = ({homeHeader, langs, showLanguageSelect, homeLink}) => {
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
        <div className="row my-4">
          <nav className="skiphold" id="header-skiplink">
            <a className="sr-only sr-only-focusable aurora-skip skiplink" aria-label="main skiplink" href="#main-content"><FormattedMessage id="skipToMain" /></a>
          </nav>
          <div className="col-6 col-sm-6 goc-logo" property="publisher" typeof="GovernmentOrganization">
            <Link to={homeLink}>
                <Image
                  filename="sig-blk-en.svg"
                  alt={ intl.formatMessage({ id: 'governmentOfCanada' })}
                />
            </Link>
          </div>
          <section className='float-right col-sm-6 col-md-6 text-right'>
            {showLanguageSelect &&
              <>
                <h2 className="sr-only sr-only-focusable aurora-skip"><FormattedMessage id="languageSelection" /></h2>
                <SelectLanguage langs={langs} />
              </>
            }
          </section>


        </div>
      </div>
      <div className="py-4 bg-dark">
        <div className="container">
            {!homeHeader &&
              <div className="row">
                  <div className="col-sm-6">
                      <h1 className="text-light"><FormattedMessage id="siteTitle" /></h1>
                  </div>
                  <div className="col-sm-6">
                      <SearchForm placement="header" />
                  </div>
              </div>
            }
            {homeHeader &&
              <div className="row">
                  <div className="col-sm-12">
                      <h1 className="text-light text-center"><FormattedMessage id="siteTitle" /></h1>
                  </div>
              </div>
            }
        </div>
      </div>
      {homeHeader &&
        <div className="bg-light col-12">
          <section className='col-12 col-md-6 mx-auto py-4'>
            <SearchForm placement="home" />
          </section>
        </div>

      }

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
