/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { GraphQLJSONObject } = require(`graphql-type-json`)
const striptags = require(`striptags`)
const lunr = require(`lunr`)
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query all Pages with their IDs and template data.
  const pages = await graphql(`
    {
      allPrismicGenericContentPage {
        nodes {
          id
          uid
          lang
          data {
            content {
              html
            }
            title {
              text
            }
          }
        }
      }
      allPrismicTravelSection {
        nodes {
          id
          uid
          lang
          data {
            title {
              text
            }
            lead {
              html
            }
          }
        }
      }
    }  
  `)

  const travelSectionTemplate = require.resolve(`./src/templates/travelSection.js`)

  const genericPageTemplate = require.resolve(`./src/templates/genericPageTemplate.js`)

  // Create pages for each Page in Prismic using the selected template.
  pages.data.allPrismicTravelSection.nodes.forEach((node) => {
    console.log(JSON.stringify(node, null, 2));
    const language = node.lang.substring(0, 2)
    if (!node.uid) return;
    createPage({
      path: `${language}/${node.uid}`,
      component: travelSectionTemplate,
      context: {
        uid: node.uid,
        lang: node.lang,
      },
    })
  })


  pages.data.allPrismicGenericContentPage.nodes.forEach((node) => {
    const language = node.lang.substring(0, 2)
    if (!node.uid) return;
    createPage({
      path: `${language}/${node.uid}`,
      component: genericPageTemplate,
      context: {
        uid: node.uid,
        lang: node.lang,
      },
    })
  })


}


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