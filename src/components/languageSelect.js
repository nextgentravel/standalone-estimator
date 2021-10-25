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

  let locale = `${intl.locale}-ca`;
  const { allPrismicStandaloneestimatorHomepage } = useStaticQuery(graphql`
    {
      allPrismicStandaloneestimatorHomepage {
        nodes {
          data {
            site_other_language_name
          }
          lang
        }
      }
    }
  `)

  let messages = allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;

  const links = langsMenu
    .filter(lang => !lang.selected)
    .map((lang, idx) => {
      return (
        <React.Fragment key={idx}>
          <Link to={lang.link} className="language-link" lang={lang.langKey}>
            <span className="d-none d-sm-block">{messages.site_other_language_name}{' '}</span>
            <abbr title={messages.site_other_language_name} className="d-sm-none language-link mrgn-tp-sm mrgn-bttm-0 text-uppercase">{lang.langKey}</abbr>
          </Link>
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