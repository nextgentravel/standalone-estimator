import React from "react"
import { Link } from "gatsby"
import Image from "../components/image"
import { FormattedMessage } from 'react-intl';

const Footer = ({ siteTitle, homeLink }) => (
  <footer className="footer">
    <div className="container bg-dark col-12 footer-deco py-5">
      <ul className="pl-0">
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
    <div className="container col-12">
      <ul className="col-9">
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
      <div className="col-2 float-right">
        <Image
          filename="footer-tag.svg"
        />
      </div>
    </div>
  </footer>
)

export default Footer
