import React from "react"
import { useIntl } from 'react-intl';
import SelectLanguage from '../components/languageSelect';

let scriptHtml = ``
const headerHtml = ``

export default function Layout({ children }) {
    const intl = useIntl()
    const langKey = intl.locale;
    return <div className="app-wrapper">
      <div id="bootstrap-4">
        {children}
      </div>
    </div>
}