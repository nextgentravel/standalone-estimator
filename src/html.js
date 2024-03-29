import React from "react"
import PropTypes from "prop-types"
import { withPrefix } from "gatsby"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
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