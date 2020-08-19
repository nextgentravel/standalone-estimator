import React from 'react'
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import 'intl';
import { globalHistory } from "@reach/router"

const Layout = ({ children }) => {
  const url = globalHistory.location.pathname;
  let showLanguageSelect;
  let onHomePage;
  showLanguageSelect = url === '/404/' ? showLanguageSelect = false : showLanguageSelect = true;
  onHomePage = url === '/en/' || url === '/fr/' ? onHomePage = true : onHomePage = false;
  return (
    <div>
      <Header showLanguageSelect={showLanguageSelect} homeHeader={onHomePage} />
      <div>
        {children}
      </div>
      <Footer/>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
