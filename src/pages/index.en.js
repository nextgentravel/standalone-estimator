import React from "react"
import Layout from "../components/layout"
import { FaClipboardList } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
// import { FaCalculator } from 'react-icons/fa';
import { FaMapMarker } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
  <w-screen mt-4="true" fluid="true" id="container">
    <div>
      <main id="main-content" role="main">
        <div className="container mt-4">
          <h3 className="text-center mb-4">Get Started</h3>
          <p className="text-center mb-5">Select the part of the journey you need support with or launch our travel assistant for a guided travel experience.  You can use this guide offline, even when you are not connected to the internet.</p>
          <div className="row mb-3 mt-3">
              <section className="col-sm-3 text-center mb-5">
                <div className="h-100 d-flex flex-column">
                  <div className="icon-background icon-background-plan mt-2 mb-4">
                    <FaClipboardList size="100" color="#fff" />
                  </div>
                  <h4 className="mb-4">Plan</h4>
                  <p className="mb-4">Plan ahead and get ready for your business trip</p>
                  <div className="mt-auto w-100">
                    <Link to="/en/before" className="btn btn-outline-primary">Launch</Link>
                  </div>
                </div>
                <FaChevronRight
                  className="home-chevron d-none d-sm-block"
                  size="30"
                />
              </section>
              <section className="col-sm-3 text-center mb-5">
                <div className="h-100 d-flex flex-column">
                  <div className="icon-background icon-background-book mt-2 mb-4"><FaTicketAlt size="100" color="#fff" /></div>
                  <h4 className="mb-4">Book</h4>
                  <p className="mb-4">
                    Secure your tickets and make travel arrangements
                  </p>
                  <div className="mt-auto w-100">
                    <Link to="/en/booktravel" className="btn btn-outline-primary">Launch</Link>
                  </div>
                </div>
                <FaChevronRight
                  className="home-chevron d-none d-sm-block"
                  size="30"
                />
              </section>
              <section className="col-sm-3 text-center mb-5">
                <div className="h-100 d-flex flex-column">
                  <div className="icon-background icon-background-travel mt-2 mb-4">
                    <FaPlaneDeparture size="100" color="#fff" />
                  </div>
                  <h4 className="mb-4">Travel</h4>
                  <p className="mb-4">
                    Everything you need when you're travelling
                  </p>
                  <div className="mt-auto w-100">
                    <Link to="/en/during" className="btn btn-outline-primary">Launch</Link>
                  </div>
                </div>
                <FaChevronRight
                  className="home-chevron d-none d-sm-block"
                  size="30"
                />
              </section>
              <section className="col-sm-3 text-center mb-5">
                <div className="h-100 d-flex flex-column">
                  <div className="icon-background icon-background-expense mt-2 mb-4">
                    <FaFileInvoiceDollar size="100" color="#fff" />
                  </div>
                  <h4 className="mb-4">Expense</h4>
                  <p className="mb-4">Filing trip expenses and get reimbursed</p>
                  <div className="mt-auto w-100">
                    <Link to="/en/after" className="btn btn-outline-primary">Launch</Link>
                  </div>
                </div>
              </section>
          </div>
        </div>
        <div class="bg-light">
          <div className="container">
            <div className="d-flex justify-content-center">
              {/* <div className="text-center m-5">
                <Link to="/en/after">
                  <FaCalculator size="40" />
                  <p className="mt-2">Trip Estimator</p>
                </Link>
              </div> */}
              <div className="tool-link-item text-center m-5">
                <Link to="/en/rates">
                  <FaMapMarker size="40" />
                  <p className="mt-2">City Rates and Limits</p>
                </Link>
              </div>
              <div className="tool-link-item text-center m-5">
                <Link to="/en/kilometrics">
                  <FaCar size="40" />
                  <p className="mt-2">Kilometric Rates</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </w-screen>
</Layout>
)

export default IndexPage
