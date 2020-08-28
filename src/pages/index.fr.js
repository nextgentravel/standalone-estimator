import React from "react"
import Layout from "../components/layout"
// import { FaCalculator } from 'react-icons/fa';
import SEO from "../components/seo";
import { Link } from "gatsby";
import ContentPanel from "../components/content-panel";
import ToolPanel from "../components/tool-panel";
import { FormattedMessage } from "react-intl";
import { FaClipboardList } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FaMapMarker } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';

const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
  <w-screen mt-4="true" fluid="true" id="container">
    <div>
      <main id="main-content" role="main">
        <div className="container mt-4">
          <h2 className="text-center mb-4 font-weight-bold"><FormattedMessage id="indextitle" /></h2>
          <p className="text-center mb-5"><FormattedMessage id="indexlead"/></p>
          <div className="row mb-3 mt-3">
              <ContentPanel title="plan" icon={<FaClipboardList size="100" color="#fff" alt="" />} linkto="/fr/plan" />
              <ContentPanel title="book" icon={<FaTicketAlt size="100" color="#fff" alt="" />} linkto="/fr/book" />
              <ContentPanel title="travel" icon={<FaPlaneDeparture size="100" color="#fff" alt="" />} linkto="/fr/travel" />
              <ContentPanel title="expense" icon={<FaFileInvoiceDollar size="100" color="#fff" alt="" />} linkto="/fr/expense" />
          </div>
        </div>
        <div className="bg-light">
          <div className="container">
            <div className="d-flex justify-content-center">
              <ToolPanel title="rates" icon={<FaMapMarker size="40" />} linkto="/fr/rates" />
              <ToolPanel title="kilometrics" icon={<FaCar size="40" />} linkto="/fr/kilometrics" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </w-screen>
</Layout>
)

export default IndexPage

