import * as React from 'react'
import SEO from "../components/seo"

export const UnpublishedPage = (props) => {
  let previewData = {}
  if (typeof window !== `undefined`) {
    previewData = window.__PRISMIC_PREVIEW_DATA__
  }
  // => Perform any logic from previewData to determine the correct page or template component to use.

  if (!previewData || Object.keys(previewData) < 1) {
    return (
      <main id="main-content"><div className="container"><h1>No Preview Data</h1></div></main>
    )
  }

  let previewType = Object.keys(previewData)[0];

  switch (previewType) {
    case 'prismicGenericContentPage':
      return (
        <main id="main-content">
          <SEO title={previewData[previewType].data.title.text} />
          <div className="hero-holder">
            <div className="container">
              <nav className="skiphold" aria-label="sidebar skiplink"><a className="sr-only sr-only-focusable aurora-skip skiplink" id="sidebar-skiplink" href="#sidebar" aria-label="skip to content">skip to content</a></nav>
              <div className="row mb-4">
                <div className="col-sm-8"><h2>{previewData[previewType].data.title.text}</h2></div>
              </div>
              <div className="lead" dangerouslySetInnerHTML={{ __html: previewData[previewType].data.lead.html }}>
              </div>
            </div>
          </div>
          <div className="container p-0">
            <article className="content-left col-xs-12 col-sm-12 col-md-12" dangerouslySetInnerHTML={{ __html: previewData[previewType].data.content.html }}>
            </article>
          </div>
        </main>
      )
    default:
      return <main id="main-content"><div className="container"><p>Unknown Preview Type</p></div></main>
  }
}

export default UnpublishedPage