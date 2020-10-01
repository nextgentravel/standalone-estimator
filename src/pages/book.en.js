import React, {useState, useEffect} from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Breadcrumbs from '../components/breadcrumb';
import {FaCaretDown} from 'react-icons/fa';
import {FaCaretUp} from 'react-icons/fa';
import {FaArrowAltCircleUp} from 'react-icons/fa';
import {FormattedMessage} from 'react-intl';
import { navigate } from "gatsby"

const BookingPage = () => {
  const jumpToLinks = [{ label: 'Plan Travel', link: '/en/plan' }, { label: 'During Travel', link: '/en/travel' }, { label: 'Submit Expenses', link: '/en/expense' }]
  let faqInitialState = [
    {
      question: 'What happens if the cost of my trip exceeds my previously approved trip estimate?',
      answer: (
        <React.Fragment>
          Depending on your departments set allowances, budget, and your supervisor's discretion, your trip may be booked as expected. Otherwise you may have to re-book.
        </React.Fragment>
      ),
      order: 0,
      collapsed: true,
    },
    {
      question: 'Can I book transportation or accomodation outside of HRG?',
      answer: (
        <React.Fragment>
          No. You must book transporation or accomodation within the HRG system or by contacting HRG directly.

          As an exception, you must book train tickets and car rentals outside of HRG for international travel.
        </React.Fragment>
      ),
      order: 1,
      collapsed: true,
    },
    {
      question: 'Can I book a hotel which falls outside of policy?',
      answer: (
        <React.Fragment>
          Yes. It is possible to book a hotel which is above your city rate limit, as there are many external factors which could contribute to an increased hotel cost. In these cases, a short justification for exceeding the city rate limit is needed to get your hotel choice approved.
        </React.Fragment>
      ),
      order: 2,
      collapsed: true,
    },
    {
      question: 'Are ACRD car rental rates applicable for internationanl travel?',
      answer: (
        <React.Fragment>
          No. ACRD car rental rates are only applicable to domestic travel.
        </React.Fragment>
      ),
      order: 3,
      collapsed: true,
    },
    {
      question: 'Can I get reimbursed for staying in private accomodations?',
      answer: (
        <React.Fragment>
          Yes. If you chose to book private accommodations instead, please include this in the Expense Management Tool as an Out-of-Pocket expense. Do keep in mind that private accommodations are still subject to
          {' '}
          <a href="https://www.njc-cnm.gc.ca/directive/d10/v238/en">
            NJC policy under Appendix D
          </a>
          .
        </React.Fragment>
      ),
      order: 4,
      collapsed: true,
    },
    {
      question: 'What kind of out-of-pocket expenses can I can claim?',
      answer: (
        <React.Fragment>
          For more information related to specific out-of-pocket expenses, please refer to Part III - Travel Modules of the
          {' '}
          <a href="https://www.njc-cnm.gc.ca/directive/d10/v238/en">
            NJC Travel Directive
          </a>
          .
        </React.Fragment>
      ),
      order: 5,
      collapsed: true,
    },
    {
      question: 'Do I need to submit my travel request in HRG even if I am not booking any services through this platform?',
      answer: (
        <React.Fragment>
          Yes. For example if you are using your own car and staying in private accommodations you would still need to submit your travel request.
        </React.Fragment>
      ),
      order: 6,
      collapsed: true,
    },
  ];
  let contentItemsInitialState = [
    {
      name: 'startTravelRequest',
      order: 0,
      collapsed: true,
      display: ['always'],
      header: 'Start a travel request',
      content: (
        <React.Fragment>
          <p>
            Start creating your 'travel request' within HRG.  This step applies no matter where you choose to stay or how you choose to travel to and from your destination.
          </p>
          <ol>
            <li>Login to HRG.</li>
            <li>Access the Online Booking Tool.</li>
            <li>Select who you wish to book travel for.</li>
            <li>Choose the appropriate Travel Directive Module. </li>
          </ol>
          <p>
            To assist you, follow sections
            {' '}
            <em>2. Access the Portal</em>
            {' '}
            and
            {' '}
            <em>3. Access the Online Booking Tool</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
            {' '}
          </p>
          <p>
            <strong>Important:</strong>
            {' '}
            refer to your previously created
            {' '}
            <em>trip estimate</em>
            {' '}
            so that the cost of your trip does not exceed the previously approved amount.
          </p>
        </React.Fragment>
      ),
      sideBar: (
        <React.Fragment>
          <p className="text-center">
            <a
              href="https://isuite6.hrgworldwide.com/gcportal/en-ca/sts.aspx"
              className="btn btn-primary my-4 px-4"
              target="_blank"
            >
              Login to HRG
            </a>
          </p>
        </React.Fragment>
      ),
    },
    {
      name: 'bookYourFlight',
      order: 1,
      collapsed: true,
      display: ['flight'],
      header: 'Book your flight',
      content: (
        <React.Fragment>
          <p>To book your flight:</p>
          <ol>
            <li>
              Select the <em>Flight</em> option within the Online Booking Tool.
            </li>
            <li>Search for flight options by availability.</li>
            <li>
              Choose your desired departure/return flights and proceed with selection.
            </li>
            <li>Review fare rules associated with your selected flights.</li>
            <li>
              Accept the terms and conditions and add flights to your itinerary.
            </li>
            <li>
              Complete trip details only if you have completed all necessary booking.
            </li>
          </ol>

          <p>
            To assist you, follow section
            {' '}
            <em>4. Book Flight</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
          </p>
        </React.Fragment>
      ),
      sideBar: <React.Fragment />,
    },
    {
      name: 'bookYourCarRental',
      order: 2,
      collapsed: true,
      display: ['rentalCar'],
      header: 'Book your car rental',
      content: (
        <React.Fragment>
          <p>
            You must book your car rental through HRG.  To find appropriate rates and approved car rental companies in cities across Canada that has your desired vehicle type, please view the
            {' '}
            <a href="https://rehelv-acrd.tpsgc-pwgsc.gc.ca/ACRDS/rechercher-search-4-eng.aspx">
              Search for car
            </a>
            {' '}
            page. The ACRD also provides you with pre-negotiated rates that you can expect to pay at your city of destination.
          </p>

          <p>To book a car rental:</p>

          <ol>
            <li>
              Select the
              {' '}
              <em>Car Rental</em>
              {' '}
              option within the Online Booking Tool.
            </li>
            <li>
              Search for car rental options.
              {' '}
              <strong>Note:</strong>
              {' '}
              Any additional preferences selected should comply with the ACRD.
            </li>
            <li>Choose desired car and review rate options.</li>
            <li>Select desired rate option.</li>
            <li>
              Review car rental details.
              {' '}
              <strong>Note:</strong>
              {' '}
              Add membership number if applicable.
            </li>
            <li>
              Accept terms and conditions and add car rental to itinerary.
            </li>
            <li>
              Complete trip details only if you have completed all necessary booking.
            </li>
          </ol>

          <p>
            To assist you, follow section
            {' '}
            <em>6. Book Car Rental</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
          </p>
        </React.Fragment>
      ),
      sideBar: <React.Fragment />,
    },
    {
      name: 'bookYourTrain',
      order: 3,
      collapsed: true,
      display: ['train'],
      header: 'Book your train',
      content: (
        <React.Fragment>
          <p>To book your train:</p>

          <ol>
            <li>
              Select the <em>Rail</em> option within the Online Booking Tool.
            </li>
            <li>Search for train options.</li>
            <li>Choose preferred Outbound/Inbound journeys.</li>
            <li>Review Total Cost and Terms and conditions of carriage.</li>
            <li>Accept Terms and conditions of carriage and continue.</li>
            <li>
              Review Inbound/Outbound restrictions and Add train to itinerary.
            </li>
            <li>
              Complete trip details only if you have completed all necessary booking.
            </li>
          </ol>

          <p>
            To assist you, follow section
            {' '}
            <em>7. Book Rail</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
          </p>
        </React.Fragment>
      ),
      sideBar: <React.Fragment />,
    },
    {
      name: 'bookYourHotel',
      order: 4,
      collapsed: true,
      display: ['hotel'],
      header: 'Book your hotel',
      content: (
        <React.Fragment>
          <p>
            Hotel accommodations can be searched and booked through the HRG system with pre-negotiated rates. Booking through HRG is a great option for a fast and simple solution to find and book a hotel that is within policy. To find out what policy allows,
            {' '}
            <a href="/en/rates/">use this tool</a>
            .
          </p>

          <p>
            <strong>Tip:</strong>
            {' '}
            when beginning your search, it may be a good idea to call the hotel directly and speak to a booking member. Be sure to ask about any applicable discounted rates or offers for federal employees which you may be eligible for that are not included in HRG.
          </p>

          <p>To book a hotel:</p>

          <ol>
            <li>Click the <em>Hotel</em> option in the Online Booking Tool.</li>
            <li>Search for hotel options.</li>
            <li>Choose desired hotel and review rate options.</li>
            <li>Select desired room.</li>
            <li>
              Review hotel details.
              {' '}
              <strong>Note</strong>
              add memembership number if applicable.
            </li>
            <li>Review cancellation rules and add hotel to itinerary.</li>
            <li>
              Complete trip details only if you have completed all necessary booking.
            </li>
          </ol>

          <p>
            To assist you, follow section
            {' '}
            <em>5. Book Hotel</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
          </p>
        </React.Fragment>
      ),
      sideBar: <React.Fragment />,
    },
    {
      name: 'paymentMethods',
      order: 5,
      collapsed: true,
      display: ['always'],
      header: 'Payment methods',
      content: (
        <React.Fragment>
          <p>To complete accounting and payment details:</p>

          <ol>
            <li>
              Review the payment information.
              {' '}
              <strong>Note:</strong>
              {' '}
              Modify the personal credit card if required.
            </li>
            <li>Complete the company accounting details page.</li>
            <li>Review travel request details and enter trip name.</li>
            <li>Create the travel request.</li>
          </ol>

          <p>
            To assist you, follow section
            {' '}
            <em>9. Accounting/Payment Details</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
          </p>

          <p>
            <strong>Note:</strong>
            {' '}
            For transportation the Departmental Travel Expense Card (DTEC) should appear as the payment method.  For hotel and car rental you must use your Individual Designated Travel Card (IDTC) or your personal credit card. However, the IDTC card is the preferred method of payment.
          </p>
        </React.Fragment>
      ),
      sideBar: <React.Fragment />,
    },
    {
      name: 'addingAdditionalEstimates',
      order: 6,
      collapsed: true,
      display: ['always', 'private'],
      header: 'Adding additional estimates',
      content: (
        <React.Fragment>
          <p>
            Before your trip is finalized, you must first add all other additional estimates to your Travel Request so that your Approver may view an accurate cost estimate of your trip.  To add additional estimates:
          </p>

          <ol>
            <li>Access the Expense Management Tool (EMT).</li>
            <li>Choose the appropriate expense item.</li>
            <li>Enter the amount and any other necessary details.</li>
            <li>Save all expenses entered once you are finsished.</li>
          </ol>

          <p>
            To assist you, follow section
            {' '}
            <em>
              10. Access the Travel Request in the EMT (Expense Management Tool)
            </em>
            {' '}
            and
            {' '}
            <em>11. Add Additional Estimates</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
          </p>

          <h4>Meals, incidentals & private accommodation</h4>

          <p>
            To assist you in including meals, incidentals & private accomodations expenses, follow section
            {' '}
            <em>12. Add Meals, Incidentals and Private Accomodations</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
          </p>

          <p>
            <strong>Note:</strong>
            {' '}
            If you are not responsible to pay for one or more meals during your time away, please do not include it as an expense. For example: meals that would be included in the airfare or if you are a guest at an event that is providing food.
          </p>
        </React.Fragment>
      ),
      sideBar: <React.Fragment />,
    },
    {
      name: 'submitForApproval',
      order: 7,
      collapsed: true,
      display: ['always'],
      header: 'Submit for approval',
      content: (
        <React.Fragment>
          <p>
            Notify your Supervisor or approver before you submit your travel request, if it is possible. Success rates for bookings are much higher if requests are immediately approved. Delayed approvals can result in having to restart the booking process as rates may fluctuate.
          </p>

          <p>
            To assist you, follow section
            {' '}
            <em>17. Submit for Approval</em>
            {' '}
            within the
            {' '}
            <a href="https://hrg.exceedlms.com/student/activity/220776-en-ug-creating-a-travel-request">
              Creating a travel request
            </a>
            {' '}
            guidebook.
          </p>
        </React.Fragment>
      ),
      sideBar: <React.Fragment />,
    },
  ];

  let [contentItems, setContentItems] = useState (contentItemsInitialState);
  let [faqItems, setFaqItems] = useState (faqInitialState);
  const [flightChecked, setFlightChecked] = useState (false);
  const handleFlightClick = () => setFlightChecked (!flightChecked);

  const [trainChecked, setTrainChecked] = useState (false);
  const handleTrainClick = () => setTrainChecked (!trainChecked);

  const [rentalCarChecked, setRentalCarChecked] = useState (false);
  const handleRentalCarClick = () => setRentalCarChecked (!rentalCarChecked);

  const [
    privateVehicleChecked,
    setPrivateVehicleChecked,
  ] = useState (false);
  const handlePrivateVehicleClick = () =>
    setPrivateVehicleChecked (!privateVehicleChecked);

  const [hotelChecked, setHotelChecked] = useState (false);
  const handleHotelClick = () => {
    setHotelChecked (!hotelChecked);
    setPrivateAccommodationChecked (false);
    setAccommodationNotRequiredChecked (false);
  }

  const [
    privateAccommodationChecked,
    setPrivateAccommodationChecked,
  ] = useState (false);
  const handlePrivateAccommodationClick = () => {
    setPrivateAccommodationChecked (!privateAccommodationChecked);
    setAccommodationNotRequiredChecked (false);
    setHotelChecked (false);
  }
    

  const [
    accommodationNotRequiredChecked,
    setAccommodationNotRequiredChecked,
  ] = useState (false);
  const handleAccommodationNotRequiredClick = () => {
    setAccommodationNotRequiredChecked (!accommodationNotRequiredChecked);
    setPrivateAccommodationChecked (false);
    setHotelChecked (false);
  };

  useEffect (
    () => {
      const filterContent = item => {
        return (
          ((flightChecked ||
            rentalCarChecked ||
            privateVehicleChecked ||
            trainChecked ||
            hotelChecked ||
            privateAccommodationChecked ||
            accommodationNotRequiredChecked) &&
            item.display.includes ('always')) ||
          (flightChecked ? item.display.includes ('flight') : false) ||
          (rentalCarChecked ? item.display.includes ('rentalCar') : false) ||
          (trainChecked ? item.display.includes ('train') : false) ||
          (hotelChecked ? item.display.includes ('hotel') : false) ||
          (privateAccommodationChecked
            ? item.display.includes ('privateAccommodation')
            : false)
        );
      };
      let filtered = contentItemsInitialState.filter (filterContent);
      setContentItems (filtered);
    },
    [
      flightChecked,
      rentalCarChecked,
      privateVehicleChecked,
      trainChecked,
      hotelChecked,
      privateAccommodationChecked,
      accommodationNotRequiredChecked,
    ]
  );

  const toggleAccordian = index => {
    let newArr = [...contentItems];
    newArr[index].collapsed = !contentItems[index].collapsed;
    setContentItems (newArr);
  };

  const toggleFaqAccordian = index => {
    let newArr = [...faqItems];
    newArr[index].collapsed = !faqItems[index].collapsed;
    setFaqItems (newArr);
  };

  const jumpTo = (e) => {
    navigate(
      e.target.value,
      { replace: true }
    )
  }


  return (
    <Layout>
      <SEO title="Book Travel" />
      <w-screen mt-4="true" fluid="true" id="container">
        <div>
          <main id="main-content" role="main">
            <Breadcrumbs pageTitle={'Book Travel'} homeLink={'/en/'} />
            <div className="hero-holder">
              <div className="container">
                <nav className="skiphold" aria-label="sidebar skiplink">
                  <a
                    className="sr-only sr-only-focusable aurora-skip skiplink"
                    id="sidebar-skiplink"
                    href="#sidebar"
                  >
                    <FormattedMessage id="skipToSide" />
                  </a>
                </nav>
                <div className="row mb-4">
                  <div className="col-sm-8"><h2 className="display-5">Book Travel</h2></div>
                  <div className="col-sm-2 ml-auto">
                    <div class="form-group">
                      <select onChange={jumpTo} class="custom-select text-secondary align-middle">
                        <option value="">Jump to...</option>
                        {jumpToLinks.map((item) => {
                          return (
                            <option value={`${item.link}`}>{item.label}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <p className="lead">
                  At this stage you have a
                  {' '}
                  <em>preliminary approval</em>
                  {' '}
                  to travel from your Supervisor and are ready to book your transportation, accommodation, and other services. This guide is applicable only to those departments that currently use the HRG system to book travel.
                </p>
              </div>
            </div>

            <div className="container mt-4">
              <h4>How will you travel?</h4>
              <div className="form-check-inline">
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
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="trainCheck"
                  onClick={handleTrainClick}
                  checked={trainChecked}
                />
                <label className="form-check-label" for="trainCheck">
                  Train
                </label>
              </div>
              <div className="form-check-inline">
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
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="privateVehicleCheck"
                  onClick={handlePrivateVehicleClick}
                  checked={privateVehicleChecked}
                />
                <label
                  className="form-check-label"
                  for="privateVehicleCheck"
                >
                  Private Vehicle
                </label>
              </div>
              <h4>Where will you stay?</h4>
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="privateAccommodationCheck"
                  onClick={handlePrivateAccommodationClick}
                  checked={privateAccommodationChecked}
                />
                <label
                  className="form-check-label"
                  for="privateAccommodationCheck"
                >
                  Private Accommodation
                </label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="hotelCheck"
                  onClick={handleHotelClick}
                  checked={hotelChecked}
                />
                <label className="form-check-label" for="hotelCheck">
                  Hotel
                </label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="accommodationNotRequiredCheck"
                  onClick={handleAccommodationNotRequiredClick}
                  checked={accommodationNotRequiredChecked}
                />
                <label
                  className="form-check-label"
                  for="accommodationNotRequiredCheck"
                >
                  Not Required
                </label>
              </div>
              <div className="row mt-5">
                <article className="content-left col-xs-12 col-sm-12 col-md-12">
                  {contentItems.length === 0 &&
                    <div className="card px-4 pt-4 pb-3 my-4 bg-light">
                      <div className="row">
                        <div className="col-sm-12">
                          <p className="lead">
                            <FaArrowAltCircleUp className="text-secondary mr-3" />
                            Select travel options to view booking instructions
                          </p>
                        </div>
                      </div>
                    </div>}
                  {contentItems.length > 0 &&
                    contentItems.map ((item, index) => {
                      if (!item.display) return;
                      return (
                        <div
                          className={`card px-4 pt-4 pb-3 my-4 ${item.collapsed ? 'bg-light': ''}`}
                          onClick={() => toggleAccordian (index)}
                        >
                          <div className="row">
                            <div className="col-sm-12">
                              <h3 className={`${!item.collapsed ? 'pb-3' : ''}`}>
                                <span className="text-secondary pr-3">
                                  Step {index + 1}
                                </span>
                                {item.header}
                              </h3>
                              {item.collapsed &&
                                <FaCaretDown
                                  style={{
                                    position: 'absolute',
                                    right: 15,
                                    top: 10,
                                  }}
                                />}
                              {!item.collapsed &&
                                <FaCaretUp
                                  style={{
                                    position: 'absolute',
                                    right: 15,
                                    top: 10,
                                  }}
                                  // onClick={() => toggleAccordian (index)}
                                />}
                            </div>
                            {!item.collapsed &&
                              <React.Fragment>
                                <div className="col-sm-8">
                                  {item.content}
                                </div>
                                <div className="col-sm-4">
                                  {item.sideBar}
                                </div>
                              </React.Fragment>}
                            {item.collapsed &&
                              <React.Fragment>
                                <div className="col-sm-12" />
                              </React.Fragment>}
                          </div>
                        </div>
                      );
                    })}
                    <h3 className="pt-5">Frequently Asked Questions</h3>
                    {faqItems.length > 0 &&
                    faqItems.map ((item, index) => {
                      return (
                        <div
                          className="card px-4 pt-4 pb-3 my-4"
                          onClick={() => toggleFaqAccordian (index)}
                        >
                          <div className="row">
                            <div className="col-sm-12">
                              <p className="lead mb-1">
                                {item.question}
                              </p>
                              {item.collapsed &&
                                <FaCaretDown
                                  style={{
                                    position: 'absolute',
                                    right: 15,
                                    top: 10,
                                  }}
                                />}
                              {!item.collapsed &&
                                <FaCaretUp
                                  style={{
                                    position: 'absolute',
                                    right: 15,
                                    top: 10,
                                  }}
                                />}
                            </div>
                            {!item.collapsed &&
                              <React.Fragment>
                                <div className="col-sm-12 mt-2">
                                  {item.answer}
                                </div>
                              </React.Fragment>}
                            {item.collapsed &&
                              <React.Fragment>
                                <div className="col-sm-12" />
                              </React.Fragment>}
                          </div>
                        </div>
                      );
                    })}


                  <p className="text-center">
                    <a
                      href="/en/travel"
                      className="btn btn-primary my-4 px-4 mr-4"
                    >
                      View During Travel
                    </a>
                    <a
                      href="/en/plan"
                      className="btn btn-outline-primary my-4 px-4"
                    >
                      Back to Plan Travel
                    </a>
                  </p>

                </article>
              </div>
            </div>
          </main>
        </div>
      </w-screen>
    </Layout>
  );
};

export default BookingPage;
