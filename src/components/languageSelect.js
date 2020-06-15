import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const SelectLanguage = (props) => {

  const links = props.langs
  .filter(lang => !lang.selected)
  .map((lang, idx) => <Link to={lang.link} key={idx}>{lang.langKey}</Link>);

  return (
    <button type="button" className="btn btn-primary">{links}</button>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array
};

export default SelectLanguage;