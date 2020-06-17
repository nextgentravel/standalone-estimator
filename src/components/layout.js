import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { StaticQuery, graphql } from "gatsby"
import { IntlProvider } from 'react-intl';
import 'intl';
import i18nMessages from '../data/messages';

const Layout = ({ children, location }) => {
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
        const url = window.location.pathname;
        const { langs, defaultLangKey } = data.site.siteMetadata.languages;
        const langKey = getCurrentLangKey(langs, defaultLangKey, url);
        const homeLink = `/${langKey}/`;
        const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))
        return (
          <IntlProvider
            locale={langKey}
            messages={i18nMessages[langKey]}
          >
            <div>
              <Header langs={langsMenu} />
              <div>
                {children}
              </div>
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
