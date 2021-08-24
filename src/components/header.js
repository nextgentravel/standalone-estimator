import PropTypes from "prop-types"
import React from "react"
import Link from 'gatsby-link';
import SelectLanguage from './languageSelect';
import { useIntl } from 'react-intl';
import { graphql, useStaticQuery } from 'gatsby'

const Header = ({homeHeader}) => {
  const intl = useIntl();
  let locale = `${intl.locale}-ca`;
  let homeLink = `/${intl.locale}/`;

  const { allPrismicStandaloneestimatorHomepage } = useStaticQuery(graphql`
    {
      allPrismicStandaloneestimatorHomepage {
        nodes {
          data {
            header_goc_logo
            header_language_select
            header_skip_to_main
            title {
              text
            }
          }
          lang
        }
      }
    }
  `)

  const headerHtml = `  <header role="banner">
    <div id="wb-bnr" class="container">
      <section id="wb-lng" class="visible-md visible-lg text-right">
        <h2 class="wb-inv">Language selection</h2>
        <div class="row">
          <div class="col-md-12">
            <ul class="list-inline margin-bottom-none">
              <li><a lang="fr" href="/cgi-bin/language.pl">Fran&ccedil;ais</a></li>
              
            </ul>
          </div>
        </div>
      </section>
      <div class="row">
        <div class="brand col-xs-8 col-sm-9 col-md-6"> <a href="http://gcintranet.spac-pspc.gc.ca/gc/index-eng.html"><img src="/site/wet4.0/theme-tp-pw-publi-gcweb/img/sig-blk-en.svg" alt=""><span class="wb-inv">Public Services and Procurement Canada</span></a> </div>
        <section class="wb-mb-links col-xs-4 col-sm-3 visible-sm visible-xs" id="wb-glb-mn">
          <h2>Search and menus</h2>
          <ul class="list-inline text-right chvrn">
            <li><a href="#mb-pnl" title="Search and menus" aria-controls="mb-pnl" class="overlay-lnk" role="button"><span class="glyphicon glyphicon-search"><span class="glyphicon glyphicon-th-list"><span class="wb-inv">Search and menus</span></span></span></a></li>
          </ul>
          <div id="mb-pnl"></div>
        </section>
        <section id="wb-srch" class="col-xs-6 text-right visible-md visible-lg">
          <h2>Search</h2>
          <form action="https://gcintranet-recherche-search.tpsgc-pwgsc.gc.ca/b-eng.php" method="get" name="cse-search-box" role="search" class="form-inline">
            <div class="form-group">
    <label for="gcwu-srch" class="wb-inv">Search website</label>
        <input id="gcwu-srch" class="wb-srch-q form-control" name="q" value="" size="27" maxlength="150" placeholder="Search mySource" type="search">
        <input name="checkboxgcintranet" value="true" type="hidden">
          <input type="hidden" name="pagesize" value="10">
          <input type="hidden" name="page" value="1">
                <input type="hidden" name="language" value="en">
        
    </div>
    <div class="form-group submit">
    <button type="submit" id="wb-srch-sub" class="btn btn-primary btn-small" name="search"><span class="glyphicon-search glyphicon"></span><span class="wb-inv">Search</span></button>
    </div>
    </form>
    
        </section>
      </div>
    </div>
    
    <!-- End of banner_site-site_banner-eng.html / Fin De banner_site-site_banner-eng.html -->
    

  <!-- Start of nav_mega-mega_nav-eng.html / D&eacute;but de nav_mega-mega_nav-eng.html -->
  <nav role="navigation" id="wb-sm" data-ajax-replace="/site/wet4.0/html5/includes/sitemenu-eng.html" data-trgt="mb-pnl" class="wb-menu visible-md visible-lg" typeof="SiteNavigationElement">
    <div class="container nvbar">
      <h2>Topics menu</h2>
      <div class="row">
        <ul class="list-inline menu">
          <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/rem-eng.html">Compensation</a></li>
          <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/app-proc-eng.html">Procurement</a></li>
          <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/immeub-build-eng.html">Buildings and offices</a></li>
          <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/fp-gf/index-eng.html">Government finances</a></li>
          <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/services-eng.html">More services</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End of nav_mega-mega_nav-eng.html / Fin De nav_mega-mega_nav-eng.html -->
  <nav role="navigation" id="wb-bc" class="" property="breadcrumb">
    <h2 class="wb-inv">You are here:</h2>
    <div class="container">
      <div class="row">
        <ol class="breadcrumb">
          <!-- Start of pain-bread-eng.html / D&eacute;but de pain-bread-eng.html -->
          <li> <a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/index-eng.html">PSPC GCintranet </a> </li>
          <!-- End of pain-bread-eng.html / Fin De pain-bread-eng.html -->        
          <!-- InstanceBeginEditable name="breadcrumb" -->
          <li><a href="/gc/services-eng.html">More services</a></li>
          <!-- InstanceEndEditable -->
        </ol>
      </div>
    </div>
  </nav>
  </header>`

  let messages = allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;

  return (
    <div></div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header