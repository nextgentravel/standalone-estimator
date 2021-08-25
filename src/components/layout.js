import React from 'react'
import PropTypes from "prop-types"
import 'intl';
import { Location } from "@reach/router"

const Layout = ({ children }) => {
  let showLanguageSelect;
  let onHomePage;
  return (
    <div>
        {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
