import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';

const SelectLanguage = (props) => {

  const links = props.langs
    .filter(lang => !lang.selected)
    .map((lang, idx) => <Link to={lang.link} key={idx} className="language-link"><FormattedMessage id="otherLangName"/></Link>);

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