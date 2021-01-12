import React from "react";

import {
    StaticQuery,
    graphql
  } from 'gatsby';

export default () => {
    return (
      <StaticQuery query = {
        graphql `
            query glossaryItems {
                prismicGlossary {
                    data {
                        glossary_items {
                            glossary_item_content {
                                text
                            }
                            glossary_item_title {
                                text
                            }
                        }
                        lead {
                            text
                        }
                        title {
                            text
                        }
                    }
                }
            }
        `
      }
      render = {
        data => {
          const glossaryItems = data.prismicGlossary.data.glossary_items;
          const lead = data.prismicGlossary.data.lead[0].text
          let alphabetList = data.prismicGlossary.data.glossary_items.map((item => {
              return item.glossary_item_title[0].text.charAt(0);
          }))

          alphabetList = [...new Set(alphabetList)].sort()
          
          let display = {}

          alphabetList.forEach(char => {
            display[char] = []
            glossaryItems.forEach(item => {
                if (item.glossary_item_title[0].text.charAt(0) === char) {
                    display[char].push({ title: item.glossary_item_title[0].text, content: item.glossary_item_content[0].text })
                }
            })
          })

          return (
            <React.Fragment>
                <div>
                    <h2 class="display-5">Glossary</h2>
                    <div class="lead"><p>{lead}</p></div>
                    {Object.keys(display).map(function(key, index) {
                        return (
                            <div class="mb-5">
                                <h3>{key}</h3>
                                <hr class="mt-0" />
                                {display[key].map(item => {
                                    return (
                                        <div>
                                            <h4 class="display-6">{item.title}</h4>
                                            <p>{item.content}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        );
                    })}
                </div>

            </React.Fragment>
          )
        }
      }
    />
  )
}
