import React from "react";

function Header({ language }) {
  return (
<header role="banner">
        {language === 'en' &&
            <>
                <div id="wb-bnr" className="container">
                    <section id="wb-lng" className="visible-md visible-lg text-right">
                    <h2 className="wb-inv">Language selection</h2>
                    <div className="row">
                        <div className="col-md-12">
                        <ul className="list-inline margin-bottom-none">
                            <li><a lang="fr" href="/cgi-bin/language.pl">Fran&ccedil;ais</a></li>

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
                        <form action="https://gcintranet-recherche-search.tpsgc-pwgsc.gc.ca/b-eng.php" method="get" name="cse-search-box" role="search" className="form-inline">
                        <div className="form-group">
                            <label htmlFor="gcwu-srch" className="wb-inv">Search website</label>
                            <input id="gcwu-srch" className="wb-srch-q form-control" name="q" defaultValue="" size="27" maxLength="150" placeholder="Search mySource" type="search" />
                            <input name="checkboxgcintranet" defaultValue="true" type="hidden" />
                            <input type="hidden" name="pagesize" defaultValue="10" />
                            <input type="hidden" name="page" defaultValue="1" />
                            <input type="hidden" name="language" defaultValue="en" />

                        </div>
                        <div className="form-group submit">
                            <button type="submit" id="wb-srch-sub" className="btn btn-primary btn-small" name="search"><span className="glyphicon-search glyphicon"></span><span className="wb-inv">Search</span></button>
                        </div>
                        </form>
                    </section>
                    </div>
                </div>

                <nav role="navigation" id="wb-sm" data-trgt="mb-pnl" className="wb-menu visible-md visible-lg" typeof="SiteNavigationElement">
                    <script>
                        var _paq = _paq || [];
                    </script>
                    <div className="pnl-strt container nvbar">
                        <h2 className="wb-inv">Menu des sujets</h2>
                        <div className="row">
                        <ul className="wet-list-inline menu" role="menubar">
                            <li> <a className="item" href="#Outilsetressources"> Outils et ressources </a>
                            <ul className="sm list-unstyled" id="Outilsetressources">
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
                                <li className="slflnk"> <a href="https://masource-mysource.spac-pspc.gc.ca/fra/or-tr/">Outils et ressources - Page principale</a> </li>
                            </ul>
                            </li>
                            <li><a href="#Centredesemployes" className="item">Centre des employ&eacute;s</a>
                            <ul className="sm list-unstyled" id="Centredesemployes" role="menu">
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
                                <li className="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/ce-ec.aspx">Centre des employ&eacute;s - Page principale</a></li>
                            </ul>
                            </li>
                            <li><a href="#Centredelagestion" className="item">Centre de la gestion</a>
                            <ul className="sm list-unstyled" id="Centredelagestion" role="menu">
                                <li><a href="http://www.gcpedia.gc.ca/wiki/Communicating_with_the_Pay_Centre,_your_role_and_responsibilities?setlang=fr&amp;uselang=fr">Communiquer avec le centre des services de paye, votre r&ocirc;le et vos responsabilit&eacute;s</a></li>
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/gestionnaires-managers/Pages/default.aspx">Trousse pour les gestionnaires</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/dotation-staffing/pdm-csp-fra.html">Dotation</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/transf/planification-planning-fra.html">Planification de la rel&egrave;ve</a></li>
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/gestionnaires-managers/rend-gstn-perf-mgt/Pages/default.aspx">Gestion du rendement</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/planification-planning/planification-planning-fra.html">Planification des ressources humaines</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/classification/class-org-fra.html">Classification et am&eacute;nagement organisationnel</a></li>
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/accueilorientation-onboardingorientation/Pages/default.aspx">Accueil et orientation</a></li>
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/santesecuritetravail-occupationalhealthsafety/">Sant&eacute; et s&eacute;curit&eacute; au travail</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/travail-labour/rt-lr-fra.html">Relations de travail</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/classification/grie-fra.html">Griefs</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/milieutravail-workplace/travail-labour/harcelement-harassment-fra.html">Harc&egrave;lement</a></li>
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/mieuxetre-wellness/Pages/gstn-conflits-conflict-mgt.aspx">Gestion de conflits</a></li>
                                <li className="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/cg-mc.aspx">Centre de la gestion - Page principale</a></li>
                            </ul>
                            </li>
                            <li><a href="#Apprentissage" className="item">Apprentissage</a>
                            <ul className="sm list-unstyled" id="Apprentissage">
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/accueilorientation-onboardingorientation/Pages/default.aspx">Accueil pour nouveaux employ�s et nouveaux �tudiants</a></li>
                                <li><a href="http://catalogueapprentissage-learningcatalogue.tpsgc-pwgsc.gc.ca/alto.aspx?lang=fra">ALTO</a></li>
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/apprentissage-learning/Pages/default.aspx">Apprentissage</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/rh-hr/carriere-career/gest-car-manag/cntrautoapp-slflrncntr-fra.html">Centre d'apprentissage</a></li>
                                <li><a href="http://catalogueapprentissage-learningcatalogue.tpsgc-pwgsc.gc.ca/lang-language.aspx?lang=fra">Formation linguistique</a></li>
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/rh-hr/carriere-career/leadership-services-gstn-mgt/Pages/default.aspx">Services de gestion de carri�re et de leadership</a></li>
                                <li className="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/a-l.aspx">Apprentissage - Page principale</a></li>
                            </ul>
                            </li>
                            <li><a href="#Services" className="item">Services</a>
                            <ul className="sm list-unstyled" id="Services">
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
                                <li className="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/">Services - Page principale</a></li>
                            </ul>
                            </li>
                            <li><a href="#Regions" className="item">R&eacute;gions</a>
                            <ul className="sm list-unstyled" id="Regions" role="menu">
                                <li><a href="http://breakers-brisants.pwgsc-tpsgc.gc.ca/fra/home-accueil">Atlantique</a></li>
                                <li><a href="http://orion.pwgsc-tpsgc.gc.ca/orion/index-fra.aspx?lang=fra">Ontario</a></li>
                                <li><a href="http://pacific.pwgsc.gc.ca/language">Pacifique</a></li>
                                <li><a href="http://intranet.que.tpsgc.gc.ca/">Qu&eacute;bec</a></li>
                                <li><a href="http://intranet.wst.pwgsc.gc.ca/">Ouest</a></li>
                                <li className="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/eng/Pages/regions.aspx">R&eacute;gions - Page principale</a></li>
                            </ul>
                            </li>
                            <li><a href="#Soutien" className="item">Soutien</a>
                            <ul className="sm list-unstyled" id="Soutien">
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/va-bt.aspx">Voyages d'affaires</a></li>
                                <li><a href="http://dune.pwgsc-tpsgc.gc.ca/fr/installations_securite">Installations et s&eacute;curit&eacute;</a></li>
                                <li><a href="https://masource-mysource.spac-pspc.gc.ca/fra/services/dpi-cio/services/sb-ds/stn-spprt/Pages/soutien-support.aspx">Soutien technique</a></li>
                                <li><a href="http://gcintranet.tpsgc-pwgsc.gc.ca/bt-tb/ministeres-departments/accueil-home-fra.html">Traduction et services linguistiques</a></li>
                                <li><a href="http://intranet.tpsgc-pwgsc.gc.ca/ppc/ps/sc-cms-fra.html">Services de messagerie et de courrier</a></li>
                                <li className="slflnk"><a href="https://masource-mysource.spac-pspc.gc.ca/fra/Pages/soutien-support.aspx">Soutien - More</a></li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <nav role="navigation" id="wb-bc" className="" property="breadcrumb">
                    <h2 className="wb-inv">You are here:</h2>
                    <div className="container">
                        <div className="row">
                        <ol className="breadcrumb">
                            <li> <a href="http://gcintranet.tpsgc-pwgsc.gc.ca/gc/index-eng.html">PSPC GCintranet </a> </li>
                            <li><a href="/gc/services-eng.html">More services</a></li>
                        </ol>
                        </div>
                    </div>
                </nav>
            </>
        }
    </header>
  );
}

export default Header;