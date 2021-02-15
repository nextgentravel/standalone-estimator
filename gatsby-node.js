/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { GraphQLJSONObject } = require(`graphql-type-json`)
const striptags = require(`striptags`)
const lunr = require(`lunr`)
const path = require('path')

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  actions: { replaceWebpackConfig }
}) => {
  switch (stage) {
    case 'build-javascript':
      // We want to include the babel polyfills before any application code,
      // so we're inserting it as an additional entry point.  Gatsby does not allow
      // this in "setWebpackConfig", so we have to use "replaceWebpackConfig"
      const config = getConfig();
      const app =
        typeof config.entry.app === 'string'
          ? [config.entry.app]
          : config.entry.app;
      config.entry.app = ['@babel/polyfill', ...app];
      replaceWebpackConfig(config);
  }
};