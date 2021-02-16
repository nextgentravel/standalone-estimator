import React from "react"
import Image from "../components/image"
import { FormattedMessage, useIntl } from 'react-intl';

const Footer = () => {
  const intl = useIntl();
  let homeLink = `/${intl.locale}/`;
  return (
    <footer className="footer">
      <div className="bg-dark py-5 footer-deco">
        <div className="container">
          <p class="text-white">Insert Text From Prismic Here</p>
        </div>
      </div>

      <div className="bg-light py-3">
        <div className="container">
          <div className="row h-100">
            <div className="col-sm-6">
            </div>
            <div className="col-sm-6 canada-logo text-right my-auto">
              <FormattedMessage id="footer-alt">
                {(msg) => {
                  return (
                    <Image
                      className=""
                      filename="footer-tag.svg"
                      alt={msg}
                    />
                  )
                }}
              </FormattedMessage>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
