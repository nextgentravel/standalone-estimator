import React from "react"
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby"

const Breadcrumbs = ({ pageTitle, homeLink }) => (

<div className="container">
    <nav aria-label="breadcrumb">
        <p className="sr-only sr-only-focusable aurora-skip"><FormattedMessage id="breadCrumbAria" /></p>
        <ol className="breadcrumb pl-0">
            <li className="breadcrumb-item"><Link to={homeLink} className="text-dark"><FormattedMessage id="siteTitle" /></Link></li>
            <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
        </ol>
    </nav>
</div>
)

export default Breadcrumbs