import React from "react"
import { useIntl } from 'react-intl';
const headerHtml = ``
import SelectLanguage from '../components/languageSelect';
let scriptHtml = ``

export default function Layout({ children }) {
    const intl = useIntl()
    const langKey = intl.locale;
    return <div className="app-wrapper">
      {langKey === 'fr' &&
        <div  id="wet-template">
            <header role="banner">
            <div id="wb-bnr" className="container">
            <section id="wb-lng" className="visible-md visible-lg text-right">
                <h2 class="wb-inv">S&eacute;lection de la langue</h2>
                <div className="row">
                <div className="col-md-12">
                    <ul className="list-inline margin-bottom-none">
                        <li><SelectLanguage /></li>
                    </ul>
                </div>
                </div>
            </section>
            <div className="row">
            <div class="brand col-xs-8 col-sm-9 col-md-6"> <a href="http://gcintranet.spac-pspc.gc.ca/gc/index-fra.html"><img src="/site/wet4.0/theme-tp-pw-publi-gcweb/img/sig-blk-fr.svg" alt="" /> <span class="wb-inv">Services publics et Approvisionnement Canada</span> </a> </div>
		<section class="wb-mb-links col-xs-4 col-sm-3 visible-sm visible-xs" id="wb-glb-mn">
			<h2>Recherche et menus</h2>
			<ul class="list-inline text-right chvrn">
				<li><a href="#mb-pnl" title="Recherche et menus" aria-controls="mb-pnl" class="overlay-lnk" role="button"><span class="glyphicon glyphicon-search"><span class="glyphicon glyphicon-th-list"><span class="wb-inv">Recherche et menus</span></span></span></a></li>
			</ul>
			<div id="mb-pnl"></div>
		</section>
		<section id="wb-srch" class="col-xs-6 text-right visible-md visible-lg">
			<h2>Recherche</h2>
<form action="https://gcintranet-recherche-search.tpsgc-pwgsc.gc.ca/b-fra.php" method="get" name="cse-search-box" role="search" class="form-inline float-right">

<div class="form-group">
<label for="gcwu-srch" class="wb-inv">Recherchez le site Web</label>
		<input id="gcwu-srch" class="wb-srch-q form-control" name="q" value="" size="27" maxlength="150" placeholder="Recherger dans maSource" type="search" />
		<input name="checkboxgcintranet" value="true" type="hidden" />
			<input type="hidden" name="pagesize" value="10" />
			<input type="hidden" name="page" value="1" />
			      <input type="hidden" name="language" value="fr" />
		
</div>
<div class="form-group submit">
<button type="submit" id="wb-srch-sub" class="btn btn-primary btn-small" name="search"><span class="glyphicon-search glyphicon"></span><span class="wb-inv">Recherche</span></button>
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
                <div class="pnl-strt wet-container nvbar">
                    <h2 class="wb-inv">Menu des sujets</h2>
                    <ul class="wet-list-inline menu" role="menubar">
                    <li> <a class="item" href="#Outilsetressources"> Outils et ressources </a>
                        <ul class="sm list-unstyled" id="Outilsetressources">
                        <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/ressources-resources/Pages/az-index.aspx">Index A &agrave; Z</a></li>
                            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/rem/awr-cwa-fra.html">Applications Web de la r&eacute;mun&eacute;ration</a></li>
                            <li><a href="https://protege-secure.tpsgc-pwgsc.gc.ca:443/nonprotege-unprotected/partactapppen-actmempenapp/demandeacces-accessrequest-fra.html?contextType=external&amp;username=string&amp;contextValue=/oam&amp;password=sercure_string&amp;challenge_url=https://protege-secure.tpsgc">Acc&eacute;der &agrave; Ph&eacute;nix</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/pages/outilsrh-hrtools.aspx?url=mysrcnavintr">Outils eRH</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/rp-pr.aspx">Ressources humaines : contenu le plus visit&eacute;</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/app-acq/text/ca-pc/index-fra.html">Approvisionnement</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/or-tr/communications/">Communications</a></li>
                            <li><a href="https://gcdocs.gc.ca:443/tpsgc-pwgsc/llisapi.dll?func=LL.getlogin&amp;selected=_fr&amp;NextURL=/tpsgc-pwgsc/llisapi.dll">GCdocs</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/finance/sigma/index-fra.html">SIGMA</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/collectivites-communities.aspx">Groupes de travail et comit&eacute;s</a></li>
                            <li><a href="http://intranet.canada.ca/wg-tg/lwt-rlo-fra.asp">Ressources linguistiques et outils d'aide &agrave; la r&eacute;daction</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/dr-rm.aspx">Documents de r&eacute;f&eacute;rence</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/ppc/ressources-resources/gabarits-templates-fra.html">Gabarits et graphiques</a></li>
                            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/pm-dp/index-fra.html">Politiques minist&eacute;rielles</a></li>
                        <li class="slflnk"> <a href="https://masource-mysource.spac-pspc.gc.ca/fra/or-tr/">Outils et ressources - Page principale</a> </li>
                        </ul>
                    </li>
                        <li><a href="#Centredesemployes" class="item">Centre des employ&eacute;s</a>
                            <ul class="sm list-unstyled" id="Centredesemployes" role="menu">
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/nvxmplys-nwmplys.aspx">Nouveaux employ&eacute;s</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/pages/outilsrh-hrtools.aspx?url=mysrcnavempintral">Outils eRH</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/avantages-benefits/Pages/default.aspx">Avantages et r�mun�ration</a></li>
                            <li><a href="http://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/paye-centre-pay/vie-life/index-fra.html">&Eacute;v&eacute;nements de la vie</a></li>
                            <li><a href="http://www.tbs-sct.gc.ca/agreements-conventions/index-fra.aspx">Conventions collectives</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/carriere-career/competences-competencies/Pages/default.aspx">Comp&eacute;tences</a></li>
                            <li><a href="https://www.canada.ca/fr/commission-fonction-publique/emplois/services/emplois-gc.html">Occasions d'emploi</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/sb-hw.aspx">Sant&eacute; et bien-&ecirc;tre</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/carriere-career/reconnaissance-recognition/Pages/default.aspx">Prix et reconnaissance</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/mieuxetre-wellness/Pages/gstn-conflits-conflict-mgt.aspx">Gestion des conflits</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/gestionnaires-managers/rend-gstn-perf-mgt/Pages/default.aspx">Gestion du rendement</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/santesecuritetravail-occupationalhealthsafety/">Sant&eacute; et s&eacute;curit&eacute; au travail</a></li>
                            <li class="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/ce-ec.aspx">Centre des employ&eacute;s - Page principale</a></li>
                            </ul>
                        </li>
                        <li><a href="#Centredelagestion" class="item">Centre de la gestion</a>
                            <ul class="sm list-unstyled" id="Centredelagestion" role="menu">
                            <li><a href="http://www.gcpedia.gc.ca/wiki/Communicating_with_the_Pay_Centre,_your_role_and_responsibilities?setlang=fr&amp;uselang=fr">Communiquer avec le centre des services de paye, votre r&ocirc;le et vos responsabilit&eacute;s</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/gestionnaires-managers/Pages/default.aspx">Trousse pour les gestionnaires</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/dotation-staffing/pdm-csp-fra.html">Dotation</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/transf/planification-planning-fra.html">Planification de la rel&egrave;ve</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/gestionnaires-managers/rend-gstn-perf-mgt/Pages/default.aspx">Gestion du rendement</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/planification-planning/planification-planning-fra.html" >Planification des ressources humaines</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/classification/class-org-fra.html">Classification et am&eacute;nagement organisationnel</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/accueilorientation-onboardingorientation/Pages/default.aspx">Accueil et orientation</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/santesecuritetravail-occupationalhealthsafety/">Sant&eacute; et s&eacute;curit&eacute; au travail</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/travail-labour/rt-lr-fra.html">Relations de travail</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/classification/grie-fra.html">Griefs</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/travail-labour/harcelement-harassment-fra.html">Harc&egrave;lement</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/mieuxetre-wellness/Pages/gstn-conflits-conflict-mgt.aspx">Gestion de conflits</a></li>
                            <li class="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/cg-mc.aspx">Centre de la gestion - Page principale</a></li>
                            </ul>
                        </li>
                        <li><a href="#Apprentissage" class="item">Apprentissage</a>
                            <ul class="sm list-unstyled" id="Apprentissage">
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/accueilorientation-onboardingorientation/Pages/default.aspx">Accueil pour nouveaux employ�s et nouveaux �tudiants</a></li>
                            <li><a href="http://catalogueapprentissage-learningcatalogue.tpsgc-pwgsc.gc.ca/alto.aspx?lang=fra">ALTO</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/apprentissage-learning/Pages/default.aspx">Apprentissage</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/carriere-career/gest-car-manag/cntrautoapp-slflrncntr-fra.html">Centre d'apprentissage</a></li>
                            <li><a href="http://catalogueapprentissage-learningcatalogue.tpsgc-pwgsc.gc.ca/lang-language.aspx?lang=fra">Formation linguistique</a></li> 
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/carriere-career/leadership-services-gstn-mgt/Pages/default.aspx">Services de gestion de carri�re et de leadership</a></li>
                            <li class="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/a-l.aspx">Apprentissage - Page principale</a></li>
                            </ul>
                        </li>
                        <li><a href="#Services" class="item">Services</a>
                            <ul class="sm list-unstyled" id="Services">
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/dgap-pab">Administration de la paye</a></li>
                        <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/app-acq/index-fra.html">Approvisionnements</a></li>
                        <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bt-tb/index-fra.html">Bureau de la traduction</a></li>
                        <li><a href="http://www.tpsgc-pwgsc.gc.ca/citeparlementaire-parliamentaryprecinct/index-fra.html">Cit� parlementaire</a></li>
                        <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/dpi-cio/Pages/default.aspx">Direction g�n�rale du dirigeant principal de l'information</a></li>
                        <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/finance/index-fra.html">Finances et administration</a></li>
                        <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/ppc/index-fra.html">Politiques, planification et communications</a></li>
                        <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/pages/default.aspx?url=mysrcnavintra">Ressources humaines</a></li>
                        <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/dgrgp-rgpb">Receveur g�n�ral et des pensions</a></li>
                        <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/bi-rp/index-fra.html">Services immobiliers</a></li>
                        <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/dgsi-isb/Pages/default.aspx">Services int�gr�s</a></li>	
                        <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/dgs-dob/Pages/default.aspx">Surveillance minist�rielle</a></li>
                            <li class="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/">Services - Page principale</a></li>
                            </ul>
                        </li>
                        <li><a href="#Regions" class="item">R&eacute;gions</a>
                            <ul class="sm list-unstyled" id="Regions" role="menu">
                            <li><a href="http://breakers-brisants.pwgsc-tpsgc.gc.ca/fra/home-accueil">Atlantique</a></li>
                            <li><a href="http://orion.pwgsc-tpsgc.gc.ca/orion/index-fra.aspx?lang=fra">Ontario</a></li>
                            <li><a href="http://pacific.pwgsc.gc.ca/language">Pacifique</a></li>
                            <li><a href="http://intranet.que.tpsgc.gc.ca/">Qu&eacute;bec</a></li>
                            <li><a href="http://intranet.wst.pwgsc.gc.ca/">Ouest</a></li>
                            <li class="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/eng/Pages/regions.aspx">R&eacute;gions - Page principale</a></li>
                            </ul>
                        </li>
                        <li><a href="#Soutien" class="item">Soutien</a>
                            <ul class="sm list-unstyled" id="Soutien">
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/va-bt.aspx">Voyages d'affaires</a></li>
                            <li><a href="http://dune.pwgsc-tpsgc.gc.ca/fr/installations_securite">Installations et s&eacute;curit&eacute;</a></li>
                            <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/dpi-cio/services/sb-ds/stn-spprt/Pages/soutien-support.aspx">Soutien technique</a></li>
                            <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bt-tb/ministeres-departments/accueil-home-fra.html">Traduction et services linguistiques</a></li>
                            <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/ppc/ps/sc-cms-fra.html">Services de messagerie et de courrier</a></li>
                            <li class="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/soutien-support.aspx">Soutien - More</a></li>
                            </ul>
                        </li>
                        </ul>
                        </div>

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
            {langKey === 'en' &&
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
            }
            {langKey === 'fr' &&
                <footer role="contentinfo" id="wb-info">
                    <nav role="navigation" class="container wb-navcurr">
                        <h2 class="wb-inv">&Agrave; propos de ce site</h2>
                        <div>
                            <p><a href="/gc/avis-terms-fra.html" rel="license">Avis</a></p>
                        </div>
                        <div class="clear"></div>
                        <div class="row">
                            <section class="col-sm-4 col-lg-4">
                                <h3>&Agrave; propos de <abbr title="Services publics et Approvisionnement Canada">SPAC</abbr></h3>
                                <ul class="list-unstyled">
                                    <li><a href="/gc/activ-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Nos activités']);">Nos activit&eacute;s</a></li>
                                    <li><a href="/rfp-psr/index-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Histoires du renouvellement de la fonction publique']);">Histoires du renouvellement de la fonction publique</a></li>
                                    <li><a href="/gc/region-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Nos bureaux régionaux']);">Nos bureaux r&eacute;gionaux</a></li>
                                    <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/pm-dp/index-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Politiques ministérielles de SPAC']);">Politiques minist&eacute;rielles de <abbr title="Services publics et Approvisionnement Canada">SPAC</abbr></a></li>
                                    <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/sc-cs/index-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Service à la clientèle']);">Service &agrave; la client&egrave;le</a></li>
                                    <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/ba-ao/index-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Bureau de l’accessibilité de SPAC']);">Bureau de l’accessibilité de <abbr title="Services publics et Approvisionnement Canada">SPAC</abbr></a></li>
                                </ul>
                            </section>
                            <section class="col-sm-4 col-lg-4">
                                <h3>Contactez-nous</h3>
                                <ul class="list-unstyled">
                                    <li><a href="/gc/questions-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Demandes de renseignements généraux']);">Demandes de renseignements g&eacute;n&eacute;raux</a></li>
                                    <li><a href="http://gcdirectory-gcannuaire.ssc-spc.gc.ca/fr/GCA/?pgid=014&amp;dn=OU=PSPC-SPAC,O=GC,C=CA" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Trouver un employé [SAGE]']);">Trouver un employ&eacute; [<abbr title="GCannuaire">SAGE</abbr>]</a></li>
                                    <li><a href="/bi-rp/issues-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Signaler un problème lié aux immeubles et aux bureaux (Centre national d’appels de service)']);">Signaler un probl&egrave;me li&eacute; aux immeubles et aux bureaux (Centre national d'appels de service)</a></li>
                                </ul>
                            </section>
                            <section class="col-sm-4 col-lg-4">
                                <h3>Sites connexes</h3>
                                <ul class="list-unstyled">
                                    <li><a href="http://www.tpsgc-pwgsc.gc.ca/comm/index-fra.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'SPAC sur le Web']);"><abbr title="Services publics et Approvisionnement Canada">SPAC</abbr> sur le Web</a></li>
                                    <li><a href="http://intranet.canada.ca/index-fra.asp" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Intranet du GC']);">Intranet du GC</a></li>
                                    <li><a href="https://www.canada.ca/fr/commission-fonction-publique/emplois/services/emplois-gc.html" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'Emplois à la fonction publique']);">Emplois &agrave; la fonction publique</a></li>
                                    <li><a href="http://gcconnex.gc.ca/" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'GCconnex']);">GCconnex</a></li>
                                    <li><a href="http://www.gcpedia.gc.ca/wiki/?setlang=fr" onclick="javascript:_paq.push(['trackEvent', 'Pied de page-Footer-FR', 'GCpédia']);">GCp&eacute;dia</a></li>
                                </ul>
                            </section>
                        </div>
                    </nav>
                    <div class="brand">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-6 visible-sm visible-xs tofpg"> <a href="#wb-cont">Haut de la page <span class="glyphicon glyphicon-chevron-up"></span></a> </div>
                                <div class="col-xs-6 col-md-12 text-right"> <img src="/site/wet4.0/assets/wmms-blk.svg" alt="" /><span class="wb-inv">Symbole du gouvernement du Canada</span> </div>
                            </div>
                        </div>
                    </div>
                </footer>
            }

        </div>
    </div>
}