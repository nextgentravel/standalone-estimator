import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// Note: You can change "images" to whatever you'd like.

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: {extension: {regex: "/jpeg|jpg|png|gif/"}}) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 600) {
                  aspectRatio
                }
              }
              extension
              publicURL
            }
          }
        }
        svgs: allFile(filter: {extension: {regex: "/svg/"}}) {
          edges {
            node {
              relativePath
              name
              extension
              publicURL
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename);
      });

      const svg = data.svgs.edges.find(n => {
        return n.node.relativePath.includes(props.filename);
      });

      if (!image && !svg) {
        return null;
      }

      if (svg && svg.node.extension === 'svg') {
        return <img alt={props.alt} className={props.className} src={svg.node.publicURL} />
      }

      return <Img alt={props.alt} className={props.className} fluid={image.node.childImageSharp.fluid} />;
    }}
  />
);

export default Image;