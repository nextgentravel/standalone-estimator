/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { GraphQLJSONObject } = require(`graphql-type-json`)
const striptags = require(`striptags`)
const lunr = require(`lunr`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: require.resolve(`./src/templates/infoPage.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
};

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