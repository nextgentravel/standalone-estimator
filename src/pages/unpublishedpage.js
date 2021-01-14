import * as React from 'react'

import TravelStep from '../components/travel-step'
import FaqQuestion from '../components/faq-question'
import DoormatPanelItem from '../components/doormat-panel-item'
import Breadcrumbs from "../components/breadcrumb"
import SEO from "../components/seo"

export const UnpublishedPage = (props) => {
  let previewData = {}
  if (typeof window !== `undefined`) {
    previewData = window.__PRISMIC_PREVIEW_DATA__
  }
  // => Perform any logic from previewData to determine the correct page or template component to use.

  if (!previewData || Object.keys(previewData) < 1) {
    return (
      <div className="container"><p>No Preview Data</p></div>
    )
  }

  let previewType = Object.keys(previewData)[0];

  switch (previewType) {
    case 'prismicTravelStep':
      return <div className="container"><TravelStep index={0} data={previewData[previewType].data} /></div>
    case 'prismicFaqQuestion':
      return <div className="container"><FaqQuestion index={0} data={previewData[previewType].data} /></div>

    case 'prismicTravelSection':
      return (
        <div className="container">
          <h2>{previewData[previewType].data.title.text}</h2>
          <div className="lead" dangerouslySetInnerHTML={{ __html: previewData[previewType].data.lead.html }} />
        </div>
      )
    case 'prismicDoormat':
      return (
        <div className="container mt-5">
          <DoormatPanelItem
            image={previewData[previewType].data.image.url}
            alt=""
            linkTo={previewData[previewType].data.link}
            linkNewWindow={previewData[previewType].data.link_new_window}
            title={previewData[previewType].data.title.text}
            content={previewData[previewType].data.lead.text}
          />
        </div>
      )
    case 'prismicGenericContentPage':
      return (
        <main id="main-content">
          <Breadcrumbs pageTitle={previewData[previewType].data.title.text} homeLink={''} />
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

      case 'prismicHomepage':
        return (
          <div id="container">
            <div className="container mt-4">
              <h2 className="mb-4 font-weight-bold">{previewData[previewType].data.title.text}</h2>
              <div dangerouslySetInnerHTML={{__html: previewData[previewType].data.lead.html}}></div>
            </div>
          </div>
        )

    default:
      return <div className="container"><p>Unknown Preview Type</p></div>
  }
}

export default UnpublishedPage