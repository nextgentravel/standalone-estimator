import React from "react"
import { useIntl } from 'react-intl';
const headerHtml = ``
import SelectLanguage from '../components/languageSelect';
let scriptHtml = ``

export default function Layout({ children }) {
    const intl = useIntl()
    const langKey = intl.locale;
    return <div className="app-wrapper">
      {langKey === 'en' &&
      <div  id="wet-template">
        <header role="banner">
        <div id="wb-bnr" className="container">
        <section id="wb-lng" className="visible-md visible-lg text-right">
            <h2 className="wb-inv">Language selection</h2>
            <div className="row">
            <div className="col-md-12">
                <ul className="list-inline margin-bottom-none">
                <li><SelectLanguage /></li>
                
                </ul>
            </div>
            </div>
        </section>
        <div className="row">
            <div className="brand col-xs-8 col-sm-9 col-md-6"> <a href="http://gcintranet.spac-pspc.gc.ca/gc/index-eng.html"><img src="/site/wet4.0/theme-tp-pw-publi-gcweb/img/sig-blk-en.svg" alt="" /><span className="wb-inv">Public Services and Procurement Canada</span></a> </div>
            <section className="wb-mb-links col-xs-4 col-sm-3 visible-sm visible-xs" id="wb-glb-mn">
            <h2>Search and menus</h2>
            <ul className="list-inline text-right chvrn">
                <li><a href="#mb-pnl" title="Search and menus" aria-controls="mb-pnl" className="overlay-lnk" role="button"><span className="glyphicon glyphicon-search"><span className="glyphicon glyphicon-th-list"><span className="wb-inv">Search and menus</span></span></span></a></li>
            </ul>
            <div id="mb-pnl"></div>
            </section>
            <section id="wb-srch" className="col-xs-6 text-right visible-md visible-lg">
            <h2>Search</h2>
            <form action="https://gcintranet-recherche-search.tpsgc-pwgsc.gc.ca/b-eng.php" method="get" name="cse-search-box" role="search" className="form-inline float-right">
                <div className="form-group">
        <label htmlFor="gcwu-srch" className="wb-inv">Search website</label>
            <input id="gcwu-srch" className="wb-srch-q form-control" name="q" size="27" maxLength="150" placeholder="Search mySource" type="search" defaultValue='' />
            <input name="checkboxgcintranet" value="true" type="hidden" />
            <input type="hidden" name="pagesize" value="10" />
            <input type="hidden" name="page" value="1" />
            <input type="hidden" name="language" value="en" />
        </div>
        <div className="form-group submit">
            <button type="submit" id="wb-srch-sub" className="btn btn-primary btn-small" name="search"><span className="glyphicon-search glyphicon"></span><span className="wb-inv">Search</span></button>
        </div>
        </form>

            </section>
        </div>
        </div>

        {/* <!-- End of banner_site-site_banner-eng.html / Fin De banner_site-site_banner-eng.html --> */}


        {/* <!-- Start of nav_mega-mega_nav-eng.html / D&eacute;but de nav_mega-mega_nav-eng.html --> */}
        <nav role="navigation" id="wb-sm" data-trgt="mb-pnl" className="wb-menu visible-md visible-lg" typeof="SiteNavigationElement">

            <script>
                var _paq = _paq || [];
            </script>
            <div className="pnl-strt container nvbar"> <h2 className="wb-inv">Site menu</h2> <div className="row"> <ul className="list-inline menu" role="menubar"> 
            <li><a href="#compensation" className="item">Compensation</a> 
                <ul className="sm list-unstyled" id="compensation" role="menu">
                    <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/remuneration-compensation/comm-eng.html">Compensation community hub</a></li>
                    <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/remuneration-compensation/awr-cwa-eng.html">Compensation web applications</a></li>	
                    <li><a href="https://intranet.canada.ca/ppb-rpa/index-eng.asp">Pay, pension and benefits</a></li>
                    <li className="slflnk"><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/remuneration-compensation/index-eng.html">Compensation - More</a></li>
                </ul> 
            </li>
            <li><a href="#procurement" className="item">Procurement</a> 
            <ul className="sm list-unstyled" id="procurement" role="menu"> 
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/app-proc/parcourir-browse/index-eng.html">Browse and purchase goods and services</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/app-proc/guides/index-eng.html">Procurement advice, guides and tools</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/app-proc/contact-eng.html">Submit a procurement comment or question</a></li>
            <li><a href="https://www.canada.ca/en/treasury-board-secretariat/corporate/job-opportunities/careers-public-procurement.html">Careers in procurement</a></li>
            {/* <!-- <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/eog-ggo/achat-procurement-eng.html">Green procurement</a></li> --> */}
            <li className="slflnk"><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/app-proc-eng.html">Procurement - More</a></li>
            </ul> 

            </li>
            <li><a href="#buildings" className="item">Buildings and offices</a> <ul className="sm list-unstyled" id="buildings" role="menu"> 

            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bi-rp/issues-eng.html">Report building and office issues (National Service Call Centre)</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bi-rp/rep-dir-eng.html">Property managed by the Government of Canada</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bi-rp/publications/index-eng.html">Policies and procedures on federal buildings and offices</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bi-rp/prpi-rpc-eng.html">Find a real property contact</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bi-rp/ser-cat/index-eng.html">Real Property Branch service catalogue</a></li>
            <li className="slflnk"><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/immeub-build-eng.html">Buildings and offices - More</a></li>
            </ul> </li>

            
            <li><a href="#finance" className="item">Government finances</a> 
            <ul className="sm list-unstyled" id="finance" role="menu"> 
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/rg/txt/paiements-payments-eng.html">Issuing payments</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/rg/txt/ab-ba-eng.html">Receiving payments</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/fp-gf/scrg-rgcs/index-eng.html">Receiver General central systems</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/fp-gf/efaf-yer-eng.html">Year-end requirements</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/fp-gf/scc-mac-eng.html">Maintaining the accounts of Canada</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/sigma/index-eng.html">SIGMA: Finance, procurement and real property system</a></li>
            <li className="slflnk"><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/fp-gf/index-eng.html">Government finances - More</a></li>
            {/* <!--<li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/rg/cpc-pac/index-eng.html">Preparing the Public Accounts of Canada</a></li> */}
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/rg/sfmc-cdfs/index-eng.html">Common Departmental Financial System</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/rg/txt/index-eng.html">Guidance on working with the Receiver General</a></li>
            </ul></li>

            <li><a href="#services" className="item">More services</a> <ul className="sm list-unstyled" id="services" role="menu"> 
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bt-tb/index-eng.html">Translation Bureau's language services and tools</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/rhgc-gchr/index-eng.html">My Government of Canada Human Resources</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/sem-emm/index-eng.html">Copyright Media Clearance Program</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/pub-adv/index-eng.html">Advertising coordination and partnerships</a></li>
            <li><a href="https://www.tpsgc-pwgsc.gc.ca/imagerie-imaging/index-eng.html">Document imaging</a></li>
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/rop-por/index-eng.html">Public opinion research</a></li>
            <li><a href="https://www.tpsgc-pwgsc.gc.ca/biens-property/gec-ecm/index-eng.html">Events and conference management</a></li>
            {/* <!--<li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/dgsi-isb/integration-eng.html">Shared human resources services</a></li> --> */}
            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/forms/text/index-eng.html">Forms catalogue</a></li>
            {/* <!--<li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/eog-ggo/index-eng.html">Greening government operations</a></li> --> */}
            <li className="slflnk"><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/services-eng.html">Services - More</a></li>
            </ul> </li>



            </ul> </div> </div> 

            </nav>
        {/* <!-- End of nav_mega-mega_nav-eng.html / Fin De nav_mega-mega_nav-eng.html --> */}
        <nav role="navigation" id="wb-bc" className="" property="breadcrumb">
        <h2 className="wb-inv">You are here:</h2>
        <div className="container">
        <div className="row">
            <ol className="breadcrumb">
            {/* <!-- Start of pain-bread-eng.html / D&eacute;but de pain-bread-eng.html --> */}
            <li> <a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/index-eng.html">PSPC GCintranet </a> </li>
            {/* <!-- End of pain-bread-eng.html / Fin De pain-bread-eng.html -->         */}
            {/* <!-- InstanceBeginEditable name="breadcrumb" --> */}
            <li><a href="/gc/services-eng.html">More services</a></li>
            {/* <!-- InstanceEndEditable --> */}
            </ol>
        </div>
        </div>
        </nav>
        </header>
        </div>

      }
      <div id="bootstrap-4">
        {children}
      </div>
      <div id="wet-template">
        <footer role="contentinfo" id="wb-info" className="visible-sm visible-md visible-lg wb-navcurr">
            <div className="container">
                <nav role="navigation" >
                    <h2 className="wb-inv">Site Information</h2>
                    <div>
                        <p><a href="/gc/avis-terms-eng.html" rel="license">Terms and conditions</a></p>
                    </div>
                    <div className="clear"></div>
                    <div className="row">
                        <section className="col-sm-4 col-lg-4">
                            <h3>About <abbr title="Public Services and Procurement Canada">PSPC</abbr></h3>
                            <ul className="list-unstyled">
                                <li><a href="/gc/activ-eng.html">Our activities</a></li>
                                <li><a href="/rfp-psr/index-eng.html">Public Service Renewal stories</a></li>
                                <li><a href="/gc/region-eng.html">Our regional offices</a></li>
                                <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/pm-dp/index-eng.html"><abbr title="Public Services and Procurement Canada">PSPC</abbr> departmental policies</a></li>
                                <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/sc-cs/index-eng.html">Client service</a></li>
                                <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/ba-ao/index-eng.html"><abbr title="Public Services and Procurement Canada">PSPC</abbr> Accessibility Office</a></li>
                            </ul>
                        </section>
                        <section className="col-sm-4 col-lg-4">
                            <h3>Contact us</h3>
                            <ul className="list-unstyled">
                                <li><a href="/gc/questions-eng.html">General inquiries</a></li>
                                <li><a href="http://gcdirectory-gcannuaire.ssc-spc.gc.ca/en/GCD/?pgid=014&amp;dn=OU=PSPC-SPAC,O=GC,C">Find an employee [<abbr title="GCdirectory">GEDS</abbr>]</a></li>
                                <li><a href="/bi-rp/issues-eng.html">Report building and office issues<br />
                                (National Service Call Centre)</a>
                                </li>
                            </ul>
                        </section>
                        <section className="col-sm-4 col-lg-4">
                            <h3>Related sites</h3>
                            <ul className="list-unstyled">
                                <li><a href="http://www.tpsgc-pwgsc.gc.ca/comm/index-eng.html"><abbr title="Public Services and Procurement Canada">PSPC</abbr> Internet site</a></li>
                                <li><a href="http://intranet.canada.ca/index-eng.asp">GCIntranet</a></li>
                                <li><a href="https://www.canada.ca/en/public-service-commission/jobs/services/gc-jobs.html">Public service jobs</a></li>
                                <li><a href="http://gcconnex.gc.ca/">GCconnex</a></li>
                                <li><a href="http://www.gcpedia.gc.ca/wiki/?setlang=en">GCpedia</a></li>
                            </ul>
                        </section>
                    </div>
                </nav>
            </div>
            <div className="brand">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6 visible-sm visible-xs tofpg">
                            <a href="#wb-cont">Top of Page <span className="glyphicon glyphicon-chevron-up"></span></a>
                        </div>
                        <div className="col-xs-6 col-md-12 text-right">
                            <img src="/site/wet4.0/assets/wmms-blk.svg" alt="" /><span className="wb-inv">Symbol of the Government of Canada</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    </div>
}