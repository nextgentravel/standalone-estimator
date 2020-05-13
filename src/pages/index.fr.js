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
            <h2>FRENCH: Business travel shouldn’t feel like work</h2>
            <h5 className="mb-4">We're here to help you travel better</h5>
            <div className="row mb-4">
              <div className="col-sm-4 mb-4">
                <div className="card d-inline-block w-100 h-100">
                  <div className="card-img-top">
                    <Image
                      filename="137991-1.png"
                      alt="Card image cap"
                    />
                  </div>

                  <div className="card-body">
                    <h3 className="card-title h5">Before You Go</h3>
                    <p className="card-text">Get ready for your business travel.</p>
                    <a
                      href="travel-request.html"
                      role="button"
                      className="btn button-blue-dark"
                    >
                      Create a Travel Request
                    </a>
                    <a
                      href="booktravel"
                      role="button"
                      className="btn button-blue-dark"
                    >
                      Book Travel
                    </a>
                    <a
                      href="double-check.html"
                      role="button"
                      className="btn button-blue-dark"
                    >
                      Double Check
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 mb-4">
                <div className="card mb-2 d-inline-block w-100 h-100">
                  <Image
                    filename="15A3A6-1.png"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h3 className="card-title h5">On Your Way</h3>
                    <p className="card-text">
                      Unplanned expenses or emergencies? We’ve got your back.
                    </p>
                    <a
                      href="get-assistance.html"
                      role="button"
                      className="btn button-blue-medium"
                    >
                      Get Assistance
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 mb-4">
                <div className="card mb-2 d-inline-block w-100 h-100">
                  <Image
                    filename="6DD2DA-1.png"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h3 className="card-title h5">Welcome Back!</h3>
                    <p className="card-text">Let’s get you reimbursed!</p>
                    <a
                      href="create-expense-report.html"
                      role="button"
                      className="btn button-blue-light"
                    >
                      Create Expense Report
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
                <a href="index.html">Home</a>
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
