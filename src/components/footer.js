import React from "react"
import Image from "../components/image"
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="bg-dark py-5 footer-deco">
        <div className="container">
          <div className="row ml-1">
                <div className="col-sm-8">
                  <p className="footer-text text-white">GC Travel Guide is an experimental product brought to you by Next Generation Travel at Public Services and Procurement Canada (PSPC) in partnership with Shared Travel Services (STS). If you have questions or feedback about this product, please email us at:</p>
                  <p className="footer-text text-white">email.link@tba</p>
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
