// src/pages/preview.js

import * as React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic'

import { linkResolver } from '../config/linkresolver'

import { Layout } from '../components/layout'

const GenericTemplate = ({ isPreview, isLoading }) => {
  return (
    <Layout>
      <p>Loading</p>
    </Layout>
  )
}

export default withPreviewResolver(GenericTemplate, {
  repositoryName: process.env.GATSBY_PRISMIC_REPOSITORY_NAME,
  linkResolver,
})