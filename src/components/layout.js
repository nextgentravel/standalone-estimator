import React from 'react'
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { StaticQuery, graphql } from "gatsby"
import { IntlProvider } from 'react-intl';
import 'intl';
import i18nMessages from '../data/messages';
import { globalHistory } from "@reach/router"

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              languages {
                defaultLangKey
                langs
              }      
            }
          }
        }
      `}
      render={data => {
        const url = globalHistory.location.pathname;
        const { langs, defaultLangKey } = data.site.siteMetadata.languages;
        const langKey = getCurrentLangKey(langs, defaultLangKey, url);
        const homeLink = `/${langKey}/`;
        const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))
        let showLanguageSelect = true;
        showLanguageSelect = url === '/404/' ? showLanguageSelect = false : showLanguageSelect = true;
        return (
          <IntlProvider
            locale={langKey}
            messages={i18nMessages[langKey]}
          >
            <div>
              <Header langs={langsMenu} homeLink={homeLink} showLanguageSelect={showLanguageSelect} />
              <div>
                {children}
              </div>
              {showLanguageSelect && <Footer langs={langsMenu} homeLink={homeLink}/>}
            </div>
          </IntlProvider>
        )
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
