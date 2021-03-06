import PropTypes from "prop-types"
import React from "react"
import Link from 'gatsby-link';
import SelectLanguage from './languageSelect';
import { useIntl } from 'react-intl';
import { graphql, useStaticQuery } from 'gatsby'

const Header = ({homeHeader}) => {
  const intl = useIntl();
  let locale = `${intl.locale}-ca`;
  let homeLink = `/${intl.locale}/`;

  const { allPrismicStandaloneestimatorHomepage } = useStaticQuery(graphql`
    {
      allPrismicStandaloneestimatorHomepage {
        nodes {
          data {
            header_goc_logo
            header_language_select
            header_skip_to_main
            title {
              text
            }
          }
          lang
        }
      }
    }
  `)

  let messages = allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;

  return (
    <header className="mb-5">
      <div className="container">
        <div className="row my-3 mx-2">
          <nav className="skiphold" id="header-skiplink">
            <a className="sr-only sr-only-focusable aurora-skip skiplink" aria-label="main skiplink" href="#main-content">{messages.header_skip_to_main}</a>
          </nav>
          {/* {homeLink === "/en/" &&
            <div className="align-self-center" property="publisher" typeof="GovernmentOrganization">
              <Image
                filename="sig-blk-en.svg"
                className="goc-logo"
                alt={messages.header_goc_logo}
              />
            </div>
          }
          {homeLink === "/fr/" &&
            <div className="align-self-center" property="publisher" typeof="GovernmentOrganization">
              <Image
                filename="sig-blk-fr.svg"
                className="goc-logo"
                alt={messages.header_goc_logo}
              />
            </div>
          } */}
          <section className='text-right align-self-center ml-auto'>
            <p className="sr-only sr-only-focusable aurora-skip">{messages.header_language_select}</p>
            <SelectLanguage />
          </section>
        </div>
      </div>
      <div className="py-4 bg-dark">
        <div className="container">
          <div className="row">
              <div className="col-sm-12">
                <Link to={homeLink}><h1 className="text-light">{messages.title.text}</h1></Link>
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