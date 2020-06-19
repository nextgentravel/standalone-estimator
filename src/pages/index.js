import React from "react"
import SEO from "../components/seo"
import { Link } from "gatsby"
import { FaCircle } from 'react-icons/fa';

const IndexPage = () => (
  <main id="main-content" role="main">
    <div id="bg"></div>
    <SEO title="Travel Guide - Language Select" />
    <div className="card lang">
      <div className="card-body d-flex justify-content-center">
        <image></image>
        <h1 className="sr-only">Travel guidebook language selection</h1>
        <Link to="/fr" className="btn btn-primary m-2 p-2 pl-3 pr-3">Français</Link>
        <Link to="/en" className="btn btn-primary m-2 p-2 pl-3 pr-3">English</Link>
      </div>
      <div className="card-body bg-splash-card">
        <div className="col-6 float-left">
          <a class="text-dark" href="">Avis</a>
          &nbsp;<FaCircle size={5} class="text-secondary" />&nbsp;
          <a class="text-dark" href="">Terms and conditions</a>
        </div>
        <div className="col-6">
          <image></image>
        </div>
      </div>
    </div>
  </main>
)
export default IndexPage
