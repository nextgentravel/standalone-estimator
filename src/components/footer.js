import React from "react"
import { Link } from "gatsby"
import Image from "../components/image"
import { FormattedMessage } from 'react-intl';

const Footer = ({ siteTitle, homeLink }) => (
  <footer className="footer">
    <div className="bg-dark py-5 footer-deco">
      <div class="container">
        <ul className="list-unstyled colcount-sm-2 colcount-md-3">
          <li>
            <a href="" className="text-light">
              <FormattedMessage id="knowledge" />
            </a>
          </li>
          <li>
            <a href="" className="text-light">
              <FormattedMessage id="training" />
            </a>
          </li>
          <li>
            <a href="" className="text-light">
              <FormattedMessage id="submitquestion" />
            </a>
          </li>
          <li>
            <a href="" className="text-light">
            <FormattedMessage id="contact" />
            </a>
          </li>
          <li>
            <a href="" className="text-light">
              <FormattedMessage id="nextgen" />
            </a>
          </li>
          <li>
            <a href="" className="text-light">
              <FormattedMessage id="travelcard" />
            </a>
          </li>
          <li>
            <a href="" className="text-light">
              <FormattedMessage id="travelcontacts" />
            </a>
          </li>
          <li>
            <a href="" className="text-light">
              <FormattedMessage id="advisories" />
            </a>
          </li>
          <li>
            <a href="" className="text-light">
              <FormattedMessage id="estimator" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <ul className="col-9">
          <nav className="col-md-10 ftr-urlt-lnk">

          </nav>
          <li>
            <a href="">
              <FormattedMessage id="socialmedia" />
            </a>
          </li>
          <li>
            <a href="">
              <FormattedMessage id="mobileapp" />
            </a>
          </li>
          <li>
            <a href="">
              <FormattedMessage id="terms" />
            </a>
          </li>
          <li>
            <a href="">
              <FormattedMessage id="privacy" />
            </a>
          </li>
        </ul>
      </div>
      <div className="col-2 float-right">
        <Image
          filename="footer-tag.svg"
        />
      </div>
    </div>
  </footer>
)

export default Footer
