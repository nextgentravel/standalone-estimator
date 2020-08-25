/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require("react")
var reactIntl = require("react-intl");

exports.wrapPageElement = ({ element }) => {
  return <reactIntl.IntlProvider locale="en">{element}</reactIntl.IntlProvider>
}
