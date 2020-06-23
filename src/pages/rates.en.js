import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import InputDatalist from "../components/input-datalist.js"
import DatePicker from "../components/date-picker"

// the following will be fetched from an API
let mockCityList = [
  {
      label: "Barrie",
      value: "Barrie"
  },
  {
      label: "Calgary",
      value: "Calgary"
  },
]

const Rates = () => (
  <Layout>
    <SEO title="Rates and Limits" />
    <w-screen mt-4="true" fluid="true" id="container">
      <div>
        <main id="main-content" role="main">
          <div className="container mt-4">
            <InputDatalist label="City" name="city" options={mockCityList} />
          </div>
          <div className="container mt-4">
            <DatePicker label="Start Date" name="start"></DatePicker>
          </div>
          <div className="container mt-4">
            <DatePicker label="End Date" name="end"></DatePicker>
          </div>
        </main>
      </div>
    </w-screen>
  </Layout>
)

export default Rates;
