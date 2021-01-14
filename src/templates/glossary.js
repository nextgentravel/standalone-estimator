import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Breadcrumbs from "../components/breadcrumb"
import SEO from "../components/seo"
import { FormattedMessage } from 'react-intl';
import { getCurrentLangKey } from 'ptz-i18n';
import 'intl';
import { globalHistory } from "@reach/router"

import { makeSafeForCSS } from '../utils/makeSafeForCSS';


const GlossaryTemplate = ({ data }) => {
  const url = globalHistory.location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  const pageData = data.prismicGlossary.data;
  const glossaryItems = pageData.glossary_items;
  let alphabetList = pageData.glossary_items.map((item => {
      return item.glossary_item_title.text.charAt(0);
  }))

  alphabetList = [...new Set(alphabetList)].sort()
  
  let display = {}

  alphabetList.forEach(char => {
    display[char] = []
    glossaryItems.forEach(item => {
        if (item.glossary_item_title.text.charAt(0) === char) {
            display[char].push({ 
              title: item.glossary_item_title.text,
              content: item.glossary_item_content.html,
              anchorId: makeSafeForCSS(item.glossary_item_title.text),
            })
        }
    })
  })

  return (
    <Layout>
      <main id="main-content">
        <Breadcrumbs pageTitle={pageData.title.text} homeLink={homeLink} />
        <SEO title={pageData.title.text} />
        <div className="hero-holder">
          <div className="container">
            <nav className="skiphold" aria-label="sidebar skiplink"><a className="sr-only sr-only-focusable aurora-skip skiplink" id="sidebar-skiplink" href="#sidebar" aria-label="skip to side" ><FormattedMessage id="skipToSide"/></a></nav>
            <div className="row mb-4">
              <div className="col-sm-8"><h2 className="display-5">{pageData.title.text}</h2></div>
            </div>
            <div className="lead mb-5" dangerouslySetInnerHTML={{ __html: pageData.lead.html }}>
            </div>
          </div>
        </div>
        <div className="container p-0">
          <article className="content-left col-xs-12 col-sm-12 col-md-12">
            {Object.keys(display).map(function(key, index) {
                return (
                    <div class="mb-5">
                        <h3>{key}</h3>
                        <hr class="mt-0" />
                        {display[key].map(item => {
                            return (
                                <section id={item.anchorId}>
                                    <h4 class="display-6">{item.title}</h4>
                                    <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                </section>
                            )
                        })}
                    </div>
                );
            })}
          </article>
        </div>
      </main>
    </Layout>
  );
};

export default GlossaryTemplate

export const query = graphql`
  query Glossary($lang: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    prismicGlossary(lang: {eq: $lang}) {
        data {
            glossary_items {
                glossary_item_content {
                    html
                }
                glossary_item_title {
                    text
                }
            }
            lead {
                html
            }
            title {
                text
            }
        }
    }
  }
`;