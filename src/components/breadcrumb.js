import React from "react"
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby"

const Breadcrumbs = ({ pageTitle, homeLink }) => (

<div className="container">
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb pl-0">
            <li className="breadcrumb-item"><Link to={homeLink}><FormattedMessage id="home" /></Link></li>
            <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
        </ol>
    </nav>
</div>
)

export default Breadcrumbs