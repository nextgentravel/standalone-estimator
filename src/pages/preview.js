// src/pages/preview.js

import * as React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic'
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
    console.log('doc.type', doc.type);
    if (doc.type === "travel_step") {
      console.log('doc.data.belongs_to.uid', doc.data.belongs_to.uid)
      return `/en/${doc.data.belongs_to.uid}`
    }
    if (doc.type === "travel_section") {
      return `/en/${doc.uid}`
    }  
    return `/en/${doc.uid}`
  },
})