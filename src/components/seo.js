/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            titleEnglish
            titleFrench
            descriptionEnglish
            descriptionFrench
            authorEnglish
            authorFrench
            dateIssued
            dateModified
            subjectEnglish
            subjectFrench
            keywordsEnglish
            keywordsFrench
            dateModified
          }
        }
      }
    `
  )

  const metaTitle = lang === 'en' ? `${site.siteMetadata.titleEnglish} - GCintranet - PSPC` : `${site.siteMetadata.titleFrench} - GCintranet - SPAC`;

  const metaDescription = description || lang === 'en' ? site.siteMetadata.descriptionEnglish : site.siteMetadata.descriptionFrench
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s`}
      meta={[
        {
          name: `title`,
          content: metaTitle,
        },
        {
          name: `dcterms.issued`,
          content: '2021-11-01',
          title: 'W3CDTF'
        },
        {
          name: `dcterms.modified`,
          content: site.siteMetadata.dateModified,
          title: 'W3CDTF'
        },
        {
          name: `dcterms.subject`,
          title: `gccore`,
          content: lang === 'en' ? site.siteMetadata.subjectEnglish : site.siteMetadata.subjectFrench,
        },
        {
          name: `dcterms.title`,
          content: title,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `dcterms.description`,
          content: metaDescription,
        },
        {
          name: `dcterms.creator`,
          content: lang === 'en' ? site.siteMetadata.authorEnglish : site.siteMetadata.authorFrench,
        },
        {
          name: `dcterms.keywords`,
          content: lang === 'en' ? site.siteMetadata.keywordsEnglish : site.siteMetadata.keywordsFrench,
        },
        {
          name: `dcterms.language`,
          content: lang === 'en' ? 'eng' : 'fra',
          title: 'ISO639-2'
        },
        {
          property: `og:title`,
          content: `${title}`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: lang === 'en' ? site.siteMetadata.authorEnglish : site.siteMetadata.authorFrench,
        },
        {
          name: `twitter:title`,
          content: `${title}`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },

      ].concat(meta)}
    >
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
