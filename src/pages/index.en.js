import React from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
  <w-screen mt-4="true" fluid="true" id="container">
    <div>
      <main id="main-content" role="main">
        <div className="container mt-4">
          <h2>Business travel shouldn’t feel like work</h2>
          <p className="lead">We're here to help you travel better</p>
          <div className="row mb-4">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card d-inline-block w-100 h-100">
                <div className="card-img-top">
                  <Image
                    filename="137991-1.png"
                    alt="Card image cap"
                  />
                </div>

                <div className="card-body">
                  <h4 className="card-title h5">Before Your Travel</h4>
                  <p className="card-text">Get ready for your business travel.</p>
                  <Link to="/en/before" className="btn button-blue-dark">Pretravel Information</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card mb-2 d-inline-block w-100 h-100">
                <Image
                  filename="15A3A6-1.png"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h4 className="card-title h5">Booking your Travel</h4>
                  <p className="card-text">
                  Making the arrangements needed for your travel.
                  </p>
                  <Link to="/en/booktravel" className="btn button-blue-medium">Booking Information</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card mb-2 d-inline-block w-100 h-100">
                <Image
                  filename="15A3A6-1.png"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h4 className="card-title h5">During Your Travel</h4>
                  <p className="card-text">
                    Useful information during a trip.
                  </p>
                  <Link to="/en/during" className="btn button-blue-medium">While Travelling Information</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card mb-2 d-inline-block w-100 h-100">
                <Image
                  filename="6DD2DA-1.png"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h4 className="card-title h5">After You Return</h4>
                  <p className="card-text">Arranging reimbursement.</p>
                  <Link to="/en/after" className="btn button-blue-light">Return Information</Link>
                </div>
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
