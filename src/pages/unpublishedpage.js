import * as React from 'react'

import PageTemplate from '../templates/page'
import TravelStep from '../components/travel-step'
import FaqQuestion from '../components/faq-question'

export const UnpublishedPage = (props) => {
  const previewData = window.__PRISMIC_PREVIEW_DATA__
  // => Perform any logic from previewData to determine the correct page or template component to use.

  let previewType = Object.keys(previewData)[0];

  switch (previewType) {
    case 'prismicTravelStep':
      return <div className="container"><TravelStep index={0} data={previewData[previewType].data} /></div>
      break;
      case 'prismicFaqQuestion':
        return <div className="container"><FaqQuestion index={0} data={previewData[previewType].data} /></div>
        break;
    default:
      return <div className="container"><p>Unknown Preview Type</p></div>
      break;
  }

  return <PageTemplate {...props} data={previewData} />
}

export default UnpublishedPage