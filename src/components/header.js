import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"
import Link from 'gatsby-link';
import SelectLanguage from './languageSelect';
import { FormattedMessage, useIntl } from 'react-intl';

const Header = ({homeHeader}) => {
  const intl = useIntl();
  let homeLink = `/${intl.locale}/`;
  return (
    <header className="mb-5">
      <div className="container">
        <div className="row my-4 mx-2">
          <nav className="skiphold" id="header-skiplink">
            <a className="sr-only sr-only-focusable aurora-skip skiplink" aria-label="main skiplink" href="#main-content"><FormattedMessage id="skipToMain" /></a>
          </nav>
          {homeLink === "/en/" &&
            <div className="align-self-center" property="publisher" typeof="GovernmentOrganization">
              <FormattedMessage id="governmentOfCanada">
                {(msg) => {
                  return (
                    <Image
                      filename="sig-blk-en.svg"
                      className="goc-logo"
                      alt={msg}
                    />
                  )
                }}
              </FormattedMessage>
            </div>
          }
          {homeLink === "/fr/" &&
            <div className="align-self-center" property="publisher" typeof="GovernmentOrganization">
              <FormattedMessage id="governmentOfCanada">
                {(msg) => {
                  return (
                    <Image
                      filename="sig-blk-fr.svg"
                      className="goc-logo"
                      alt={msg}
                    />
                  )
                }}
              </FormattedMessage>
            </div>
          }
          <section className='text-right align-self-center ml-auto'>
            <p className="sr-only sr-only-focusable aurora-skip"><FormattedMessage id="languageSelection" /></p>
            <SelectLanguage />
          </section>
        </div>
      </div>
      <div className="py-4 bg-dark">
        <div className="container">
          <div className="row">
              <div className="col-sm-12">
                  <Link to={homeLink}><h1 className="text-light"><FormattedMessage id="siteTitle" /></h1></Link>
              </div>
          </div>
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