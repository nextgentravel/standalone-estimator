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
          }
        }
      }
    `
  )

  const metaTitle = lang === 'en-ca' ? site.siteMetadata.titleEnglish : site.siteMetadata.titleFrench;

  const metaDescription = description || lang === 'en-ca' ? site.siteMetadata.descriptionEnglish : site.siteMetadata.descriptionFrench
  
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${metaTitle}`}
      meta={[
        {
          name: `title`,
          content: title,
        },
        {
          name: `creator`,
          content: site.siteMetadata.creator,
        },
        {
          name: `dcterms.issued`,
          content: '2021-11-01',
          title: 'W3CDTF'
        },
        {
          name: `dcterms.modified`,
          content: '2021-11-01',
          content: "",
        },
        {
          name: `dcterms.subject`,
          title: `gccore`,
          content: lang === 'en-ca' ? site.siteMetadata.subjectEnglish : site.siteMetadata.subjectFrench,
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
          content: lang === 'en-ca' ? site.siteMetadata.authorEnglish : site.siteMetadata.authorFrench,
        },
        {
          property: `og:title`,
          content: `${title} | ${metaTitle}`,
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
          content: lang === 'en-ca' ? site.siteMetadata.authorEnglish : site.siteMetadata.authorFrench,
        },
        {
          name: `twitter:title`,
          content: `${title} | ${metaTitle}`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `dcterms.language`,
          content: lang === 'en-ca' ? 'eng' : 'fra',
          title: 'ISO639-2'
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
