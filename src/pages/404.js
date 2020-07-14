import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
      <main className="container mt-3"  id="main-content">
        <div className="row">
          <div className="col-lg-6 col-md-12 mt-3 mb-4" lang="fr">
            <h1><FaExclamationTriangle /> Nous ne pouvons trouver cette page (Erreur 404)</h1>
            <p>Nous sommes désolés que vous ayez abouti ici. Il arrive parfois qu'une page ait été déplacée ou supprimée. Heureusement, nous pouvons vous aider à trouver ce que vous cherchez.</p>
            <Link to="/fr">Retournez à la page d'accueil</Link>
          </div>
          <div className="col-lg-6 col-md-12 mt-3 mb-4" lang="en">
            <h1><FaExclamationTriangle /> We couldn't find that page (Error 404)</h1>
            <p>We're sorry you ended up here. Sometimes a page gets moved or deleted, but hopefully we can help you find what you're looking for.</p>
            <Link to="/en">Return to the home page</Link>
          </div>
        </div>
      </main>
    </Layout>
)

export default NotFoundPage
