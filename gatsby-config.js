const languages = require('./src/data/languages');

var buildDate = new Date().toISOString().split('T')[0]

module.exports = {
  siteMetadata: {
    title: `GC Travel Calculator / Calculateur de voyage du GC`,
    titleEnglish: `Government of Canada travel calculator`,
    titleFrench: `Calculateur de voyage du gouvernement du Canada`,
    description: `Use this tool to create Government of Canada (GC) travel estimates / Utilisez cet outil pour créer des estimations des voyages du gouvernement du Canada (GC)`,
    descriptionEnglish: `Use this tool to create Government of Canada (GC) travel estimates`,
    descriptionFrench: `Utilisez cet outil pour créer des estimations des voyages du gouvernement du Canada (GC)`,
    authorEnglish: `Government of Canada, Public Services and Procurement Canada, Digital Services Branch, Next Generation Travel Program, Shared Travel Services`,
    authorFrench: `Gouvernement du Canada, Services publics et Approvisionnement Canada, Direction générale des services numériques, Programme de voyage de prochaine génération, Services de voyage partagés`,
    siteUrl: `https://travel-guidebook.herokuapp.com/`,
    languages,
    dateIssued: "2021-11-01",
    dateModified: buildDate,
    subjectEnglish: "Travel; Travel Documents; Transborder data flow; Border crossing; Tourism; International travel; Airplanes; Rail transport; Transport;  Housing; Hospitality industry; Business plans; Financial management",
    subjectFrench: "Voyage;  tourisme; voyage international;  transport ferroviaire; transport;  logement; industrie hôtelière;  gestion financière",
    keywordsEnglish: "Shared Travel Services, STS, AmexGBT, Travel, Accommodation, Transportation, Voyage, Planner, About, HRG",
    keywordsFrench: "Services de voyage partagés, SVP, AmexGBT, voyage, hébergement, transport, planificateur, À propos, HRG",
  },
  plugins: [
    `gatsby-plugin-layout`,
    {
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
        linkResolver: ({ node, key, value }) => (doc) => {
          // Pretty URLs for known types
          let lang = node.lang === 'en-ca' ? 'en' : 'fr';
          if (doc.type === 'generic_content_page') return "/" + lang + "/" + doc.uid;
          if (doc.type === 'tool') return "/" + lang + "/" + doc.uid;
          // Fallback for other types, in case new custom types get created
          return lang + "/doc/" + doc.id;
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
          "standaloneestimator-homepage": require('./src/schemas/standaloneestimator-homepage.json'),
          "standaloneestimator-copy": require('./src/schemas/standaloneestimator-copy.json'),
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
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false,
        mergeScriptHashes: true,
        mergeStyleHashes: true,
        mergeDefaultDirectives: true,
        directives: {
          "style-src": "'self' 'unsafe-hashes' 'sha256-o4LYhp5wtluJ8/NWUV2vi+r5AxmP8X2zEvYHCpji+kI=' 'sha256-MzJlpM03503nzXvQHm3lmf3EypF9jHu+regG7halQmI=' 'sha256-MtxTLcyxVEJFNLEIqbVTaqR4WWr0+lYSZ78AzGmNsuA=' 'sha256-aqNNdDLnnrDOnTNdkJpYlAxKVJtLt9CtFLklmInuUAE=' fonts.googleapis.com",
          "font-src": "'self' fonts.gstatic.com",
          "script-src": "'self' static.hotjar.com",
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
        name: "GC Travel Estimator",
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
      resolve: `gatsby-plugin-remove-serviceworker`
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
      },
    },
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`luxon`]
      }
    },
  ],
  proxy: [{
    prefix: "/api",
    url: "http://localhost:7071",
  }, ],
}