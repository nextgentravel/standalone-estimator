import React, { useState } from "react"
import PropTypes from "prop-types"
import { withPrefix } from "gatsby"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script src={withPrefix('/jquery/2.2.4/jquery.js')} type="text/javascript" />
        <script src={withPrefix('/boew-wet/wet4.0/wet-boew/js/wet-boew.min.js')} type="text/javascript" />
        <script src={withPrefix('/boew-wet/wet4.0/theme-wet-boew/js/theme.min.js')} type="text/javascript" />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
