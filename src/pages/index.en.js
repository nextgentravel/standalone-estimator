import React from "react"
import Layout from "../components/layout"
import { FaClipboardList } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { FaCalculator } from 'react-icons/fa';
import { FaMapMarker } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
  <w-screen mt-4="true" fluid="true" id="container">
    <div>
      <main style={{borderColor: 'red', borderWidth: 5}} id="main-content" role="main">
        <div className="container mt-4">
          <h3 className="text-center mb-4">Get Started</h3>
          <p className="text-center mb-5">Select the part of the journey you need support with or launch our travel assistant for a guided travel experience.</p>
          <div className="row mb-3 mt-3">
              <section className="col-sm-3 text-center mb-5">
                <div className="h-100 d-flex flex-column">
                  <div className="mt-2 mb-4" style={{
                      backgroundColor: '#E7A948',
                      paddingTop: 20,
                      borderRadius: 100,
                      width: 150,
                      height: 150,
                      margin: 'auto',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                  }}><FaClipboardList size="100" color="#fff" /></div>
                  <h4 className="mb-4">Plan</h4>
                  <p className="mb-4">Plan ahead and get ready for your business trip</p>
                  <div className="mt-auto w-100">
                    <Link to="/en/before" className="btn btn-outline-primary">Launch</Link>
                  </div>
                </div>
                <FaChevronRight
                  size="30"
                  style={{
                    position: 'absolute',
                    right: -15,
                    top: 65,
                    color: '#9E9E9E',
                  }}
                />
              </section>
              <section className="col-sm-3 text-center mb-5">
                <div className="h-100 d-flex flex-column">
                  <div className="mt-2 mb-4" style={{
                      backgroundColor: '#CC4859',
                      paddingTop: 20,
                      borderRadius: 100,
                      width: 150,
                      height: 150,
                      margin: 'auto',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                  }}><FaTicketAlt size="100" color="#fff" /></div>
                  <h4 className="mb-4">Book</h4>
                  <p className="mb-4">
                    Secure your tickets and make travel arrangements
                  </p>
                  <div className="mt-auto w-100">
                    <Link to="/en/booktravel" className="btn btn-outline-primary">Launch</Link>
                  </div>
                </div>
                <FaChevronRight
                  size="30"
                  style={{
                    position: 'absolute',
                    right: -15,
                    top: 65,
                    color: '#9E9E9E',
                  }}
                />
              </section>
              <section className="col-sm-3 text-center mb-5">
                <div className="h-100 d-flex flex-column">
                  <div className="mt-2 mb-4" style={{
                      backgroundColor: '#047789',
                      paddingTop: 20,
                      borderRadius: 100,
                      width: 150,
                      height: 150,
                      margin: 'auto',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                  }}><FaPlaneDeparture size="100" color="#fff" /></div>
                  <h4 className="mb-4">Travel</h4>
                  <p className="mb-4">
                    Everything you need when you're travelling
                  </p>
                  <div className="mt-auto w-100">
                    <Link to="/en/during" className="btn btn-outline-primary">Launch</Link>
                  </div>
                </div>
                <FaChevronRight
                  size="30"
                  style={{
                    position: 'absolute',
                    right: -15,
                    top: 65,
                    color: '#9E9E9E',
                  }}
                />
              </section>
              <section className="col-sm-3 text-center mb-5">
                <div className="h-100 d-flex flex-column">
                  <div className="mt-2 mb-4" style={{
                      backgroundColor: '#043B59',
                      paddingTop: 20,
                      borderRadius: 100,
                      width: 150,
                      height: 150,
                      margin: 'auto',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                  }}><FaFileInvoiceDollar size="100" color="#fff" /></div>
                  <h4 className="mb-4">Expense</h4>
                  <p className="mb-4">Filing trip expenses and get reimbursed</p>
                  <div className="mt-auto w-100">
                    <Link to="/en/after" className="btn btn-outline-primary">Launch</Link>
                  </div>
                </div>
              </section>
          </div>
        </div>
        <div style={{
          backgroundColor: '#F8F8F8',
        }}>
          <div className="container">
            <div className="d-flex justify-content-center">
              <div className="text-center m-5">
                <FaCalculator size="40" />
                <p className="mt-2">Trip Estimator</p>
              </div>
              <div className="text-center m-5">
                <FaMapMarker size="40" />
                <p className="mt-2">City Rates and Limits</p>
              </div>
              <div className="text-center m-5">
                <FaCar size="40" />
                <p className="mt-2">Kilometric Rates</p>
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
