import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import { useIntl } from 'react-intl';

import languages from '../data/languages'
import { globalHistory } from "@reach/router"
import { getLangs, getUrlForLang } from 'ptz-i18n';

import { graphql, useStaticQuery } from 'gatsby'

const SelectLanguage = (props) => {
  const intl = useIntl()
  const url = globalHistory.location.pathname;
  const langKey = intl.locale;
  const { langs } = languages
  const homeLink = `/${langKey}/`
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))

  const { prismicStandaloneestimatorHomepage } = useStaticQuery(graphql`
    {
      prismicStandaloneestimatorHomepage(lang: {eq: "en-ca"}) {
        data {
          site_other_language_name
        }
      }
    }
  `)

  let messages = prismicStandaloneestimatorHomepage.data

  const links = langsMenu
    .filter(lang => !lang.selected)
    .map((lang, idx) => {
      return (
      <React.Fragment key={idx}>
        <Link to={lang.link} className="language-link d-none d-sm-block">{messages.site_other_language_name}</Link>
        <abbr title={messages.site_other_language_name} className="d-sm-none language-link mrgn-tp-sm mrgn-bttm-0 text-uppercase"><Link to={lang.link}>{lang.langKey}</Link></abbr>
      </React.Fragment>
    )});
  

  return (
    <div>
      {links}
    </div>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array
};

export default SelectLanguage;