import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import { useIntl } from 'react-intl';

const Footer = (props) => {
  const intl = useIntl()
  let locale = `${intl.locale}-ca`;

  const { allPrismicStandaloneestimatorHomepage } = useStaticQuery(graphql`
    {
      allPrismicStandaloneestimatorHomepage {
        nodes {
          data {
            footer_text {
              html
            }
            footer_logo_alt
          }
          lang
        }
      }
    }
  `)

  let messages = allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;

  let footerHtml = `
  <div class="wet-container">
  <nav role="navigation">
    <h2 class="wb-inv">Site Information</h2>
    <div>
      <p><a href="/gc/avis-terms-eng.html" rel="license">Terms and conditions</a></p>
    </div>
    <div class="clear"></div>
    <div class="wet-row">
      <section class="wet-col-sm-4 wet-col-lg-4">
        <h3>About <abbr title="Public Services and Procurement Canada">PSPC</abbr></h3>
        <ul class="wet-list-unstyled">
          <li><a href="/gc/activ-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'Our activities']);">Our
              activities</a></li>
          <li><a href="/rfp-psr/index-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'Public Service Renewal stories']);">Public
              Service Renewal stories</a></li>
          <li><a href="/gc/region-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'Our regional offices']);">Our
              regional offices</a></li>
          <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/pm-dp/index-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'PSPC departmental policies']);"><abbr
                title="Public Services and Procurement Canada">PSPC</abbr> departmental
              policies</a></li>
          <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/sc-cs/index-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'Client service']);">Client
              service</a></li>
          <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/ba-ao/index-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'PSPC Accessibility Office']);"><abbr
                title="Public Services and Procurement Canada">PSPC</abbr> Accessibility
              Office</a></li>
        </ul>
      </section>
      <section class="wet-col-sm-4 wet-col-lg-4">
        <h3>Contact us</h3>
        <ul class="wet-list-unstyled">
          <li><a href="/gc/questions-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'General inquiries']);">General
              inquiries</a></li>
          <li><a href="http://gcdirectory-gcannuaire.ssc-spc.gc.ca/en/GCD/?pgid=014&amp;dn=OU=PSPC-SPAC,O=GC,C=CA"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'Find an employee [GEDS]']);">Find
              an employee [<abbr title="GCdirectory">GEDS</abbr>]</a></li>
          <li><a href="/bi-rp/issues-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'Report building and office issues (National Service Call Centre)']);">Report
              building and office issues<br />
              (National Service Call Centre)</a>
          </li>
        </ul>
      </section>
      <section class="wet-col-sm-4 wet-col-lg-4">
        <h3>Related sites</h3>
        <ul class="wet-list-unstyled">
          <li><a href="http://www.tpsgc-pwgsc.gc.ca/comm/index-eng.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'PSPC Internet site']);"><abbr
                title="Public Services and Procurement Canada">PSPC</abbr> Internet site</a>
          </li>
          <li><a href="http://intranet.canada.ca/index-eng.asp"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'GCIntranet']);">GCIntranet</a>
          </li>
          <li><a href="https://www.canada.ca/en/public-service-commission/jobs/services/gc-jobs.html"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'Public service jobs']);">Public
              service jobs</a></li>
          <li><a href="http://gcconnex.gc.ca/"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'GCconnex']);">GCconnex</a>
          </li>
          <li><a href="http://www.gcpedia.gc.ca/wiki/?setlang=en"
              onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-EN', 'GCpedia']);">GCpedia</a>
          </li>
        </ul>
      </section>
    </div>
  </nav>
</div>
<div class="wet-brand">
  <div class="wet-container">
    <div class="wet-row">
      <div class="wet-col-xs-6 wet-visible-sm wet-visible-xs wet-tofpg">
        <a href="#wb-cont">Top of Page <span class="glyphicon glyphicon-chevron-up"></span></a>
      </div>
      <div class="wet-col-xs-6 wet-col-md-12 wet-text-right">
        <img src="/boew-wet/wet4.0/GCWeb/assets/wmms-spl.png" alt="" /><span class="wb-inv">Symbol of the
          Government of Canada</span>
      </div>
    </div>
  </div>
</div>`

  return (
    <div>
      <footer role="contentinfo" id="wb-info" className="wet-visible-sm wet-visible-md wet-visible-lg wb-navcurr" dangerouslySetInnerHTML={{__html: footerHtml}}>

      </footer>
    </div>
  )
}

export default Footer
