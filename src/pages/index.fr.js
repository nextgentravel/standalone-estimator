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
          <h2>Les voyages d'affaires ne devraient pas ressembler à du travail</h2>
          <p className="lead">Nous sommes là pour vous aider à mieux voyager</p>
          <div className="row mb-4">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card d-inline-block w-100 h-100">
                <div className="card-img-top">
                  <Image
                    filename="002D42-1.png"
                    alt="Card image cap"
                  />
                </div>

                <div className="card-body">
                  <h3 className="card-title h5">Avant votre voyage</h3>
                  <p className="card-text">Préparez-vous pour votre voyage d'affaires.</p>
                  <Link to="/fr/before" className="btn button-blue-darker">Pretravel</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="card mb-2 d-inline-block w-100 h-100">
                <Image
                  filename="137991-1.png"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3 className="card-title h5">Réservation de votre voyage</h3>
                  <p className="card-text">
                  Prendre les dispositions nécessaires à votre voyage.
                  </p>
                  <Link to="/fr/booktravel" className="btn button-blue-dark">Réservations</Link>
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
                  <h3 className="card-title h5">Pendant votre voyage</h3>
                  <p className="card-text">
                    Informations utiles lors d'un voyage.
                  </p>
                  <Link to="/fr/during" className="btn button-blue-medium">En voyage</Link>
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
                  <h3 className="card-title h5">Après votre retour</h3>
                  <p className="card-text">Organiser le remboursement.</p>
                  <Link to="/fr/after" className="btn button-blue-light">Revenir</Link>
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
