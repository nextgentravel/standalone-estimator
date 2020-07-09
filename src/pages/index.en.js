import React from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Link } from "gatsby"
import SearchForm from "../components/search-form"


const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
  <w-screen mt-4="true" fluid="true" id="container">
    <div>
      <main id="main-content" role="main">
        <div className="container mt-4">
          <h1>GC Travel Guide</h1>
          <SearchForm />
          <div className="card-deck mb-3 mt-3">
              <div className="card mb-2">
                <div className="card-img-top">
                  <Image
                    filename="002D42-1.png"
                    alt="Card image cap"
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5">Before Your Travel</h2>
                  <p className="card-text">Get ready for your business travel.</p>
                  <div className="mt-auto w-100">
                    <Link to="/en/before" className="btn btn-primary">Pretravel</Link>
                  </div>
                </div>
              </div>

              <div className="card mb-2">
                <Image
                  filename="137991-1.png"
                  alt="Card image cap"
                />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5">Booking Your Travel</h2>
                  <p className="card-text">
                  Making the arrangements needed for your travel.
                  </p>
                  <div className="mt-auto w-100">
                    <Link to="/en/booktravel" className="btn btn-primary">Booking</Link>
                  </div>
                </div>
              </div>
              <div className="card mb-2">
                <Image
                  filename="15A3A6-1.png"
                  alt="Card image cap"
                />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5">During Your Travel</h2>
                  <p className="card-text">
                    Useful information during a trip.
                  </p>
                  <div className="mt-auto w-100">
                    <Link to="/en/during" className="btn btn-primary">While Travelling</Link>
                  </div>
                </div>
              </div>
              <div className="card mb-2">
                <Image
                  filename="6DD2DA-1.png"
                  alt="Card image cap"
                />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5">After You Return</h2>
                  <p className="card-text">Arranging reimbursement.</p>
                  <div className="mt-auto w-100">
                    <Link to="/en/after" className="btn btn-primary">Return</Link>
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
