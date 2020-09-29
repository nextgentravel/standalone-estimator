import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumbs from "../components/breadcrumb"
import Estimator from "../components/estimator"
import { FaCaretDown } from 'react-icons/fa';
import { FaCaretUp } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

const BookingPage = () => {

    let contentItemsInitialState = [
        {
            name: 'startTravelRequest',
            order: 0,
            collapsed: true,
            display: ['always'],
            header: 'Start a travel request',
            content: <React.Fragment>
                        <p>Start creating your 'travel request' within HRG.  This step applies no matter where you choose to stay or how you choose to travel to and from your destination.</p>
                        <ol>
                            <li>Login to HRG.</li>
                            <li>Access the Online Booking Tool.</li>
                            <li>Select who you wish to book travel for.</li>
                            <li>Choose the appropriate Travel Directive Module. </li>
                        </ol>
                        <p>
                        To assist you, follow sections <em>2. Access the Portal</em> and <em>3. Access the Online Booking Tool</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook. 
                        </p>
                        <p><strong>Important:</strong> refer to your previously created <em>trip estimate</em> so that the cost of your trip does not exceed the previously approved amount.</p>
                    </React.Fragment>,
            sideBar: <React.Fragment>
                        <p class="text-center"><a href="https://isuite6.hrgworldwide.com/gcportal/en-ca/sts.aspx"  class="btn btn-primary my-4 px-4" target="_blank">Login to HRG</a></p>
                    </React.Fragment>,
        },
        {
            name: 'bookYourFlight',
            order: 1,
            collapsed: true,
            display: ['flight'],
            header: 'Book your flight',
            content: <React.Fragment>
                        <p>To book your flight:</p>
                        <ol>
                            <li>Select the <em>Flight</em> option within the Online Booking Tool.</li>
                            <li>Search for flight options by availability.</li>
                            <li>Choose your desired departure/return flights and proceed with selection.</li>
                            <li>Review fare rules associated with your selected flights.</li>
                            <li>Accept the terms and conditions and add flights to your itinerary.</li>
                            <li>Complete trip details only if you have completed all necessary booking.</li>
                        </ol>

                        <p>To assist you, follow section <em>4. Book Flight</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook.
                        </p>
                    </React.Fragment>,
            sideBar: <React.Fragment>
                    </React.Fragment>,
        },
        {
            name: 'bookYourCarRental',
            order: 2,
            collapsed: true,
            display: ['always'],
            header: 'Book your car rental',
            content: <React.Fragment>
                        <p>You must book your car rental through HRG.  To find appropriate rates and approved car rental companies in cities across Canada that has your desired vehicle type, please view the <a href="https://rehelv-acrd.tpsgc-pwgsc.gc.ca/ACRDS/rechercher-search-4-eng.aspx">Search for car</a> page. The ACRD also provides you with pre-negotiated rates that you can expect to pay at your city of destination.</p>

                        <p>To book a car rental:</p>

                        <ol>
                            <li>Select the <em>Car Rental</em> option within the Online Booking Tool.</li>
                            <li>Search for car rental options. <strong>Note:</strong> Any additional preferences selected should comply with the ACRD.</li>
                            <li>Choose desired car and review rate options.</li>
                            <li>Select desired rate option.</li>
                            <li>Review car rental details. <strong>Note:</strong> Add membership number if applicable.</li>
                            <li>Accept terms and conditions and add car rental to itinerary.</li>
                            <li>Complete trip details only if you have completed all necessary booking.</li>
                        </ol>

                        <p>To assist you, follow section <em>6. Book Car Rental</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook.</p>
                    </React.Fragment>,
            sideBar: <React.Fragment>
                    </React.Fragment>,
        },
        {
            name: 'bookYourTrain',
            order: 3,
            collapsed: true,
            display: ['always'],
            header: 'Book your train',
            content: <React.Fragment>
                        <p>To book your train:</p>

                        <ol>
                            <li>Select the <em>Rail</em> option within the Online Booking Tool.</li>
                            <li>Search for train options.</li>
                            <li>Choose preferred Outbound/Inbound journeys.</li>
                            <li>Review Total Cost and Terms and conditions of carriage.</li>
                            <li>Accept Terms and conditions of carriage and continue.</li>
                            <li>Review Inbound/Outbound restrictions and Add train to itinerary.</li>
                            <li>Complete trip details only if you have completed all necessary booking.</li>
                        </ol>

                        <p>To assist you, follow section <em>7. Book Rail</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook.</p>
                    </React.Fragment>,
            sideBar: <React.Fragment>
                    </React.Fragment>,
        },
        {
            name: 'bookYourHotel',
            order: 4,
            collapsed: true,
            display: ['always'],
            header: 'Book your hotel',
            content: <React.Fragment>
                        <p>Hotel accommodations can be searched and booked through the HRG system with pre-negotiated rates. Booking through HRG is a great option for a fast and simple solution to find and book a hotel that is within policy. To find out what policy allows, <a href="/en/rates/">use this tool</a>.</p>

                        <p><strong>Tip:</strong> when beginning your search, it may be a good idea to call the hotel directly and speak to a booking member. Be sure to ask about any applicable discounted rates or offers for federal employees which you may be eligible for that are not included in HRG.</p>

                        <p>To book a hotel:</p>

                        <ol>
                            <li>Click the <em>Hotel</em> option in the Online Booking Tool.</li>
                            <li>Search for hotel options.</li>
                            <li>Choose desired hotel and review rate options.</li>
                            <li>Select desired room.</li>
                            <li>Review hotel details. <strong>Note</strong>add memembership number if applicable.</li>
                            <li>Review cancellation rules and add hotel to itinerary.</li>
                            <li>Complete trip details only if you have completed all necessary booking.</li>
                        </ol>

                        <p>To assist you, follow section <em>5. Book Hotel</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook.</p>
                    </React.Fragment>,
            sideBar: <React.Fragment>
                    </React.Fragment>,
        },
        {
            name: 'paymentMethods',
            order: 5,
            collapsed: true,
            display: ['always'],
            header: 'Payment methods',
            content: <React.Fragment>
                        <p>To complete accounting and payment details:</p>

                        <ol>
                        <li>Review the payment information.  <strong>Note:</strong> Modify the personal credit card if required.</li>
                        <li>Complete the company accounting details page.</li>
                        <li>Review travel request details and enter trip name.</li>
                        <li>Create the travel request.</li>
                        </ol>

                        <p>To assist you, follow section <em>9. Accounting/Payment Details</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook.</p>

                        <p><strong>Note:</strong> For transportation the Departmental Travel Expense Card (DTEC) should appear as the payment method.  For hotel and car rental you must use your Individual Designated Travel Card (IDTC) or your personal credit card. However, the IDTC card is the preferred method of payment.</p>
                    </React.Fragment>,
            sideBar: <React.Fragment>
                    </React.Fragment>,
        },
        {
            name: 'addingAdditionalEstimates',
            order: 6,
            collapsed: true,
            display: ['always'],
            header: 'Adding additional estimates',
            content: <React.Fragment>
                        <p>Before your trip is finalized, you must first add all other additional estimates to your Travel Request so that your Approver may view an accurate cost estimate of your trip.  To add additional estimates:</p>

                        <ol>
                        <li>Access the Expense Management Tool (EMT).</li>
                        <li>Choose the appropriate expense item.</li>
                        <li>Enter the amount and any other necessary details.</li>
                        <li>Save all expenses entered once you are finsished.</li>
                        </ol>

                        <p>To assist you, follow section <em>10. Access the Travel Request in the EMT (Expense Management Tool)</em> and <em>11. Add Additional Estimates</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook.</p>

                        <h4>Meals, incidentals & private accommodation</h4>

                        <p>To assist you in including meals, incidentals & private accomodations expenses, follow section <em>12. Add Meals, Incidentals and Private Accomodations</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook.</p>

                        <p><strong>Note:</strong> If you are not responsible to pay for one or more meals during your time away, please do not include it as an expense. For example: meals that would be included in the airfare or if you are a guest at an event that is providing food.</p>
                    </React.Fragment>,
            sideBar: <React.Fragment>
                    </React.Fragment>,
        },
        {
            name: 'submitForApproval',
            order: 7,
            collapsed: true,
            display: ['always'],
            header: 'Submit for approval',
            content: <React.Fragment>
                        <p>Notify your Supervisor or approver before you submit your travel request, if it is possible. Success rates for bookings are much higher if requests are immediately approved. Delayed approvals can result in having to restart the booking process as rates may fluctuate.</p>

                        <p>To assist you, follow section <em>17. Submit for Approval</em> within the <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">Creating a travel request</a> guidebook.</p>
                    </React.Fragment>,
            sideBar: <React.Fragment>
                    </React.Fragment>,
        },
    ]

    let [contentItems, setContentItems] = useState(contentItemsInitialState);

    const [flightChecked, setFlightChecked] = useState(false)
    const handleFlightClick = () => setFlightChecked(!flightChecked)

    useEffect(() => {
        const filterContent = (item) => {
            console.log('Always?', item.display.includes('always'))
            console.log('Flight?', item.display.includes('flight'))
            console.log('Result?', item.display.includes('always') || item.display.includes('flight'))
            console.log('##############')
            return item.display.includes('always') || (flightChecked ? item.display.includes('flight') : !item.display.includes('flight'))
        }
        let filtered = contentItemsInitialState.filter(filterContent);
        setContentItems(filtered)
    }, [flightChecked]);

    const [rentalCarChecked, setRentalCarChecked] = useState(false)
    const handleRentalCarClick = () => setRentalCarChecked(!rentalCarChecked)

    const toggleAccordian = (index) => {
        let newArr = [...contentItems];
        newArr[index].collapsed = !contentItems[index].collapsed; 
        setContentItems(newArr);
    }

    return (
    <Layout>
      <SEO title="Estimator" />
      <w-screen mt-4="true" fluid="true" id="container">
        <div>
          <main id="main-content" role="main">
            <Breadcrumbs pageTitle={'Book Travel'} homeLink={'/en/'} />
            <div className="hero-holder">
            <div className="container">
                <nav className="skiphold" aria-label="sidebar skiplink"><a className="sr-only sr-only-focusable aurora-skip skiplink" id="sidebar-skiplink" href="#sidebar"><FormattedMessage id="skipToSide"/></a></nav>
                <h2 className="display-5">Test</h2>
                <p className="lead">
                    Test
                </p>
                </div>
            </div>


            <div className="container mt-4">
            <div className="form-check">
                <input 
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flightCheck"
                    onClick={handleFlightClick}
                    checked={flightChecked}
                />
                <label className="form-check-label" for="flightCheck">
                    Flight
                </label>
            </div>
            <div className="form-check">
                <input 
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rentalCarCheck"
                    onClick={handleRentalCarClick}
                    checked={rentalCarChecked}
                />
                <label className="form-check-label" for="rentalCarCheck">
                    Rental Car
                </label>
            </div>
            <div className="form-check">
                <input 
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rentalCarCheck"
                    onClick={handleRentalCarClick}
                    checked={rentalCarChecked}
                />
                <label className="form-check-label" for="rentalCarCheck">
                    Rental Car
                </label>
            </div>

<article class="content-left col-xs-12 col-sm-12 col-md-12">

    {contentItems.map((item, index) => {
        if (!item.display) return;
        return (
            <div class="card px-4 pt-4 pb-3 my-4 bg-light">
                <div class="row">
                    <div class="col-sm-12">                    
                        <h3><span className="text-secondary pr-3">Step {index + 1}</span>{item.header}</h3>
                        {item.collapsed &&
                            <FaCaretDown
                                style={{ position: 'absolute', right: 15, top: 10 }}
                                onClick={() => toggleAccordian(index)}
                            />
                        }
                        {!item.collapsed &&
                            <FaCaretUp
                                style={{ position: 'absolute', right: 15, top: 10 }}
                                onClick={() => toggleAccordian(index)}
                            />
                        }
                    </div>
                    {!item.collapsed &&
                        <>
                            <div class="col-sm-8">
                                {item.content}
                            </div>
                            <div class="col-sm-4">
                                {item.sideBar}
                            </div>
                        </>
                    }
                    {item.collapsed &&
                        <>
                            <div class="col-sm-12">                    
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    })}

<div class="card p-4 my-4 bg-light">
    <div class="row">
        <div class="col-sm-8">

<h3>FAQ</h3>

<p><strong>1. What happens if the cost of my trip exceeds my previously approved trip estimate?</strong></p>

<p><p><strong>2. Can I book transportation or accomodation outside of HRG?</strong></p></p>

<p>No.  You must book transporation or accomodation within the HRG system or by contacting HRG directly.</p>

<p>As an exception, you must book train tickets and car rentals outside of HRG for international travel. </p>

<p><strong>3. Can I book a hotel which falls outside of policy?</strong></p>

<p>Yes.  It is possible to book a hotel which is above your city rate limit, as there are many external factors which could contribute to an increased hotel cost. In these cases, a justification for exceeding the city rate limit is needed to get your hotel choice approved.</p>

<p><strong>4. Are ACRD car rental rates applicable for internationanl travel?</strong></p>

<p>No.  ACRD car rental rates are only applicable to domestic travel.</p>

<p><strong>5. Can I get reimbursed for staying in private accomodations?</strong></p>

<p>Yes.  If you chose to book private accommodations instead, please include this in the Expense Management Tool as an Out-of-Pocket expense. Do keep in mind that private accommodations are still subject to <a href="https://www.njc-cnm.gc.ca/directive/app_d/en">NJC policy under Appendix D</a>.</p>

<p><strong>6. What kind of out-of-pocket expenses can I can claim?</strong></p>

<p>For more information related to specific out-of-pocket expenses, please refer to Part III - Travel Modules of the <a href="https://www.njc-cnm.gc.ca/directive/d10/v238/en">NJC Travel Directive</a>.</p>

<p><strong>7. Do I need to submit my travel request in HRG even if I am not booking any services through this platform?</strong></p>

<p>Yes.  For example if you are using your own car and staying in private accommodations you would still need to submit your travel request.</p>

</div>
        <div class="col-sm-4">

        </div>
    </div>
</div>


<p class="text-center">
    <a href="/en/travel" class="btn btn-outline-primary my-4 px-4">Continue to Travel</a>
</p>

</article>
            </div>
          </main>
        </div>
      </w-screen>
    </Layout>
  )
}

export default BookingPage;

