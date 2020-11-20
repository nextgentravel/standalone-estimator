const languages = require('./src/data/languages');

module.exports = {
  siteMetadata: {
    title: `Travel Guide`,
    description: `A guide for travel in the Canadian public service.`,
    author: `NextGen Travel Team`,
    siteUrl: `https://travel-guidebook.herokuapp.com/`,
    languages
  },
  plugins: [{
      resolve: 'gatsby-source-prismic',
      options: {
        // The name of your prismic.io repository. This is required.
        // Example: 'gatsby-source-prismic-test-site' if your prismic.io address
        // is 'gatsby-source-prismic-test-site.prismic.io'.
        repositoryName: 'gctravelapp',

        // An API access token to your prismic.io repository. This is optional.
        // You can generate an access token in the "API & Security" section of
        // your repository settings. Setting a "Callback URL" is not necessary.
        // The token will be listed under "Permanent access tokens".
        // accessToken: 'example-wou7evoh0eexuf6chooz2jai2qui9pae4tieph1sei4deiboj',

        // If you provide a release ID, the plugin will fetch data from Prismic
        // for a specific release. A Prismic release is a way to gather a
        // collection of changes for a future version of your website. Note that
        // if you add changes to a release, you'll need to rebuild your website
        // to see them.
        // See: https://user-guides.prismic.io/en/collections/22653-releases-scheduling#the-basics-of-a-release
        // releaseID: 'example-eiyaingiefahyi7z',

        // Set a link resolver function used to process links in your content.
        // Fields with rich text formatting or links to internal content use this
        // function to generate the correct link URL.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different link resolver logic for each field if necessary.
        // See: https://prismic.io/docs/javascript/query-the-api/link-resolving
        linkResolver: ({
          node,
          key,
          value
        }) => (doc) => {
          // Pretty URLs for known types
          if (doc.type === 'blog') return "/post/" + doc.uid;
          if (doc.type === 'page') return "/" + doc.uid;
          // Fallback for other types, in case new custom types get created
          return "/doc/" + doc.id;
        },

        // Set a list of links to fetch and be made available in your link
        // resolver function.
        // See: https://prismic.io/docs/javascript/query-the-api/fetch-linked-document-fields
        // fetchLinks: [
        // Your list of links
        // ],

        // Set an HTML serializer function used to process formatted content.
        // Fields with rich text formatting use this function to generate the
        // correct HTML.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different HTML serializer logic for each field if necessary.
        // See: https://prismic.io/docs/nodejs/beyond-the-api/html-serializer
        htmlSerializer: ({
          node,
          key,
          value
        }) => (
          type,
          element,
          content,
          children,
        ) => {},

        // Provide an object of Prismic custom type JSON schemas to load into
        // Gatsby. This is required.
        schemas: {
          travel_step: require('./src/schemas/travel_step.json'),
          travel_section: require('./src/schemas/travel_section.json'),
          faq_question: require('./src/schemas/faq_question.json'),
          homepage: require('./src/schemas/homepage.json'),
          doormat: require('./src/schemas/doormat.json'),
          generic_content_page: require('./src/schemas/generic_content_page.json')
        },

        // Set a default language when fetching documents. The default value is
        // '*' which will fetch all languages.
        // See: https://prismic.io/docs/javascript/query-the-api/query-by-language
        lang: '*',

        // Add the Prismic Toolbar script to the site. Defaults to false.
        // Set to "legacy" if your repository requires the older toolbar script.
        // See: https://prismic.io/docs/rest-api/beyond-the-api/the-preview-feature
        prismicToolbar: false,

        // Set a function to determine if images are downloaded locally and made
        // available for gatsby-transformer-sharp for use with gatsby-image.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different logic for each field if necessary.
        // This defaults to always return false.
        shouldDownloadImage: ({
          node,
          key,
          value
        }) => {
          return true;
        },

        // Provide a default set of Imgix image transformations applied to
        // Imgix-backed gatsby-image fields. These options will override the
        // defaults set by Prismic.
        // See: https://docs.imgix.com/apis/url
        imageImgixParams: {
          auto: 'compress,format',
          fit: 'max',
          q: 50,
        },

        // Provide a default set of Imgix image transformations applied to
        // the placeholder images of Imgix-backed gatsby-image fields. These
        // parameters will be applied over those provided in the above
        // `imageImgixParams` option.
        // See: https://docs.imgix.com/apis/url
        imagePlaceholderImgixParams: {
          w: 100,
          blur: 15,
          q: 50,
        },
      },
    },
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
        plugins: [{
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
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Nunito Sans\:300,400,600,700`,
          `Rubik\:300,400,600,700`,
        ],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en',
        langKeyForNull: 'any',
        useLangKeyLayout: false,
        prefixDefault: true,
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
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
          `/search/*`,
          `/en/rates/*`,
          `/fr/rates/*`,
          `/en/kilometrics/*`,
          `/fr/kilometrics/*`,
          `/en/plan/*`,
          `/fr/plan/*`,
          `/en/book/*`,
          `/fr/book/*`,
          `/en/travel/*`,
          `/fr/travel/*`,
          `/en/expense/*`,
          `/fr/expense/*`,
          `/en/*`,
          `/fr/*`,
        ],
      },
      runtimeCaching: [{
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
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: process.env.HOTJAR_ID,
        sv: process.env.HOTJAR_SNIPPET_VERSION
      },
    },
    `gatsby-plugin-use-query-params`,
    "gatsby-plugin-use-query-params",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GA_TRACKING_ID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },2
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`luxon`]
      }
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [{
            name: 'en',
            filterNodes: node => {
              if (!node.lang) return;
              return node.lang === 'en-ca'
            },
            customEntries: [],
          },
          {
            name: 'fr',
            filterNodes: node => {
              if (!node.lang) return;
              return node.lang === 'fr-ca'
            },
          },
        ],
        fields: [{
            name: 'title',
            store: true,
            attributes: {
              boost: 20
            }
          },
          {
            name: 'content',
            store: true
          },
          {
            name: 'url',
            store: true
          },
          {
            name: 'parent_page',
            store: true
          },
        ],
        resolvers: {
          PrismicTravelStep: {
            title: node => node.data.title.text,
            content: node => node.data.content.text,
            url: node => node.url,
            parent_page: node => node.data.belongs_to.uid,
          },
        },
        filename: 'search_index.json',
        fetchOptions: {
          credentials: 'same-origin'
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  proxy: [{
    prefix: "/api",
    url: "http://localhost:7071",
  }, ],
}