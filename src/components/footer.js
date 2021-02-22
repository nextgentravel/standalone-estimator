import React from "react"
import Image from "../components/image"
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl';

const Footer = (props) => {
  const intl = useIntl()
  let locale = `${intl.locale}-ca`;

  const { allPrismicStandaloneestimatorHomepage } = useStaticQuery(graphql`
    {
      allPrismicStandaloneestimatorHomepage {
        nodes {
          data {
            footer_text {
              html
            }
            footer_logo_alt
          }
          lang
        }
      }
    }
  `)

  let messages = allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;

  return (
    <footer className="footer">
      <div className="bg-dark py-5 footer-deco">
        <div className="container">
          <div className="row ml-1">
                <div className="col-sm-8">
                  <span className="footer-text text-white" dangerouslySetInnerHTML={{ __html: messages.footer_text.html }}></span>
                </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-3">
        <div className="container">
          <div className="row h-100">
            <div className="col-sm-6">
            </div>
            <div className="col-sm-6 canada-logo text-right my-auto">
              <Image
                className=""
                filename="footer-tag.svg"
                alt={messages.footer_logo_alt}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
