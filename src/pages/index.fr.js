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

          <div className="card-deck mb-3 mt-3">
              <section className="card mb-2">
                <div className="card-img-top">
                  <Image
                    filename="002D42-1.png"
                    alt=""
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5">Avant votre voyage</h2>
                  <p className="card-text">Préparez-vous pour votre voyage d'affaires.</p>
                  <div className="mt-auto w-100">
                    <Link to="/fr/before" className="btn btn-primary">Pretravel</Link>
                  </div>
                </div>
              </section>

              <section className="card mb-2">
                <Image
                  filename="137991-1.png"
                  alt=""
                />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5">Réservation de votre voyage</h2>
                  <p className="card-text">
                    Prendre les dispositions nécessaires à votre voyage.
                  </p>
                  <div className="mt-auto w-100">
                    <Link to="/fr/booktravel" className="btn btn-primary">Réservations</Link>
                  </div>
                </div>
              </section>
              <section className="card mb-2">
                <Image
                  filename="15A3A6-1.png"
                  alt=""
                />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5">Pendant votre voyage</h2>
                  <p className="card-text">
                    Informations utiles lors d'un voyage.
                  </p>
                  <div className="mt-auto w-100">
                    <Link to="/fr/during" className="btn btn-primary">En voyage</Link>
                  </div>
                </div>
              </section>
              <section className="card mb-2">
                <Image
                  filename="6DD2DA-1.png"
                  alt=""
                />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title h5">Après votre retour</h2>
                  <p className="card-text">Organiser le remboursement.</p>
                  <div className="mt-auto w-100">
                    <Link to="/fr/after" className="btn btn-primary">Revenir</Link>
                  </div>
                </div>
              </section>
          </div>
        </div>
      </main>
    </div>
  </w-screen>
</Layout>
)

export default IndexPage
