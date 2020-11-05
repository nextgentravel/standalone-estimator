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

  const pageTemplate = require.resolve(`./src/templates/travelSection.js`)

  // Create pages for each Page in Prismic using the selected template.
  pages.data.allPrismicTravelSection.nodes.forEach((node) => {
    const language = node.lang.substring(0, 2)
    if (!node.uid) return;
    createPage({
      path: `${language}/${node.uid}`,
      component: pageTemplate,
      context: {
        uid: node.uid,
      },
    })
  })
}

exports.createResolvers = ({ cache, createResolvers }) => {
  createResolvers({
    Query: {
      LunrIndex: {
        type: GraphQLJSONObject,
        resolve: (source, args, context, info) => {
          const blogNodes = context.nodeModel.getAllNodes({
            type: `MarkdownRemark`,
          })
          const type = info.schema.getType(`MarkdownRemark`)
          return createIndex(blogNodes, type, cache)
        },
      },
    },
  })
}

const createIndex = async (blogNodes, type, cache) => {
  const documents = []
  const store = {}
  for (const node of blogNodes) {
    const {slug} = node.fields
    const title = node.frontmatter.title
    const tags = node.frontmatter.tags
    const [html, excerpt] = await Promise.all([
      type.getFields().html.resolve(node),
      type.getFields().excerpt.resolve(node, { pruneLength: 40 }),
    ])

    function processTags(tags, title) {
      try {
          let key = Object.keys(tags)[0];
          let items = tags[key];
          return `${key}: ${items.join(', ')}`
      } catch (err) {
          console.log("No tags defined or error in tags for page", title)
          return ''
      }
    }

    let processedTags = processTags(tags, title)

    documents.push({
      slug: node.fields.slug,
      title: node.frontmatter.title,
      content: striptags(html),
      tags: processedTags,
    })
    store[slug] = {
      title,
      excerpt,
      content: striptags(html),
      tags: processedTags,
    }
  }
  const index = lunr(function() {
    this.metadataWhitelist = ['position']
    this.ref(`slug`)
    this.field(`title`)
    this.field(`tags`)
    this.field(`content`)
    for (const doc of documents) {
      this.add(doc)
    }
  })

  return { index: index.toJSON(), store }
}