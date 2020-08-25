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

import i18nMessages from './src/data/messages';
import { Location } from "@reach/router"

import languages from './src/data/languages'

export const wrapPageElement = ({ element }) => {

    return (
        <Location>
            {props => {
                const pathname = props.location.pathname;
                const { langs, defaultLangKey } = languages;
                const langKey = getCurrentLangKey(langs, defaultLangKey, pathname);
                return (
                    <IntlProvider locale={langKey} messages={i18nMessages[langKey]}>
                        {element}
                    </IntlProvider>
                )
            }}
        </Location>
    )
}