const languages = require('./src/data/languages');

module.exports = {
  siteMetadata: {
    title: `Travel Guide`,
    description: `A guide for travel in the Canadian public service.`,
    author: `NextGen Travel Team`,
    siteUrl: `https://travel-guidebook.herokuapp.com/`,
    languages
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/tg-favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                card: {
                  classes: "card mb-3",
                },
                'card-body': {
                  classes: "card-body",
                },
                'info-card': {
                  classes: "card info-card",
                },
                info: {
                  classes: "info",
                  title: "optional",
                },
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Nunito Sans`,
            variants: ['300', '400', '600', '700']
          },
          {
            family: `Rubik`,
            variants: ['300', '400', '600', '700']
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en',
        langKeyForNull: 'any',
        useLangKeyLayout: false,
        prefixDefault: true,
        markdownRemark: {
          postPage: 'src/templates/infoPage.js',
          query: `
          {
              allMarkdownRemark {
                  edges {
                  node {
                      fields {
                      slug,
                      langKey
                      }
                  }
                  }
              }
          }
          `
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "GC Travel Guide",
        short_name: "GCTravelGuide",
        start_url: "/",
        background_color: "#fafafa",
        theme_color: "#212529",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/tg-favicon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
        scope: "/",
        display: "fullscreen",
      },
    },
    {
      resolve:`gatsby-plugin-offline`,
      options: {
        precachePages: [
          `/search/*`,
          `/en/rates/*`,
          `/fr/rates/*`,
          `/en/kilometrics/*`,
          `/fr/kilometrics/*`,
          `/en/before/*`,
          `/fr/before/*`,
          `/en/booktravel/*`,
          `/fr/booktravel/*`,
          `/en/during/*`,
          `/fr/during/*`,
          `/en/after/*`,
          `/fr/after/*`,
          `/en/*`,
          `/fr/*`,
        ],
      },
      runtimeCaching: [
        {
          // Use cacheFirst since these don't need to be revalidated (same RegExp
          // and same reason as above)
          urlPattern: /(\.js$|\.css$|static\/)/,
          handler: `CacheFirst`,
        },
        {
          // page-data.json files are not content hashed
          urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
          handler: `NetworkFirst`,
        },
        {
          // Add runtime caching of various other page resources
          urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
          handler: `StaleWhileRevalidate`,
        },
        {
          // Google Fonts CSS (doesn't end in .css so we need to specify it)
          urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
          handler: `StaleWhileRevalidate`,
        },
      ],
    },
    `gatsby-plugin-use-query-params`,
  ],
}
