// src/pages/preview.js

import * as React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic'
import { linkResolver } from '../config/linkresolver'
import Layout from '../components/layout'

const PreviewPage = ({ isPreview, isLoading }) => {
  if (isPreview === false) return (<p>Not a preview!</p>)

  return (
    <Layout>
      <p>Loading</p>
    </Layout>
  )
}


export default withPreviewResolver(PreviewPage, {
  repositoryName: "gctravelapp",
  linkResolver: ({ node, key, link }) => doc => {
    if (doc.type === "home") return `/`
    return `/${doc.uid}`
  },
})