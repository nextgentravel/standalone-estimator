import React from 'react'
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import 'intl';
import { Location } from "@reach/router"

const Layout = ({ children }) => {
  let showLanguageSelect;
  return (
    <div>
      <Location>
        {props => {
          const pathname = props.location.pathname;
          showLanguageSelect = pathname === '/404/' ? showLanguageSelect = false : showLanguageSelect = true;
          return (
            <Header showLanguageSelect={showLanguageSelect} homeHeader={pathname} />
          )
        }}
      </Location>
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
