import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// Note: You can change "images" to whatever you'd like.

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|svg|gif/"}}) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
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
      if (!image) {
        return null;
      }

      if (!image.node.childImageSharp && image.node.extension === 'svg') {
        return <img alt={props.alt} className={props.className} src={image.node.publicURL} />
      }

      //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
      return <Img alt={props.alt} className={props.className} fluid={image.node.childImageSharp.fluid} />;
    }}
  />
);

export default Image;