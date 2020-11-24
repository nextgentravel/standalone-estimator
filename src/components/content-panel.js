import React from "react";
import {
    useIntl
} from 'react-intl';

import ContentPanelItem from './content-panel-item';

import {
    StaticQuery,
    graphql
} from 'gatsby';

const ContentPanel = () => {
    const intl = useIntl();
    let homeLink = `/${intl.locale}/`;
    return (
        <StaticQuery query = {
            graphql `
                query getTravelSections {
                    allPrismicTravelSection(filter: {
                        lang: {
                            eq: "en-ca"
                        }
                    }, sort: {
                        fields: data___order
                    }) {
                        edges {
                            node {
                                data {
                                    colour
                                    homepage_lead {
                                        html
                                    }
                                    title {
                                        html
                                        text
                                    }
                                    icon
                                    order
                                    chevron
                                    link
                                }
                                lang
                            }
                        }
                    }
                }
            `
        }
        render = {
            data => {
                return data.allPrismicTravelSection.edges.map(section => {
                    const data = section.node.data;
                    console.log('data: ', data);
                    return (
                        <ContentPanelItem
                            title={data.title.text}
                            lead={data.homepage_lead.html}
                            iconName={data.icon}
                            iconColour={data.colour}
                            linkTo={`${homeLink}${data.link}`}
                            chevron={data.chevron}
                        />
                    )
                })
            }
        }
        />
    )
}

export default ContentPanel