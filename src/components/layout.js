import React from 'react'
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import 'intl';



const Layout = ({ children }) => {
  return (
    <div>
      <Header />
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
