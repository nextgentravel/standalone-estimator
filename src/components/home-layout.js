import React, { useState } from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import ContentPanel from "../components/content-panel";
import ToolPanel from "../components/tool-panel";
import DoormatPanel from "../components/doormat-panel";
import { FormattedMessage } from 'react-intl';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { FaMinus } from 'react-icons/fa';

import {
  StaticQuery,
  graphql
} from 'gatsby';

export default ({ data }) => {
    const [showContactCard, setShowContactCard] = useState(false);
    const handleShowContactCardToggle = () => {
      setShowContactCard(!showContactCard);
    }
    return (
      <StaticQuery query = {
        graphql `
            query homePage {
              prismicHomepage {
                data {
                    doormat_title {
                      text
                    }
                    lead {
                      html
                    }
                    title {
                      text
                    }
                  }
                }
            }
        `
      }
      render = {
        data => {
          const homePage = data.prismicHomepage.data;
          return (
            <Layout>
              <SEO title="Home" />
              <w-screen mt-4="true" fluid="true" id="container">
                <div>
                  <main id="main-content" role="main">
                    <div className="container mt-4">
                      <h2 className="mb-4 font-weight-bold">{homePage.title.text}</h2>
                      <div dangerouslySetInnerHTML={{__html: homePage.lead.html}}></div>
                      <div className="row mb-3 mt-3">
                        <ContentPanel />
                      </div>
                    </div>
                    <div>
                      <div className="container">
                        <h3>{homePage.doormat_title.text}</h3>
                        <DoormatPanel />
                      </div>
                    </div>
                    <div className="bg-light">
                      <div className="container">
                        <ToolPanel />
                      </div>
                    </div>
                  </main>
                </div>
      
                {showContactCard && <div className="card floating-contact-box">
                  <div className="card-header bg-success text-light">
                    <RiQuestionnaireLine size={20} /> Travel Support
                    <FaMinus onClick={handleShowContactCardToggle} size={20} className="float-right text-dark cursor-pointer" />
                  </div>
                  <div className="card-body">
                    <p>For travel support or questions related to your trip, contact HRG 24/7 at:</p>
                    <p><strong>Telephone</strong><br />
                    1-866-857-3578 (Canada & U.S.)<br />
                    +1 613-822-3873 (Other countries)</p>
      
                    <p><strong>TTY</strong><br />
                    1-855-462-8870 (Canada & U.S.)
                    1-704-417-5877 (collect call from other countries)
                    </p>
      
                    <p><strong>Email</strong><br />
                    <a href="mailto:travel.gc@hrgworldwide.com">travel.gc@hrgworldwide.com</a></p>
                  </div>
                </div>}
                {!showContactCard && <button
                  type="button"
                  className="btn btn-success rounded-circle floating-contact position-absolute"
                  onClick={handleShowContactCardToggle}
                >
                  <RiQuestionnaireLine size={35} />
                </button>}
              </w-screen>
            </Layout>
          )
        }
      }
    />
  )
}
