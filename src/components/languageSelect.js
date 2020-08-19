import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';

import { useIntl } from 'react-intl';

import languages from '../data/languages'
import { globalHistory } from "@reach/router"
import { getLangs, getUrlForLang } from 'ptz-i18n';

const SelectLanguage = (props) => {
  const intl = useIntl()
  const url = globalHistory.location.pathname;
  const [langKey, setLangKey] = useState(intl.locale);
  const { langs } = languages
  const homeLink = `/${langKey}/`
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))
  console.log('current langKey: ', langKey)
  const links = langsMenu
    .filter(lang => !lang.selected)
    .map((lang, idx) => {
      return (
      <React.Fragment key={idx}>
        <Link to={lang.link} className="language-link d-none d-sm-block"><FormattedMessage id="otherLangName"/></Link>
        <abbr title="Français" className="d-sm-none language-link mrgn-tp-sm mrgn-bttm-0 text-uppercase"><Link to={lang.link}>{lang.langKey}</Link></abbr>
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