import PropTypes from "prop-types"
import React from "react"
import SelectLanguage from './languageSelect';
import { FormattedMessage } from 'react-intl';

const Breadcrumbs = ({siteTitle, langs}) => (

<div className="container">
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb pl-0">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page"><FormattedMessage id="pageTitle" /></li>
        </ol>
    </nav>
</div>
)

export default Breadcrumbs