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

  let messages = allPrismicStandaloneestimatorHomepage.nodes.find(function(o){ return o.lang === locale }).data;

  return (

    <header role="banner" class="wet-body">
		<div id="wb-bnr" class="wet-container">
			<section id="wb-lng" class="wet-visible-md wet-visible-lg wet-text-right">
				<h2 class="wb-inv">Language selection</h2>
				<div class="wet-row">
					<div class="wet-col-md-12">
						<ul class="wet-list-inline wet-margin-bottom-none">
							<li><a lang="fr" href="/cgi-bin/language.pl">Fran&ccedil;ais</a></li>
						</ul>
					</div>
				</div>
			</section>
			<div class="wet-row">
				<div class="wet-brand wet-col-xs-8 wet-col-sm-9 wet-col-md-6"> <a
						href="http://gcintranet.spac-pspc.gc.ca/gc/index-eng.html"><img
							src="/boew-wet/wet4.0/theme-tp-pw-gcweb-ca/img/sig-blk-en.svg" alt="" /><span
							class="wb-inv">Public Services and Procurement Canada</span></a> </div>
				<section class="wb-mb-links wet-col-xs-4 wet-col-sm-3 wet-visible-sm wet-visible-xs" id="wb-glb-mn">
					<h2>Search and menus</h2>
					<ul class="wet-list-inline wet-text-right wet-chvrn">
						<li><a href="#mb-pnl" title="Search and menus" aria-controls="mb-pnl" class="wet-overlay-lnk"
								role="button"><span class="glyphicon glyphicon-search"><span
										class="glyphicon glyphicon-th-list"><span class="wb-inv">Search and
											menus</span></span></span></a></li>
					</ul>
					<div id="mb-pnl"></div>
				</section>
				<section id="wb-srch" class="wet-col-xs-6 wet-text-right wet-visible-md wet-visible-lg">
					<h2>Search</h2>
					<form action="https://gcintranet-recherche-search.tpsgc-pwgsc.gc.ca/b-eng.php" method="get"
						name="cse-search-box" role="search" class="wet-form-inline">
						<div class="wet-form-group">
							<label for="gcwu-srch" class="wb-inv">Search website</label>
							<input id="gcwu-srch" class="wb-srch-q wet-form-control" name="q" value="" size="27"
								maxlength="150" placeholder="Search mySource" type="search" />
							<input name="checkboxgcintranet" value="true" type="hidden" />
							<input type="hidden" name="pagesize" value="10" />
							<input type="hidden" name="page" value="1" />
							<input type="hidden" name="language" value="en" />

						</div>
						<div class="wet-form-group submit">
							<button type="submit" id="wb-srch-sub" class="wet-btn wet-btn-primary wet-btn-small"
								name="search"><span class="glyphicon-search glyphicon"></span><span
									class="wb-inv">Search</span></button>
						</div>
					</form>

				</section>
			</div>
		</div>

		<nav role="navigation" id="wb-sm" data-ajax-replace="/site/wet4.0/html5/includes/sitemenu-eng.html"
			data-trgt="mb-pnl" class="wb-menu wet-visible-md wet-visible-lg" typeof="SiteNavigationElement">
			<div class="wet-container nvbar">
				<h2>Topics menu</h2>
				<div class="wet-row">
					<ul class="wet-list-inline wet-menu">
						<li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/rem-eng.html">Compensation</a></li>
						<li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/app-proc-eng.html">Procurement</a></li>
						<li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/immeub-build-eng.html">Buildings and
								offices</a></li>
						<li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/fp-gf/index-eng.html">Government finances</a>
						</li>
						<li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/services-eng.html">More services</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<nav id="wb-bc" class="" property="breadcrumb">
			<h2 class="wb-inv">You are here:</h2>
			<div class="wet-container">
				<div class="wet-row">
					<ol class="breadcrumb">

						<li> <a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/index-eng.html">PSPC GCintranet </a> </li>

						<li><a href="/remuneration-compensation/index-eng.html">GC Travel Guide</a></li>

						<li><a href="/remuneration-compensation/index-eng.html">Travel Calculator</a></li>
					</ol>
				</div>
			</div>
		</nav>
	</header>

    // <header className="mb-5">
    //   <div className="container">
    //     <div className="row my-3 mx-2">
    //       <nav className="skiphold" id="header-skiplink">
    //         <a className="sr-only sr-only-focusable aurora-skip skiplink" aria-label="main skiplink" href="#main-content">{messages.header_skip_to_main}</a>
    //       </nav>
    //       <section className='text-right align-self-center ml-auto'>
    //         <p className="sr-only sr-only-focusable aurora-skip">{messages.header_language_select}</p>
    //         <SelectLanguage />
    //       </section>
    //     </div>
    //   </div>
    // </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header