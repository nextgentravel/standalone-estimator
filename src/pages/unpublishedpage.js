import * as React from 'react'

import PageTemplate from '../templates/page'
import TravelStep from '../components/travel-step'
import FaqQuestion from '../components/faq-question'

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
      break;
    case 'prismicFaqQuestion':
        return <div className="container"><FaqQuestion index={0} data={previewData[previewType].data} /></div>
        break;
    case 'prismicTravelSection':
      return (
        <div className="container">
          <h2>{previewData[previewType].data.title.text}</h2>
          <div className="lead" dangerouslySetInnerHTML={{ __html: previewData[previewType].data.lead.html }} />
        </div>
      )
      break;
    default:
      return <div className="container"><p>Unknown Preview Type</p></div>
      break;
  }

  return <PageTemplate {...props} data={previewData} />
}

export default UnpublishedPage