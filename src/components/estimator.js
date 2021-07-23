import React, {useState, useEffect, useRef} from "react"
import { useStaticQuery, graphql } from "gatsby"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
import calculateMeals from "./calculate-meals.js"
import { DateTime, Interval, Info } from "luxon"
import * as yup from "yup"
import monthsContained from "./months-contained.js"
import { useIntl } from 'react-intl'
import EstimatorRow from "./estimator-row.js"
import EmailModal from "./email-modal.js"
import EmailConfirmationModal from "./email-confirmation-modal.js"
import MealsModal from "./meals-modal.js"
import FlightModal from "./flight-modal.js"

import { FaCaretUp, FaCaretDown, FaCalculator, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { dailyMealTemplate } from "./functions/dailyMealTemplate"

import 'unorm';

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import cities from "../data/cities.js"
import geocodedCities from "../data/geocodedCities"
import acrdRates from "../data/acrdRates.js"
import locations from "../data/locations.js"

import { FaSpinner, FaQuestionCircle, FaExclamationTriangle, FaBed, FaPlane, FaTaxi, FaUtensils, FaSuitcase } from 'react-icons/fa'

import amadeusFlightOffer from '../api-calls/amadeusFlightOffer'
import fetchDistanceBetweenPlaces from '../api-calls/fetchDistanceBetweenPlaces'

import './extra/estimator-print.css'

let initialDeparture = null
let initialReturn = null

const ConditionalWrap = ({ condition, wrap, children }) => (
    condition ? wrap(children) : children
);

const Estimator = () => {
    const intl = useIntl();
    const summaryView = useRef(null)
    const executeScroll = () => summaryView.current.scrollIntoView()    

    let locale = `${intl.locale}-ca`;

    const localCurrencyDisplay = (string) => {
        return string.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'CAD',
            currencyDisplay: 'symbol'
        }).replace('CA', '').replace(/\D00(?=\D*$)/, '')
    }

    const cmsData = useStaticQuery(graphql`
    query cmsData {
        allPrismicStandaloneestimatorCopy {
            nodes {
                lang
                data {
                    disclaimer_body {
                        html
                    }
                    enter_travel_info_above
                    explainer_body {
                        html
                    }
                    explainer_title {
                        text
                    }
                    lead {
                        html
                    }
                    title {
                        text
                    }
                    flight_below_estimate {
                        html
                    }
                    flight_error {
                        html
                    }
                    flight_loading {
                        html
                    }
                    flight_success {
                        html
                    }
                    flight_no_results {
                        html
                    }
                    flight_no_results_custom {
                        html
                    }
                    flight_zero {
                        html
                    }
                    hotel_above_estimate {
                        html
                    }
                    hotel_below_estimate {
                        html
                    }
                    hotel_error {
                        html
                    }
                    hotel_success {
                        html
                    }
                    hotel_zero {
                        html
                    }
                    local_tranportation_zero {
                        html
                    }
                    local_transportation_manual {
                        html
                    }
                    local_transportation_success {
                        html
                    }
                    private_accom_estimate_success {
                        html
                    }
                    private_accom_estimate_zero {
                        html
                    }
                    private_vehicle_above_estimate {
                        html
                    }
                    private_vehicle_below_estimate {
                        html
                    }
                    private_vehicle_error {
                        html
                    }
                    private_vehicle_manual {
                        html
                    }
                    private_vehicle_success {
                        html
                    }
                    rental_car_error {
                        html
                    }
                    rental_car_success {
                        html
                    }
                    rental_car_zero {
                        html
                    }
                    return_date_earlier_than_departure_date {
                        html
                    }
                    train_above_estimate {
                        html
                    }
                    train_below_estimate {
                        html
                    }
                    train_error {
                        html
                    }
                    train_success {
                        html
                    }
                    train_zero {
                        html
                    }
                    other_tooltip_text
                    estimate_destination
                    estimate
                    clear
                    estimate_summary_title
                    accommodation
                    hotel
                    private
                    transportation
                    flight
                    train
                    rental
                    not_required
                    local_transportation
                    meals_and_incidentals
                    other_allowances
                    total_cost
                    email
                    estimate_origin
                    disclaimer
                    date_picker_label
                    screen_reader_input_message
                    other_allowances_message
                    could_not_fetch_flight_value
                    could_not_fetch_you_have_entered_own
                    email_confirm_success_title
                    email_confirm_error_title
                    email_confirm_success_body
                    email_confirm_error_body
                    email_confirm_back_button
                    email_confirm_new_estimate_button
                    email_form_trip_name
                    email_form_trip_name_placeholder
                    email_form_travellers_name
                    email_form_travellers_name_placeholder
                    email_form_travellers_email
                    email_form_travellers_email_placeholder
                    email_form_approvers_name
                    email_form_approvers_name_placeholder
                    email_form_approvers_email
                    email_form_approvers_email_placeholder
                    email_form_notes
                    email_form_notes_placeholder
                    email_form_is_public_servant_checkbox_label
                    email_form_category_label
                    email_form_category_options {
                        option_label
                        option_value
                    }
                    email_form_field_required
                    email_modal_title
                    email_modal_submit
                    meals_modal_title
                    email_form_disclaimer {
                        html
                    }
                    meals_modal_breakfast
                    meals_modal_lunch
                    meals_modal_dinner
                    meals_modal_incidental
                    meals_modal_submit
                    select_meals_link
                    email_confirm_error_title
                    accommodation_tooltip
                    estimate_error_title
                    estimate_error_lead
                    estimate_origin_city_not_valid
                    estimate_destination_city_not_valid
                    flight_message_no_airport {
                        html
                    }
                    private_vehicle
                    no_time_travel
                    estimate_departure_date_not_valid
                    estimate_return_date_not_valid
                    transportation_above_flight_estimate {
                        html
                    }
                    date_picker_label
                    datepicker_calendar_label
                    datepicker_role_description
                    datepicker_close
                    date_picker_focus_start_date
                    datepicker_clear_date
                    datepicker_clear_dates
                    datepicker_jump_to_prev_month
                    datepicker_jump_to_next_month
                    datepicker_keyboard_shortcuts
                    datepicker_showkeyboard_shortcuts_panel
                    datepicker_hide_keyboard_shortcuts_panel
                    datepicker_open_this_panel
                    datepicker_enter_key
                    datepicker_left_arrow_right_arrow
                    datepicker_up_arrow_down_arrow
                    datepicker_page_up_page_down
                    datepicker_home_end
                    datepicker_escape
                    datepicker_question_mark
                    datepicker_select_focused_date
                    datepicker_move_focus_by_one_day
                    datepicker_move_focus_by_one_week
                    datepicker_move_focus_by_one_month
                    datepicker_move_focus_to_start_and_end_of_week
                    datepicker_return_focus_to_input
                    datepicker_keyboard_forward_navigation_instructions
                    datepicker_keyboard_backward_navigation_instructions
                    datepicker_choose_available_start_date
                    datepicker_choose_available_end_date
                    datepicker_date_is_unavailable
                    datepicker_date_is_selected
                    datepicker_date_is_selected_as_start_date
                    datepicker_date_is_selected_as_end_date
                    datepicker_start_date
                    datepicker_end_date
                    flight_estimate_your_fare_link
                    flight_modal_header
                    flight_modal_origin_airport_label
                    flight_modal_departure_time_label
                    flight_modal_destination_airport_label
                    flight_modal_return_time_label
                    flight_modal_fetch_flight_estimate_label
                    flight_modal_result_header
                    flight_modal_label_minimum
                    flight_modal_label_maximum
                    flight_modal_label_median
                    flight_modal_note_disclaimer {
                        html
                    }
                    flight_modal_use_in_estimate_button_label
                    flight_modal_close_button_label
                    flight_modal_leaving_header
                    flight_modal_return_header
                    flight_modal_initial_instructions {
                        html
                    }
                    flight_modal_zero_results
                    flight_modal_api_error
                    flight_selected_fare
                    flight_selected_fare_preselected
                    flight_regenerate_estimate
                    select
                    private_vehicle_enter_distance_manually
                    flight_custom_fare_entered
                    transportation_select_message
                    accommodation_select_message
                    email_field_disabled_message {
                        html
                    }
                    email_form_trip_name_helptext
                    email_form_notes_helptext
                }
            }
        }

    }`);

    let localeCopy = cmsData.allPrismicStandaloneestimatorCopy.nodes.find(function(o){ return o.lang === locale }).data;

    function formattedMessage(prismicKey, classes) {
        let messageType = typeof localeCopy[prismicKey]
        let message;
        if (messageType === 'string') {
            message = localeCopy[prismicKey]
        } else if (messageType === 'object' && localeCopy[prismicKey] !== null) {
            message = <span className={classes} dangerouslySetInnerHTML={{ __html: localeCopy[prismicKey].html }}></span>
        } else {
            message = 'MISSING MESSAGE ' + prismicKey
        }
        return message
    }

    let initialTransportationMessage = { element: <span></span>, style: 'primary' };

    const [explainerCollapsed, setExplainerCollapsed] = useState(true);

    const citiesList = cities.citiesList;
    const [filteredCitiesList, setFilteredCitiesList] = useState([]);

    useEffect(() => {
        let list = []
        for (let city in geocodedCities) {
            let province = geocodedCities[city].acrdName.slice(-2)
            let cityName = geocodedCities[city].acrdName.slice(0, -3)
            let display = `${cityName}, ${province}`

            list.push({
                id: geocodedCities[city].google_place_id,
                label: display,
                type: 'city',
                searchTerm: `${display}`,
                acrdName: geocodedCities[city].acrdName,
                provinceCode: province,
                cityName: cityName,
                iataCode: geocodedCities[city].airports.length > 0 ? geocodedCities[city].airports[0].iataCode : null,
                cityCode: geocodedCities[city].airports.length > 0 ? geocodedCities[city].airports[0].address.cityCode: null,
                airports: geocodedCities[city].airports,
            })
        }
        setFilteredCitiesList(list);
        removeActiveDescendantAttr()
    }, []);

    const removeActiveDescendantAttr = () => {
        const originInput = document.querySelector('#autocomplete-origin');
        originInput && originInput.setAttribute("aria-activedescendant", "");
        const destinationInput = document.querySelector('#autocomplete-destination');
        destinationInput && destinationInput.setAttribute("aria-activedescendant", "");
    };

    let initialDates = {
        departure: initialDeparture,
        return: initialReturn,
    }

    // Variables/state for inputs
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});

    const [departureDate, setDepartureDate] = useState(initialDates.departure);
    const [returnDate, setReturnDate] = useState(initialDates.return);

    const convertToLux = (date) => {
        return DateTime.fromISO(date.format("YYYY-MM-DD"))
    }

    const [departureDateLux, setDepartureDateLux] = useState(null);
    const [returnDateLux, setReturnDateLux] = useState(null);

    const [privateVehicleRate, setPrivateVehicleRate] = useState('');
    const [privateVehicleSuccess, setPrivateVehicleSuccess] = useState(false);
    const [showClear, setShowClear] = useState(false);
    const [disclaimerCollapsed, setDisclaimerCollapsed] = useState(true);

    // Flight modal vars

    const [originAirportCode, setOriginAirportCode] = useState('');
    const [destinationAirportCode, setDestinationAirportCode] = useState('');
    const [departureTime, setDepartureTime] = useState('07:00');
    const [returnTime, setReturnTime] = useState('17:00');
    const [departureOffset, setDepartureOffset] = useState(2);
    const [returnOffset, setReturnOffset] = useState(2);

    useEffect(() => {
        if (departureDate !== null) {
            setDepartureDateLux(convertToLux(departureDate))
        }
    }, [departureDate])

    useEffect(() => {
        if (returnDate !== null) {
            setReturnDateLux(convertToLux(returnDate))
        }
    }, [returnDate])

    useEffect(() => {
        setResult(false);
        setTransportationEstimates(transportationEstimatesInitialState);
        updateTransportationCost(0.00);
        setTransportationMessage(initialTransportationMessage)
        setEnterKilometricsDistanceManually(false)
        setPrivateVehicleSuccess(false)
        if (departureDate !== initialDates.departure || returnDate !== initialDates.return || origin !== '' || destination !== '') {
            setShowClear(true);
        } else {
            setShowClear(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [origin, destination, departureDate, returnDate])

    useEffect((() => {
        if (Object.keys(origin).length !== 0) {
            let provinceRate = locations[origin.provinceCode].rateCents
            setPrivateVehicleRate(provinceRate);
        }
        setOriginAirportCode(origin.airports && origin.airports.length !== 0 ? origin.airports[0].iataCode : '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [origin])

    useEffect((() => {
        setDestinationAirportCode(destination.airports && destination.airports.length !== 0 ? destination.airports[0].iataCode : '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [destination])

    const [accommodationType, setAccommodationType] = useState('');
    const [transportationType, setTransportationType] = useState('');

    const [submitValidationWarnings, setSubmitValidationWarnings] = useState([]);
    const [emailValidationWarnings, setEmailValidationWarnings] = useState([]);
    const [flightValidationWarnings, setFlightValidationWarnings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [errorPanel, setErrorPanel] = useState(false);

    const [accommodationCost, setAccommodationCost] = useState(0.00);
    const [acrdTotal, setAcrdTotal] = useState(0.00);
    const [accommodationMessage, setAccommodationMessage] = useState({ element: <span></span>, style: 'primary' });
    const [transportationMessage, setTransportationMessage] = useState(initialTransportationMessage);
    const [localTransportationMessage, setLocalTransportationMessage] = useState({ element: <span></span>, style: 'primary' });
    const [transportationCost, setTransportationCost] = useState(0.00);
    const [localTransportationCost, setLocalTransportationCost] = useState(0.00);
    const [mealCost, setMealCost] = useState({ total: 0.00 });
    const [otherCost, setOtherCost] = useState(0.00);
    const [summaryCost, setSummaryCost] = useState(0.00);
    const [enterKilometricsDistanceManually, setEnterKilometricsDistanceManually] = useState(false)
    const [privateKilometricsValue, setPrivateKilometricsValue] = useState(0);
    const [returnDistance, setReturnDistance] = useState('');

    const [localTransportationEstimate, setLocalTransportationEstimate] = useState(0);

    const [mealsByDay, setMealsByDay] = useState({});
    const [province, setProvince] = useState('');
    const [applicableRates, setApplicableRates] = useState([]);

    const [emailModalShow, setEmailModalShow] = useState(false);
    const [emailRequestLoading, setEmailRequestLoading] = useState(false);
    const [emailConfirmationModalShow, setEmailConfirmationModalShow] = useState(false);
    const [emailRequestResult, setEmailRequestResult] = useState({});

    const [tripName, setTripName] = useState('');
    const [travellersName, setTravellersName] = useState('');
    const [travellersEmail, setTravellersEmail] = useState('');
    const [approversName, setApproversName] = useState('');
    const [approversEmail, setApproversEmail] = useState('');
    const [tripNotes, setTripNotes] = useState('');
    const [travellerIsPublicServant, setTravellerIsPublicServant] = useState(true);
    const [travelCategory, setTravelCategory] = useState('');

    const transportationEstimatesInitialState = {
        flight: {
            estimatedValue: 0,
            responseBody: '',
            estimatedValueMessage: <></>,
        },
        train: {
            estimatedValue: 0,
            responseBody: '',
            estimatedValueMessage: <></>,
        },
        rentalCar: {
            estimatedValue: 0,
            responseBody: '',
            estimatedValueMessage: <></>,
        },
        privateVehicle: {
            estimatedValue: 0,
            responseBody: '',
            estimatedValueMessage: <></>,
        }
    }

    const [transportationEstimates, setTransportationEstimates] = useState(transportationEstimatesInitialState);

    function displayTransportationMessage() {
        let calculateKilometrics = privateKilometricsValue * (privateVehicleRate / 100);
        if (privateVehicleSuccess && privateKilometricsValue === (returnDistance / 1000).toFixed(2)) {
            let message = '';
            message = localeCopy.private_vehicle_success.html.replace('{rate}', `<strong>${privateVehicleRate}</strong>`)
            message = message.replace('{distance}', `<strong>${(returnDistance / 1000).toFixed(0)}</strong>`)
            setTransportationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span> })
        } else if (enterKilometricsDistanceManually) {
            let message = '';
            message = localeCopy.private_vehicle_manual.html.replace('{rate}', `<strong>${privateVehicleRate}</strong>`)
            message = message.replace('{distance}', `<strong>${parseInt(privateKilometricsValue)}</strong>`)
            setTransportationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span> })
        } else if (!privateVehicleSuccess) {
            setTransportationMessage({ element: <span className="transportation-message alert-warning" role="alert" dangerouslySetInnerHTML={{ __html: localeCopy.private_vehicle_error.html }}></span> })
        }
        return calculateKilometrics;
    }

    useEffect(() => {
        if (result) {
            let calculateKilometrics = displayTransportationMessage();
            setTransportationCost(calculateKilometrics.toFixed(2))
            setTransportationEstimates({
                ...transportationEstimates,
                rentalCar: {
                    estimatedValue: calculateKilometrics,
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [privateKilometricsValue])

    useEffect(() => {
        calculateTotal()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accommodationCost, transportationCost, localTransportationCost, mealCost, otherCost])

    useEffect(() => {
        let mealTotals = calculateMeals(mealsByDay, province)
        setMealCost(mealTotals)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mealsByDay]);

    const [mealsModalShow, setMealsModalShow] = React.useState(false);

    const [flightModalShow, setFlightModalShow] = React.useState(false);

    let handleMealsModalShow = (e) => {
        e.preventDefault()
        setMealsModalShow(true)
    };

    let handleFlightModalShow = (e) => {
        e.preventDefault()
        setFlightModalShow(true)
    };

    let [selectedFlightPrice, setSelectedFlightPrice] = useState(0.00);
    let [flightResult, setFlightResult] = useState({});
    let [initialFlightResult, setInitialFlightResult] = useState(1.11);
    let [acceptedFlight, setAcceptedFlight] = useState(0.00);

    useEffect(() => {
        updateAccommodationCost(0.00)
        updateTransportationCost(0.00)
        updateLocalTransportationCost(0.00)
        updateMealCost(0.00)
        updateOtherCost(0.00)
    }, [])

    const fetchHotelCost = () => {
        let months = monthsContained(departureDate.format("YYYY-MM-DD"), returnDate.format("YYYY-MM-DD"));
        let rates = acrdRates[destination.acrdName];
        if (!rates) {
            rates = acrdRates[cities.suburbCityList[destination.acrdName]]
        }
        
        let acrdRatesFiltered = Object.keys(rates)
            .filter(key => months.map(mon => mon.month).includes(key))
            .reduce((res, key) => {
                res[key] = rates[key];
                return res;
            }, {});

        try {
            let rates = rateDaysByMonth(departureDateLux, returnDateLux, acrdRatesFiltered)

            let total = 0.00;

            let calculatedApplicableRates = []

            for (const month in rates) {
                total = total + rates[month].monthTotal
                calculatedApplicableRates.push({
                    month: month,
                    rate: rates[month].rate
                })
            }

            setApplicableRates(calculatedApplicableRates)

            setAcrdTotal(total);

            // eslint-disable-next-line no-template-curly-in-string



            // message = message.replace('{location}', `<strong>${destinationDisplay}</strong>`)
            // eslint-disable-next-line no-template-curly-in-string
            // message = message.replace('{daily rate}', `<strong>${localCurrencyDisplay(calculatedApplicableRates[0].rate)}</strong>`)
            // setAccommodationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span> })
        } catch (error) {
            console.log('fetchHotelCostError', error);
        }
    }

    const fetchLocalTransportationRate = (numberOfDays) => {
        let cost = 100 + 50 * (numberOfDays)
        setLocalTransportationEstimate(cost);
        updateLocalTransportationCost(cost)
        setLocalTransportationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.local_transportation_success.html }}></span>  })
    }

    useEffect(() => {
        if (accommodationType === 'hotel') {
            let province = destination.provinceCode
            let cityName = destination.cityName
            let destinationDisplay = `${cityName}, ${province}`

            let message = localeCopy.hotel_success.html
            fetchHotelCost()
            message = message.replace('{location}', `<strong>${destinationDisplay}</strong>`)
            // eslint-disable-next-line no-template-curly-in-string
            message = message.replace('{daily rate}', `<strong>${localCurrencyDisplay(applicableRates[0].rate)}</strong>`)
            setAccommodationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span> })
            updateAccommodationCost(acrdTotal)
        } else if (accommodationType === 'private') {
            let rate = (Interval.fromDateTimes(departureDateLux, returnDateLux).count('days') - 1) * 50;
            setAccommodationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.private_accom_estimate_success.html }}></span>  })
            updateAccommodationCost(rate)
        } else if (accommodationType === 'notrequired') {
            let rate = (Interval.fromDateTimes(departureDateLux, returnDateLux).count('days') - 1) * 50;
            setAccommodationMessage({ element: <span className="transportation-message"></span>  })
            updateAccommodationCost(0.00);
        } else if (result) {
            setAccommodationMessage({ element: <span className="transportation-message">{formattedMessage('transportation_select_message')}</span>  })
            updateAccommodationCost(0.00)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accommodationType])

    const [haveFlightCost, setHaveFlightCost] = useState(false)

    const fetchFlightCost = async (originAirportCode, destinationAirportCode, departureTime, returnTime, departureOffset, returnOffset) => {
        return new Promise(resolve => {
            const departureDateISODate = departureDate.format("YYYY-MM-DD")
            const returnDateISODate = returnDate.format("YYYY-MM-DD")
    
            if (origin.cityCode !== null && destination.cityCode !== null) {
                amadeusFlightOffer(originAirportCode, destinationAirportCode, departureDateISODate, returnDateISODate, departureTime, returnTime, departureOffset, returnOffset)
                .then(response => response.json())
                .then(result => {
                    // let date = DateTime.local().toFormat("yyyy-MM-dd");
                    // let time = DateTime.local().toFormat("hh:mm a")
                    resolve(result);
                    // if (result.numberOfResults === 0) {
                    //     localeCopy.flight_no_results.html = localeCopy.flight_no_results.html.replace('{date}', `<strong>${date}</strong>`)    
                    //     let FlightMessage = <span className="transportation-message alert-warning" role="alert" dangerouslySetInnerHTML={{ __html: localeCopy.flight_no_results.html }}></span>
                    //     updateTransportationCost(0.00);
                    //     setTransportationEstimates({
                    //         ...transportationEstimates,
                    //         flight: {
                    //             estimatedValue: 0,
                    //             estimatedValueMessage: FlightMessage,
                    //             responseBody: result,
                    //         }
                    //     })
                    //     setTransportationMessage({ element: FlightMessage  })
                    //     setHaveFlightCost(true);
                    //     resolve(result);
                    // } else {        
                    //     localeCopy.flight_success.html = localeCopy.flight_success.html.replace('{date}', `<strong>${date}</strong>`)
                    //     localeCopy.flight_success.html = localeCopy.flight_success.html.replace('{time}', `<strong>${time}</strong>`)
        
                    //     let FlightMessage = <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.flight_success.html }}></span>
                        
                    //     setTransportationEstimates({
                    //         ...transportationEstimates,
                    //         flight: {
                    //             estimatedValue: result.flightEstimate,
                    //             estimatedValueMessage: FlightMessage,
                    //             responseBody: result,
                    //         }
                    //     })
                    //     setTransportationMessage({ element: FlightMessage  })
                    //     setHaveFlightCost(true);
                    //     resolve(result);
                    // }
                })
                .catch(error => {
                    console.log('amadeus flight offer error', error);
                    // updateTransportationCost(0.00);
                    // setTransportationMessage({ element: <span className="transportation-message alert-warning" role="alert" dangerouslySetInnerHTML={{ __html: localeCopy.flight_error.html }}></span>  })
                    resolve(error);
                });
            } else {
                setLoading(false);
                // setTransportationMessage({ element: <span className="transportation-message alert-warning" role="alert">{formattedMessage('flight_message_no_airport')}</span>  })
                resolve('no airport');
            }
        });
    }

    useEffect(() => {
        if (transportationType === 'flight') {
            setTransportationMessage({
                element: <a href="/" onClick={(e) => {handleFlightModalShow(e)}}>{formattedMessage('flight_estimate_your_fare_link')}</a>
            });
            updateTransportationCost(acceptedFlight)
        } else if (transportationType === 'train') {
            updateTransportationCost(0)
            setTransportationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.train_success.html }}></span>  })
        } else if (transportationType === 'rental') {
            updateTransportationCost(0)
            setTransportationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.rental_car_success.html }}></span>  })
        } else if (transportationType === 'private') {
            if (privateVehicleSuccess) {
                setPrivateKilometricsValue((returnDistance / 1000).toFixed(2));
            }

            updateTransportationCost(transportationEstimates.rentalCar.estimatedValue)
            displayTransportationMessage()
        } else if (transportationType === 'notrequired') {
            updateTransportationCost(0.00)
            setTransportationMessage({ element: <span className="transportation-message"></span>  })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transportationType])

    const updateAccommodationCost = (newValue) => {
        setAccommodationCost(newValue.toFixed(2))
    }

    const updateTransportationCost = (newValue) => {
        setTransportationCost(newValue.toFixed(2))
    }

    const updateLocalTransportationCost = (newValue) => {
        setLocalTransportationCost(newValue.toFixed(2))
    }

    const updateMealCost = (newValue) => {
        setMealCost(newValue.toFixed(2))
    }

    const updateOtherCost = (newValue) => {
        setOtherCost(newValue.toFixed(2))
    }

    const updateSummaryCost = (newValue) => {
        setSummaryCost(newValue.toFixed(2))
    }

    const rateDaysByMonth = (departureDate, returnDate, rates) => {
        // get all the dates in range

        let dates = Interval.fromDateTimes(
            departureDate.startOf("day"),
            returnDate.endOf("day"))
            .splitBy({days: 1}).map(d => d.start)

        // remove the last date, since we won't need accommodation on that day

        dates.pop();

        // get month/year from each date object

        let months = dates.map((date) => {
            return date.month + '-' + date.year;
        });

        // count occurrences of each month

        var monthYearCount = months.reduce(function(obj, b) {
            obj[b] = ++obj[b] || 1;
            return obj;
        }, {});

        let result = {}

        for (const monthYear in monthYearCount) {
            let split = monthYear.split('-');
            let monthName = Info.months()[split[0] - 1]
            result[monthYear] = {
                dayCount: monthYearCount[monthYear],
                rate: rates[monthName],
                monthTotal: monthYearCount[monthYear] * rates[monthName],
            }
        }

        return result;
    }

    const handleSubmit =  async(e) => {
        setAccommodationType('')
        setTransportationType('')
        setTransportationCost('0.00')
        setAccommodationCost('0.00')
        setTransportationMessage({
            element: <span></span>
        })
        setAccommodationMessage({
            element: <span></span>
        })


        setOtherCost('0.00');
        setAcceptedFlight(0.00);
        setFlightResult({});
        setSelectedFlightPrice(0.00)
        setLoading(true);
        setGeneralError(false);
        e.preventDefault();
        handleSubmitEstimateValidation()
            .then(async (valid) => {
                setOtherCost('0.00');
                setSubmitValidationWarnings([]);
                let flightResult = await fetchFlightCost(originAirportCode, destinationAirportCode, departureTime, returnTime, departureOffset, returnOffset)
                setFlightResult(flightResult);
                if (flightResult.numberOfResults > 0) {
                    setAcceptedFlight(parseFloat(flightResult.median))
                    setSelectedFlightPrice(parseFloat(flightResult.median))
                    setInitialFlightResult(parseFloat(flightResult.median))
                } else {
                    setAcceptedFlight(0.00)
                }

                setTransportationMessage({
                    element: <span>{formattedMessage('transportation_select_message')}</span>
                })
                setAccommodationMessage({
                    element: <span>{formattedMessage('accommodation_select_message')}</span>
                })
                let numberOfDays = Interval.fromDateTimes(
                    departureDateLux,
                    returnDateLux)
                    .count('days')

                let provinceCode = destination.provinceCode;

                setMealsByDay(dailyMealTemplate(departureDateLux, returnDateLux))
                setProvince(provinceCode)

                try {
                    let distanceBetweenPlaces = await fetchDistanceBetweenPlaces(origin.acrdName, destination.acrdName);
                    let distanceBetweenPlacesBody = await distanceBetweenPlaces.json()

                    setPrivateVehicleSuccess(true)

                    let drivingDistance = distanceBetweenPlacesBody.rows[0].elements[0].distance.value;
                    let returnCalc = drivingDistance * 2;
                    setReturnDistance(returnCalc);
                } catch (error) {
                    console.log('distanceBetweenPlaces error', error)
                    setPrivateVehicleSuccess(false)
                    setReturnDistance(0);
                }

                fetchHotelCost()
                fetchLocalTransportationRate(numberOfDays - 1)

                // get ACRD rate for destination

                // calculate meals for destination
                setResult(true);
                executeScroll()
                setLoading(false);
                setErrorPanel(false);
            })
            .catch(err => {
                console.log("ERROR", err)
                setLoading(false);
                setSubmitValidationWarnings(err.inner || []);
                setErrorPanel(true);
            });
    }

    let [initialResult, setInitialResult] = useState({});

    useEffect(() => {
        if (result === true) {
            setInitialResult({
                accommodationCost,
                transportationCost,
                localTransportationCost,
                mealCost,
                mealCostTotal: mealCost.total,
                otherCost,
                summaryCost,
                accommodationType,
                transportationType,
                returnDistance,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[result])

    const clearForm = async () => {

        setAccommodationCost(parseFloat(0.00).toFixed(2))
        setAccommodationMessage({ element: <span></span>, style: 'primary' });
        setHaveFlightCost(false)
        setTransportationEstimates(transportationEstimatesInitialState);
        setOrigin({})
        setDestination({})
        setEmailConfirmationModalShow(false);
        setEmailModalShow(false);
        setLocalTransportationMessage({ element: <span></span>, style: 'primary' });
        setLocalTransportationCost(parseFloat(0.00).toFixed(2));
        setDepartureDate(initialDates.departure);
        setReturnDate(initialDates.return);
        setMealsByDay({})
        setMealCost(parseFloat(0.00).toFixed(2))
        setOtherCost(parseFloat(0.00).toFixed(2))
        setResult(false)
        setSubmitValidationWarnings([]);
        setInitialResult({});
        setFlightResult({});
        setTransportationType('')
        setAccommodationType('')

        setOriginAirportCode('');
        setDestinationAirportCode('');
        setDepartureTime('07:00');
        setReturnTime('17:00');
        setDepartureOffset(2);
        setReturnOffset(2);
        

        // START OF HACK This is a hack to programatically clear the autocomplete inputs

        let originElement = document.querySelector('#autocomplete-origin')
        let destinationElement = document.querySelector('#autocomplete-destination')

        destinationElement.value = "";
        destinationElement.click();
        destinationElement.focus();
        destinationElement.blur();
        originElement.value = "";
        originElement.click();
        originElement.focus();
        originElement.blur();
        setTransportationMessage(initialTransportationMessage)
        setTimeout(function(){ 
            if(originElement){
                originElement.focus();
            }
        },0);

        // END OF HACK

    }

    const handleSubmitEstimateValidation = () => {
        let target = {origin: origin.acrdName, destination: destination.acrdName, departureDate, returnDate};
        let schema = yup.object().shape({
            origin: yup
                .string()
                .test(
                    formattedMessage('estimate_origin_city_valid'),
                    formattedMessage('estimate_origin_city_not_valid'),
                    (value) => {
                        return citiesList.includes(value)
                    },
                  ),
            destination: yup
                .string()
                .test(
                    formattedMessage('estimate_destination_city_valid'),
                    formattedMessage('estimate_destination_city_not_valid'),
                    (value) => {
                        return citiesList.includes(value)
                    },
                ),
            departureDate: yup
                .date()
                .typeError(formattedMessage('estimate_departure_date_not_valid'))
                .required(),
            returnDate: yup
                .date()
                .typeError(formattedMessage('estimate_return_date_not_valid'))
                .required().min(
                yup.ref('departureDate'),
                formattedMessage('no_time_travel')
            )
        });
        return schema.validate(target, {abortEarly: false})
    }

    const handleSubmitEmailValidation = () => {
        let target = {tripName, travellersName, travellersEmail, approversName, approversEmail, tripNotes, travellerIsPublicServant, travelCategory};
        let schema = yup.object().shape({
            tripName: yup
                .string()
                .typeError(' is required')
                .required(),
            travellersName: yup
                .string()
                .typeError(' is required')
                .required(),
            travellersEmail: yup
                .string()
                .typeError(' is required')
                .required(),
            approversName: yup
                .string()
                .typeError(' is required')
                .required(),
            approversEmail: yup
                .string()
                .typeError(' is required')
                .required(),
            tripNotes: yup
                .string(),
            travelCategory: yup
                .string().min(1),
        });
        return schema.validate(target, {abortEarly: false})
    }

    const errorList = () => {
        let list = [];
        list = submitValidationWarnings.map((error, index) =>
            <li key={index}><a className="alert-link" href={'#' + error.path}>{error.errors}</a></li>
        );
        return list;
    }

    const calculateTotal = async () => {
        let total = parseFloat(accommodationCost || 0) + parseFloat(transportationCost || 0) + parseFloat(localTransportationCost || 0) + parseFloat(mealCost.total || 0) + parseFloat(otherCost || 0);
        await updateSummaryCost(total)
    }

    const sendEmail = async () => {
        setEmailRequestLoading(true);
        handleSubmitEmailValidation()
            .then(async (valid) => {
                setEmailValidationWarnings([]);
                fetch('/api/sendEstimateEmailCeres', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        departureDate: departureDate.format("YYYY-MM-DD"),
                        returnDate: returnDate.format("YYYY-MM-DD"),
                        origin,
                        destination,
                        accommodationType,
                        accommodationCost,
                        accommodationMessage,
                        transportationType,
                        transportationCost,
                        transportationMessage,
                        localTransportationCost,
                        localTransportationMessage,
                        mealCost: mealCost.total,
                        otherCost,
                        tripName,
                        travellersName,
                        travellersEmail,
                        approversName,
                        approversEmail,
                        tripNotes,
                        summaryCost,
                        travelCategory,
                        travellerIsPublicServant,
                        initialResult,
                        returnDistance,
                        applicableRates,
                        privateVehicleRate,
                        privateKilometricsValue,
                        flightResult,
                    })
                  }).then(function(response) {
                    if (!response.ok) {
                        setEmailRequestResult({ status: 'error', raw: response.statusText })
                        throw Error(response.statusText);
                    }
                    return response.json()
                  }).then(function(data) {
                    console.log('email service: ', data);
                    setEmailRequestResult({ status: 'success', raw: data })
                  })
                  .catch((err) => {
                    console.log('email service: ', err.message);
                  });
            })
            .catch(err => {
                console.log("ERROR", err)
                setEmailValidationWarnings(err.inner);
                setEmailRequestLoading(false);
            });
    }

    useEffect(() => {
        if (emailRequestResult.status === 'success') {
            setEmailModalShow(false)
            setEmailRequestLoading(false)
            setEmailConfirmationModalShow(true)
        } else if (emailRequestResult.status === 'error') {
            setEmailModalShow(false)
            setEmailRequestLoading(false)
            setEmailConfirmationModalShow(true)
        }
    }, [emailRequestResult])

    const renderAccommodationTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {formattedMessage('accommodation_tooltip')}
        </Tooltip>
    );

    const renderEnterTravelInfoAboveTooltip = (props) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                <span dangerouslySetInnerHTML={{ __html: localeCopy.enter_travel_info_above }}></span>
            </Tooltip>
        )
    }

    useEffect(() => {
        if (result && parseInt(localTransportationCost) === 0) {
            setLocalTransportationMessage({
                element:  <span className="transportation-message alert-warning" role="alert" dangerouslySetInnerHTML={{ __html: localeCopy.local_tranportation_zero.html }}></span>
            })
        } else if (result && localTransportationEstimate !== parseInt(localTransportationCost)) {
            setLocalTransportationMessage({
                element:  <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.local_transportation_manual.html }}></span>
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localTransportationCost]);

    useEffect(() => {
        if (transportationType === 'flight') {
            if (origin.cityCode === null || destination.cityCode === null) {
                setTransportationMessage({
                    element: <span>{formattedMessage('flight_message_no_airport')}</span>
                })
            } else if (parseFloat(transportationCost) === parseFloat(initialFlightResult)) {
                let message = formattedMessage('flight_selected_fare_preselected')
                message = message.replace('{departureIATACode}', `<strong>${originAirportCode}</strong>`)
                message = message.replace('{destinationIATACode}', `<strong>${destinationAirportCode}</strong>`)
                // eslint-disable-next-line no-template-curly-in-string
                message = message.replace('{flightPrice}', `<strong>${localCurrencyDisplay(parseFloat(acceptedFlight))}</strong>`)
                setTransportationMessage({
                    element: <span>
                                <span dangerouslySetInnerHTML={{ __html: `${message}` }}></span>
                                <span> <a href="/" onClick={(e) => {handleFlightModalShow(e)}}>{formattedMessage('flight_regenerate_estimate')}</a></span>
                            </span>
                })
            } else if (parseFloat(transportationCost) === parseFloat(flightResult.minimum) || parseFloat(transportationCost) === parseFloat(flightResult.maximum) || parseFloat(transportationCost) === parseFloat(flightResult.median)) {
                setTransportationMessage({
                    element: <span>{formattedMessage('flight_selected_fare').replace('{flightPrice}', localCurrencyDisplay(parseFloat(acceptedFlight)))} <a href="/" onClick={(e) => {handleFlightModalShow(e)}}>{formattedMessage('flight_regenerate_estimate')}</a></span>
                })
            } else if (transportationCost > 0) {
                setTransportationMessage({
                    element: <span>{formattedMessage('flight_custom_fare_entered')} <a href="/" onClick={(e) => {handleFlightModalShow(e)}}>{formattedMessage('flight_estimate_your_fare_link')}</a></span>
                })
            }
            // if (haveFlightCost && transportationEstimates.flight.responseBody.numberOfResults === 0 && parseFloat(transportationCost) === 0.00) {
            //     setTransportationMessage({
            //         element:  <span className="transportation-message">{formattedMessage('flight_no_results')}</span>
            //     })
            // } else if (haveFlightCost && transportationEstimates.flight.responseBody.numberOfResults === 0 && parseFloat(transportationCost) > 0.00) {
            //     setTransportationMessage({
            //         element:  <span className="transportation-message">{formattedMessage('flight_no_results_custom')}</span>
            //     })
            // } else if (haveFlightCost && (parseInt(transportationCost) === 0)) {
            //     setTransportationMessage({
            //         element:  <span className="transportation-message">{formattedMessage('flight_zero', 'alert-warning')}</span>
            //     })
            // } else if (haveFlightCost && (parseFloat(transportationCost) < parseFloat(transportationEstimates.flight.estimatedValue.toFixed(2)))) {
            //     setTransportationMessage({
            //         element:  <span className="transportation-message">{formattedMessage('flight_below_estimate')}</span>
            //     })
            // } else if (haveFlightCost && (parseFloat(transportationCost) === parseFloat(transportationEstimates.flight.estimatedValue.toFixed(2)))) {
            //     setTransportationMessage({
            //         element:  transportationEstimates.flight.estimatedValueMessage
            //     })
            // } else if (haveFlightCost && (parseFloat(transportationCost) > parseFloat(transportationEstimates.flight.estimatedValue.toFixed(2)))) {
            //     setTransportationMessage({
            //         element:  <span className="transportation-message">{formattedMessage('transportation_above_flight_estimate')}</span>
            //     })
            // }

            // } else if (result && !haveFlightCost && (parseInt(transportationCost) === 0)) {
            //     setTransportationMessage({
            //         element:  <span className="transportation-message alert-warning" role="alert">{formattedMessage('could_not_fetch_flight_value')}</span>
            //     })
            // } else if (result && !haveFlightCost && (parseInt(transportationCost) > 0)) {
            //     setTransportationMessage({
            //         element:  <span className="transportation-message alert-warning" role="alert">{formattedMessage('could_not_fetch_you_have_entered_own')}</span>
            //     })
            // }
        }
        if (result && transportationType === 'train') {
            console.log('validate train price')
        }
        if (result && transportationType === 'private') {
            console.log('validate private price')
        }
        if (result && transportationType === 'rental') {
            console.log('validate rental price')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transportationCost, transportationType, haveFlightCost]);



    return (
        <div className="mb-4">
            <EmailModal
                validationWarnings={emailValidationWarnings}
                setEmailValidationWarnings={setEmailValidationWarnings}
                show={emailModalShow}
                onHide={() => setEmailModalShow(false)}
                sendEmail={() => sendEmail()}
                tripName={tripName}
                setTripName={setTripName}
                travellersName={travellersName}
                setTravellersName={setTravellersName}
                travellersEmail={travellersEmail}
                setTravellersEmail={setTravellersEmail}
                approversName={approversName}
                setApproversName={setApproversName}
                approversEmail={approversEmail}
                setApproversEmail={setApproversEmail}
                setTripNotes={setTripNotes}
                tripNotes={tripNotes}
                emailRequestLoading={emailRequestLoading}
                messages={localeCopy}
                setTravellerIsPublicServant={setTravellerIsPublicServant}
                travellerIsPublicServant={travellerIsPublicServant}
                travelCategory={travelCategory}
                setTravelCategory={setTravelCategory}
            />
            <EmailConfirmationModal
                show={emailConfirmationModalShow}
                onHide={() => setEmailConfirmationModalShow(false)}
                emailRequestResult={emailRequestResult}
                approversName={approversName}
                clearForm={clearForm}
                messages={localeCopy}
            />
            <MealsModal
                mealsByDay={mealsByDay}
                mealCost={mealCost}
                show={mealsModalShow}
                onHide={() => setMealsModalShow(false)}
                setMealsByDay={setMealsByDay}
                messages={localeCopy}
                locale={locale}
            />
            <FlightModal
                show={flightModalShow}
                onHide={() => setFlightModalShow(false)}
                messages={localeCopy}
                locale={locale}
                destination={destination}
                origin={origin}
                departureDate={departureDate}
                returnDate={returnDate}
                fetchFlightCost={fetchFlightCost}
                selectedFlightPrice={selectedFlightPrice}
                setSelectedFlightPrice={setSelectedFlightPrice}
                flightResult={flightResult}
                setFlightResult={setFlightResult}
                acceptedFlight={acceptedFlight}
                setAcceptedFlight={setAcceptedFlight}
                setTransportationCost={setTransportationCost}
                updateTransportationCost={updateTransportationCost}
                setTransportationType={setTransportationType}
                validationWarnings={flightValidationWarnings}
                setValidationWarnings={setFlightValidationWarnings}
                originAirportCode={originAirportCode}
                destinationAirportCode={destinationAirportCode}
                departureTime={departureTime}
                returnTime={returnTime}
                departureOffset={departureOffset}
                returnOffset={returnOffset}
                setOriginAirportCode={setOriginAirportCode}
                setDestinationAirportCode={setDestinationAirportCode}
                setDepartureTime={setDepartureTime}
                setReturnTime={setReturnTime}
                setDepartureOffset={setDepartureOffset}
                setReturnOffset={setReturnOffset}
            />


            <h2 className="mb-4">{localeCopy.title.text}</h2>
            <div className="lead mb-5" dangerouslySetInnerHTML={{ __html: localeCopy.lead.html }}></div>
             {errorPanel !== false && <div className="alert alert-danger alert-danger-banner">
                <h3>{formattedMessage('estimate_error_title')}</h3>
                <p>{formattedMessage('estimate_error_lead')}</p>
                <ul className="list-unstyled">
                    {errorList()}
                </ul>
            </div>}
            <form id="estimates-form" className="form-group row mb-5" onSubmit={handleSubmit} noValidate>
                <div className="col-sm-7" ref={summaryView}>
                    <InputDatalist
                        validationWarnings={submitValidationWarnings}
                        setValidationWarnings={setSubmitValidationWarnings}
                        label={formattedMessage('estimate_origin')}
                        name="origin"
                        options={filteredCitiesList}
                        updateValue={setOrigin}
                    />
                </div>
                <div className="col-sm-6"></div>
                <div className="col-sm-7">
                    <InputDatalist
                        validationWarnings={submitValidationWarnings}
                        setValidationWarnings={setSubmitValidationWarnings}
                        label={formattedMessage('estimate_destination')}
                        name="destination"
                        options={filteredCitiesList}
                        updateValue={setDestination}
                        className="col-sm-6"
                    />
                </div>
                <div className="col-sm-6"></div>
                <div className="col-sm-7">
                    <DatePicker
                        startDate={departureDate}
                        setStart={setDepartureDate}
                        endDate={returnDate}
                        setEnd={setReturnDate}
                        label={formattedMessage('date_picker_label')}
                        screenReaderInputMessage={formattedMessage('screen_reader_input_message')}
                        localeCopy={localeCopy}
                        locale={locale}
                    />
                </div>
                <div className="col-sm-3"></div>
                <div className="col-sm-12">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button type="submit" className="btn btn-primary px-5">{formattedMessage('estimate')}</button>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    {showClear &&
                        <button type="button" id="clear-button" className="btn btn-outline-primary px-5 ml-3" onClick={() => {clearForm()}}>{formattedMessage('clear')}</button>
                    }
                    {loading && <FaSpinner className="fa-spin ml-3" size="24" />}
                    <div aria-live="polite" class="sr-only" id="loading-sr">{result ? 'Calculated Summary Loaded' : 'Summary Loading'}</div>
                </div>
            </form>

            {generalError && <div className="alert-icon alert-danger">
                <div className="icon" aria-hidden="true">
                    <FaExclamationTriangle size="24" />
                </div>
                <div className="message">
                    <h3>{formattedMessage('estimate_application_error')}</h3>
                    <p>{formattedMessage('estimate_application_error_text')}</p>
                </div>
            </div>}

            <section className="card bg-light p-4 mb-4" aria-live="polite" aria-busy={!result}>
                <h3 className="mb-3">{formattedMessage('estimate_summary_title')}</h3>

                <div className="row mb-4">
                    <div className="col-sm-12 mb-2">
                        <label htmlFor="accommodation_select"><FaBed className="mr-2" size="25" fill="#9E9E9E" />{formattedMessage('accommodation')}</label>
                    </div>
                    <div className="col-sm-4 align-self-center">
                        <div className="align-self-center">
                            <div>
                                {/* <label htmlFor={name}>{label}</label> */}
                                <div id={"accommodation_container"}>
                                    <ConditionalWrap
                                        condition={!result}
                                        wrap={children => (
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderEnterTravelInfoAboveTooltip}
                                            >{children}</OverlayTrigger>)}
                                    >
                                        <select
                                            disabled={!result}
                                            aria-label="Accommodation Type"
                                            className="custom-select mb-2"
                                            value={accommodationType}
                                            onChange={e => {
                                                if (result) {
                                                    setAccommodationType(e.target.value)
                                                }
                                            }}
                                        >
                                            <option disabled value="">{formattedMessage('select')}</option>
                                            <option value="hotel">{formattedMessage('hotel')}</option>
                                            <option value="private">{formattedMessage('private')}</option>
                                            <option value="notrequired">{formattedMessage('not_required')}</option>
                                        </select>
                                    </ConditionalWrap>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 align-self-center">
                        <ConditionalWrap
                            condition={!result}
                            wrap={children => (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderEnterTravelInfoAboveTooltip}
                                >{children}</OverlayTrigger>)}
                        >
                            <div className="input-group mb-2">
                                {locale === 'en-ca' &&
                                    <div className='input-group-prepend'>
                                        <span className="input-group-text" id="accommodation-dollar-sign">$</span>
                                    </div>
                                }
                                <input
                                    
                                    readOnly={!result || accommodationType === "private" || accommodationType === 'notrequired' || accommodationType === ''}
                                    aria-readonly={!result || accommodationType === "private" || accommodationType === 'notrequired' || accommodationType === ''}
                                    type="text"
                                    className="form-control"
                                    id={"accommodation_select"}
                                    name={'accommodation'}
                                    onChange={(e) => {
                                        if (!result) return;
                                        if (parseFloat(e.target.value) > acrdTotal) {
                                            setAccommodationCost(e.target.value)
                                            let message = localeCopy.hotel_above_estimate.html
                                            message = message.replace('{daily rate}', `<strong>${localCurrencyDisplay(applicableRates[0].rate)}</strong>`)
                                            message = message.replace('{tripTotal}', `<strong>${localCurrencyDisplay(acrdTotal)}</strong>`)
                                            setAccommodationMessage({ element: 
                                            <div className="mb-0 alert-warning" role="alert">
                                                <>
                                                    <span className="transportation-message alert-warning" role="alert" dangerouslySetInnerHTML={{ __html: message }}></span>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderAccommodationTooltip}
                                                    >
                                                        <FaQuestionCircle className="ml-2 mb-1" size="15" fill="#9E9E9E" />
                                                    </OverlayTrigger>
                                                </>
                                            </div>
                                            , style: 'warn' });
                                        } else if (parseFloat(e.target.value) === 0) {
                                            setAccommodationCost(e.target.value)
                                            // localeCopy.hotel_below_estimate.html = localeCopy.hotel_below_estimate.html.replace('{daily rate}', `<strong>${acrdTotal}</strong>`)
                                            setAccommodationMessage({ element: 
                                            <div className="mb-0 alert-warning" role="alert">
                                                <>
                                                    <span className="transportation-message alert-warning" role="alert" dangerouslySetInnerHTML={{ __html: localeCopy.hotel_zero.html }}></span>
                                                </>
                                            </div>
                                            , style: 'warn' });
                                        } else if (parseFloat(e.target.value) <= acrdTotal) {
                                            setAccommodationCost(e.target.value)
                                            let message = localeCopy.hotel_below_estimate.html
                                            message = message.replace('{daily rate}', `<strong>${localCurrencyDisplay(applicableRates[0].rate)}</strong>`)
                                            message = message.replace('{tripTotal}', `<strong>${localCurrencyDisplay(acrdTotal)}</strong>`)
                                            setAccommodationMessage({ element: 
                                            <div className="mb-0">
                                                <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span>
                                            </div>
                                            , style: 'success' });
                                        } else {
                                            setAccommodationCost(e.target.value)
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (isNaN(parseFloat(e.target.value))) {
                                            setAccommodationCost(parseFloat(0.00).toFixed(2))
                                        } else {
                                            setAccommodationCost(parseFloat(e.target.value).toFixed(2) || 0.00)
                                        }
                                        calculateTotal()
                                    }}
                                    value={accommodationCost}
                                    type="number"
                                    min="0"
                                >
                                </input>
                                {locale === 'fr-ca' &&
                                    <div className='input-group-append'>
                                        <span className="input-group-text" id="accommodation-dollar-sign">$</span>
                                    </div>
                                }
                            </div>
                        </ConditionalWrap>
                    </div>
                    <div className="col-sm-5 align-self-center text-wrap mb-2" >
                        {accommodationMessage.element}
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-sm-12 mb-2">
                        <label htmlFor="transportation_select"><FaPlane className="mr-2" size="25" fill="#9E9E9E" />{formattedMessage('transportation')}</label>
                    </div>
                    <div className="col-sm-4 align-self-center">
                        <div className="align-self-center">
                            <div>
                                {/* <label htmlFor={name}>{label}</label> */}
                                <div id={"transportation_container"}>
                                    <ConditionalWrap
                                        condition={!result}
                                        wrap={children => (
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderEnterTravelInfoAboveTooltip}
                                            >{children}</OverlayTrigger>)}
                                    >
                                        <select
                                            disabled={!result}
                                            aria-label="Transportation Type"
                                            className="custom-select mb-2"
                                            value={transportationType}
                                            onChange={e => {
                                                if (result) {
                                                    setTransportationType(e.target.value)
                                                }
                                            }}
                                        >
                                            <option disabled value="">{formattedMessage('select')}</option>
                                            <option value="flight" >{formattedMessage('flight')}</option>
                                            <option value="train">{formattedMessage('train')}</option>
                                            <option value="rental">{formattedMessage('rental')}</option>
                                            <option value="private">{formattedMessage('private_vehicle')}</option>
                                            <option value="notrequired">{formattedMessage('not_required')}</option>
                                        </select>
                                    </ConditionalWrap>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 align-self-center">
                        <ConditionalWrap
                            condition={!result}
                            wrap={children => (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderEnterTravelInfoAboveTooltip}
                                >{children}</OverlayTrigger>)}
                        >

                            <div className="input-group mb-2">
                                {locale === 'en-ca' &&
                                    <div className='input-group-prepend'>
                                        <span className="input-group-text" id="transportation-dollar-sign">$</span>
                                    </div>
                                }
                                <input
                                    
                                    type="text"
                                    className={`form-control`}
                                    id={"transportation_select"}
                                    name={'transportation'}
                                    onChange={(e)  => {
                                        if (result) {
                                            setTransportationCost(e.target.value)
                                        }                                    
                                    }}
                                    onBlur={(e) => {
                                        if (isNaN(parseFloat(e.target.value))) {
                                            setTransportationCost(parseFloat(0.00).toFixed(2))
                                        } else {
                                            setTransportationCost(parseFloat(e.target.value).toFixed(2) || 0.00)
                                        }
                                        calculateTotal();
                                    }}
                                    value={transportationCost}
                                    readOnly={!result || transportationType === 'private' ? true : false || transportationType === '' || transportationType === 'notrequired'}
                                    aria-readonly={!result || transportationType === 'private' ? true : false || transportationType === '' || transportationType === 'notrequired'}
                                    type="number"
                                    min="0"
                                    
                                >
                                </input>
                                {locale === 'fr-ca' &&
                                    <div className='input-group-append'>
                                        <span className="input-group-text" id="transportation-dollar-sign">$</span>
                                    </div>
                                }

                            </div>
                        </ConditionalWrap>
                    </div>
                    <div className="col-sm-5 align-self-center text-wrap mb-2" >
                        {transportationMessage.element}
                    </div>
                </div>

                <div className="row mb-4">
                    {transportationType === 'private' &&
                        <div className="col-sm-4 align-self-center text-wrap mb-2">
                            <Form inline>
                                <Form.Group controlId="kilometricsManually">
                                    <Form.Check
                                        type="checkbox"
                                        className="mr-2" 
                                        aria-label="Enter Kilometrics Manually"
                                        checked={enterKilometricsDistanceManually}
                                        onChange={(e) => setEnterKilometricsDistanceManually(!enterKilometricsDistanceManually)}
                                    />
                                    {enterKilometricsDistanceManually &&
                                        <InputGroup>
                                            <Form.Control type="privateKilometrics"
                                                value={privateKilometricsValue}
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                onChange={(e) => {
                                                    setPrivateKilometricsValue(e.target.value)
                                                }}
                                                aria-describedby="km"
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text id="km">km</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>



                                    }
                                    {!enterKilometricsDistanceManually &&
                                        <span>{formattedMessage('private_vehicle_enter_distance_manually')}</span>
                                    }
                                </Form.Group>
                            </Form>
                        </div>
                    }
                </div>


                <EstimatorRow
                    locale={locale}
                    overlayRender={renderEnterTravelInfoAboveTooltip}
                    result={result}
                    value={localTransportationCost || ''}
                    name="localTransportation"
                    id="localTransportation"
                    description="localTransportationDescription"
                    icon={<FaTaxi className="mr-2" size="25" fill="#9E9E9E" />}
                    title={formattedMessage("local_transportation")}
                    calculateTotal={calculateTotal}
                    updateCost={setLocalTransportationCost}
                    message={localTransportationMessage}
                    readOnly={!result}
                />
                <EstimatorRow
                    locale={locale}
                    overlayRender={renderEnterTravelInfoAboveTooltip}
                    result={result}
                    value={mealCost.total || '0.00'}
                    name="mealsAndIncidentals"
                    id="mealsAndIncidentals"
                    description="selectMealsToInclude"
                    message={{
                        element: 
                            result ? <a href="/" onClick={(e) => {handleMealsModalShow(e)}}>{formattedMessage('select_meals_link')}</a> : <span></span>
                    }}
                    icon={<FaUtensils className="mr-2" size="25" fill="#9E9E9E" />}
                    title={formattedMessage("meals_and_incidentals")}
                    calculateTotal={calculateTotal}
                    updateCost={setMealCost}
                    readOnly={true}
                />
                <EstimatorRow
                    locale={locale}
                    overlayRender={renderEnterTravelInfoAboveTooltip}
                    result={result}
                    value={otherCost || ''}
                    name="otherAllowances"
                    id="otherAllowances"
                    message={{ element: result ? formattedMessage('other_allowances_message') : <span></span>}}
                    icon={<FaSuitcase className="mr-2" size="25" fill="#9E9E9E" />}
                    title={formattedMessage("other_allowances")}
                    calculateTotal={calculateTotal}
                    updateCost={setOtherCost}
                    tooltipIcon={FaQuestionCircle}
                    tooltipText={<span dangerouslySetInnerHTML={{ __html: localeCopy.other_tooltip_text }}></span>}
                    readOnly={!result}
                />
                <div className="row mb-4">
                    <div className="col-sm-7 align-self-center text-right" >
                        <hr />
                        <strong className="mr-2">{formattedMessage('total_cost')}</strong>{localCurrencyDisplay(parseFloat(summaryCost))}
                    </div>
                    <div className="col-sm-5 align-self-center text-wrap">
                    </div>
                </div>
            </section>
            <div className="row ml-1 mb-5">
                <div className="col-sm-12">
                    <Button disabled={!result || transportationType === '' || accommodationType === ''} className="px-5 mb-2" onClick={() => { setEmailModalShow(true) }}>{formattedMessage('email')}</Button>
                </div>
                {(!result || transportationType === '' || accommodationType === '') &&
                    <div className="col-sm-12">
                        <small id="passwordHelpBlock" className="form-text text-muted">
                            <span dangerouslySetInnerHTML={{ __html: localeCopy.email_field_disabled_message.html }}></span>
                        </small>
                    </div>
                }
                {/* <Button variant="outline-primary" className="px-5 ml-3" onClick={() => { window.print() }}>formattedMessage('print" /></Button> */}
            </div>

            <hr />
            
            <div className="card bg-white py-4 px-5 mb-2">
                <div className="row">
                    <button className="col-sm-12 pl-2 pb-1 btn btn-plain" aria-expanded="false" onClick={() => setExplainerCollapsed(!explainerCollapsed)}>
                        <h3><FaCalculator size="20" className='mb-1 mr-2' />{localeCopy.explainer_title.text}</h3>
                        {explainerCollapsed &&
                            <FaCaretDown
                                size="25"
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 15,
                                }}
                        />}
                        {!explainerCollapsed &&
                            <FaCaretUp
                                size="25"
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 15,
                                }}
                            />
                        }
                    </button>
                    {!explainerCollapsed &&
                        <React.Fragment>
                            <div className="col-sm-12 mt-2" dangerouslySetInnerHTML={{ __html: localeCopy.explainer_body.html }}>
                            </div>
                        </React.Fragment>
                    }
                    {explainerCollapsed &&
                        <React.Fragment>
                            <div className="col-sm-12" />
                        </React.Fragment>
                    }
                </div>
            </div>


            <div>
                <button className="header-button btn btn-plain pb-3" aria-expanded="false" onClick={() => setDisclaimerCollapsed(!disclaimerCollapsed)}>
                    <h4 className="step-disclaimer-header">
                        {disclaimerCollapsed &&
                            <FaPlusCircle size="15" />}
                        {!disclaimerCollapsed &&
                            <FaMinusCircle size="15" />
                        }
                        {formattedMessage('disclaimer')}
                    </h4>
                </button>
                {!disclaimerCollapsed &&
                    <div className="px-5 pb-3">{formattedMessage('disclaimer_body')}</div>
                }
                {disclaimerCollapsed &&
                    <div className="mb-4"></div>
                }
            </div>
        </div>
    )
}

export default Estimator;
