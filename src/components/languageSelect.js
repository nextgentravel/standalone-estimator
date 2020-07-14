import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';

const SelectLanguage = (props) => {

  const links = props.langs
    .filter(lang => !lang.selected)
    .map((lang, idx) => {
      console.log('lang: ', lang)
      return (
      <>
        <Link to={lang.link} key={idx} className="language-link d-none d-sm-block"><FormattedMessage id="otherLangName"/></Link>
        <abbr key={idx} title="Français" class="d-sm-none h3 language-link mrgn-tp-sm mrgn-bttm-0 text-uppercase"><Link to={lang.link}>{lang.langKey}</Link></abbr>
      </>
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