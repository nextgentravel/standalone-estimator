/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "./src/styles/style.scss"
import React from 'react'
import { getCurrentLangKey } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import 'intl';
import i18nMessages from './src/data/messages';
import { globalHistory } from "@reach/router"

import languages from './src/data/languages'

export const wrapPageElement = ({ element }) => {
    const url = globalHistory.location.pathname;
    const { langs, defaultLangKey } = languages;
    const langKey = getCurrentLangKey(langs, defaultLangKey, url);
    return (
        <IntlProvider locale={langKey} messages={i18nMessages[langKey]}>
            {element}
        </IntlProvider>
    )
}