import React from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
  <SEO title="Home" />
  <w-screen mt-4="true" fluid="true" id="container">
    <div>
      <main id="main-content" role="main">
        <div className="container mt-4">
          <h2>Business travel shouldn’t feel like work</h2>
          <h5 className="mb-4">We're here to help you travel better</h5>
          <div className="row mb-4">
            <div className="col-sm-3 mb-3">
              <div className="card d-inline-block w-100 h-100">
                <div className="card-img-top">
                  <Image
                    filename="137991-1.png"
                    alt="Card image cap"
                  />
                </div>

                <div className="card-body">
                  <h3 className="card-title h5">Before Your Travel</h3>
                  <p className="card-text">Get ready for your business travel.</p>
                  <a
                    href="/fr/before"
                    role="button"
                    className="btn button-blue-dark"
                  >
                    More Information
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <div className="card mb-2 d-inline-block w-100 h-100">
                <Image
                  filename="15A3A6-1.png"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3 className="card-title h5">Booking your Travel</h3>
                  <p className="card-text">
                  Making the arrangements needed for your travel.
                  </p>
                  <a
                    href="/fr/booktravel"
                    role="button"
                    className="btn button-blue-medium"
                  >
                    More Information
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <div className="card mb-2 d-inline-block w-100 h-100">
                <Image
                  filename="15A3A6-1.png"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3 className="card-title h5">During Your Travel</h3>
                  <p className="card-text">
                    Useful information during a trip.
                  </p>
                  <a
                    href="/fr/during"
                    role="button"
                    className="btn button-blue-medium"
                  >
                    More Information
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <div className="card mb-2 d-inline-block w-100 h-100">
                <Image
                  filename="6DD2DA-1.png"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3 className="card-title h5">After You Return</h3>
                  <p className="card-text">Arranging reimbursement.</p>
                  <a
                    href="/fr/after"
                    role="button"
                    className="btn button-blue-light"
                  >
                    More Information
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="foot-container container">
          <ul>
            <li>
              <a href="/fr">Home</a>
            </li>
            {/* <li><a href="#">About</a></li>
                        <li><a href="#">Tips</a></li> */}
            <li>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf9y3VY3ADLpQ4kQLGvOo4cIdEEi5Hs3en-0lWRc4wQeTRheg/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Suggest an Update
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="https://github.com/nextgentravel/travel-guidebook">
                <small>View this page on Github</small>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </w-screen>
</Layout>
)

export default IndexPage
