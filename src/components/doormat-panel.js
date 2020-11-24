import React from "react";
import DoormatPanelItem from './doormat-panel-item';

import {
    StaticQuery,
    graphql
  } from 'gatsby';

export default () => {
    return (
      <StaticQuery query = {
        graphql `
            query doormats {
                allPrismicDoormat(sort: {fields: data___order}, filter: {lang: {eq: "en-ca"}}) {
                    nodes {
                    data {
                        image {
                        localFile {
                            publicURL
                        }
                        }
                        lead {
                            text
                        }
                        link
                        link_new_window
                        title {
                            text
                        }
                    }
                    lang
                    }
                }
            }
        `
      }
      render = {
        data => {
          const doormats = data.allPrismicDoormat.nodes;
          console.log(doormats)
          return (
            <React.Fragment>
                <div className="row mb-5">
                    {doormats.map((item, index) => {
                        return (
                            <DoormatPanelItem
                                image={item.data.image.localFile.publicURL}
                                alt=""
                                linkTo={item.data.link}
                                linkNewWindow={item.data.link_new_window}
                                title={item.data.title.text}
                                content={item.data.lead.text}
                            />
                        )
                    })}
                </div>

            </React.Fragment>
          )
        }
      }
    />
  )
}
