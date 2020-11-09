import * as React from 'react'

import PageTemplate from '../templates/page'

export const UnpublishedPage = (props) => {
  const previewData = window.__PRISMIC_PREVIEW_DATA__
  // => Perform any logic from previewData to determine the correct page or template component to use.
  console.log('previewData: ', previewData);
  console.log('props: ', props);

  return <PageTemplate {...props} data={previewData} />
}

export default UnpublishedPage