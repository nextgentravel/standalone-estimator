import React, {useState, useEffect, useRef} from "react"
import { useStaticQuery, graphql } from "gatsby"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
import calculateMeals from "./calculate-meals.js"
import { DateTime, Interval, Info } from "luxon"
import * as yup from "yup"
import monthsContained from "./months-contained.js"
import { useIntl, FormattedMessage } from 'react-intl'
import EstimatorRow from "./estimator-row.js"
import EmailModal from "./email-modal.js"
import EmailConfirmationModal from "./email-confirmation-modal.js"
import MealsModal from "./meals-modal.js"
import { FaCaretUp, FaCaretDown, FaCalculator, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { dailyMealTemplate } from "./functions/dailyMealTemplate"

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Spinner } from 'react-bootstrap'

import cities from "../data/cities.js"
import geocodedCities from "../data/geocodedCities"
import acrdRates from "../data/acrdRates.js"
import locations from "../data/locations.js"

import { FaSpinner, FaQuestionCircle, FaExclamationTriangle, FaBed, FaPlane, FaTaxi, FaUtensils, FaSuitcase } from 'react-icons/fa'

import amadeusFlightOffer from '../api-calls/amadeusFlightOffer'
import fetchDistanceBetweenPlaces from '../api-calls/fetchDistanceBetweenPlaces'

import './extra/estimator-print.css'

let initialDeparture = DateTime.local().plus({ days: 1 })
let initialReturn = DateTime.local().plus({ days: 2 })

const ConditionalWrap = ({ condition, wrap, children }) => (
    condition ? wrap(children) : children
);

const Estimator = () => {
    const intl = useIntl();
    const summaryView = useRef(null)
    const executeScroll = () => summaryView.current.scrollIntoView()    

    let locale = `${intl.locale}-ca`;
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
                    flight_above_estimate {
                        html
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
                    flight_zero {
                        html
                    }
                    generating_estimate {
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
                    incorrect_date_format {
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
                    meals_incidentals_success {
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
                }
            }
        }
    }`);

    function formattedMessage(prismicKey, classes) {
        return <span className={classes} dangerouslySetInnerHTML={{ __html: localeCopy[prismicKey] }}></span> 
    }

    let localeCopy = cmsData.allPrismicStandaloneestimatorCopy.nodes.find(function(o){ return o.lang === locale }).data;

    let initialTransportationMessage = { element: formattedMessage('transportation-description', ""), style: 'primary' };

    const [explainerCollapsed, setExplainerCollapsed] = useState(true);

    const citiesList = cities.citiesList;
    const suburbCityList = cities.suburbCityList;
    const [filteredCitiesList, setFilteredCitiesList] = useState([]);

    useEffect(() => {
        let list = []
        for (let city in geocodedCities) {
            list.push({
                value: geocodedCities[city].google_place_id,
                label: geocodedCities[city].acrdName,
            })
        }
        setFilteredCitiesList(list);
    }, []);

    let initialDates = {
        departure: initialDeparture,
        return: initialReturn,
    }

    // Variables/state for inputs
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    // These will be used by the API's later.
    // eslint-disable-next-line no-unused-vars
    const [originData, setOriginData] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [destinationData, setDestinationData] = useState({});
    const [departureDate, setDepartureDate] = useState(initialDates.departure);
    const [returnDate, setReturnDate] = useState(initialDates.return);
    const [privateVehicleRate, setPrivateVehicleRate] = useState('');
    const [privateVehicleSuccess, setPrivateVehicleSuccess] = useState(false);
    const [dateFocused, setDateFocused] = useState(null);
    const [showClear, setShowClear] = useState(false);
    const [disclaimerCollapsed, setDisclaimerCollapsed] = useState(true);
    

    useEffect(() => {
        setHaveFlightCost(false);
        setResult(false);
        setTransportationType('');
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
        const data = geocodedCities[origin]
        if (origin !== '') {
            let provinceAbbreviation = origin.slice(-2);
            let provinceRate = locations[provinceAbbreviation].rateCents
            setPrivateVehicleRate(provinceRate);
        }
        setOriginData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [origin])

    useEffect((() => {
        const data = geocodedCities[destination]
        setDestinationData(data);
    }), [destination])

    const [accommodationType, setAccommodationType] = useState('');
    const [transportationType, setTransportationType] = useState('');

    const [submitValidationWarnings, setSubmitValidationWarnings] = useState([]);
    const [emailValidationWarnings, setEmailValidationWarnings] = useState([]);

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
    const [amadeusAccessToken, setAmadeusAccessToken] = useState({})
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
        console.log('privateVehicleSuccess', privateVehicleSuccess)
        if (privateVehicleSuccess && privateKilometricsValue === (returnDistance / 1000).toFixed(2)) {
            localeCopy.private_vehicle_success.html = localeCopy.private_vehicle_success.html.replace('{rate}', `<strong>${privateVehicleRate}</strong>`)
            localeCopy.private_vehicle_success.html = localeCopy.private_vehicle_success.html.replace('{distance}', `<strong>${(returnDistance / 1000).toFixed(0)}</strong>`)
            setTransportationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.private_vehicle_success.html }}></span> })
        } else if (enterKilometricsDistanceManually) {
            let message = '';
            message = localeCopy.private_vehicle_manual.html.replace('{rate}', `<strong>${privateVehicleRate}</strong>`)
            message = message.replace('{distance}', `<strong>${parseInt(privateKilometricsValue)}</strong>`)
            setTransportationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span> })
        } else if (!privateVehicleSuccess) {
            setTransportationMessage({ element: <span className="transportation-message alert-warning" dangerouslySetInnerHTML={{ __html: localeCopy.private_vehicle_error.html }}></span> })
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

    let handleMealsModalShow = (e) => {
        e.preventDefault()
        setMealsModalShow(true)
    };

    async function fetchAmadeusToken() {
        await fetch("/api/FetchAmadeusToken", {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(result => {
                // console.log('Fetched Access Token: ', result);
                let expiryTime = new Date();
                expiryTime.setSeconds(expiryTime.getSeconds() + result.expires_in);
                setAmadeusAccessToken({ token: result.access_token, expiryTime: expiryTime.getTime() });
            })
            .catch(error => { console.log('FetchAmadeusToken error', error) });
    }

    useEffect(() => {
        fetchAmadeusToken();
    }, [])

    useEffect(() => {
        updateAccommodationCost(0.00)
        updateTransportationCost(0.00)
        updateLocalTransportationCost(0.00)
        updateMealCost(0.00)
        updateOtherCost(0.00)
    }, [])

    const fetchHotelCost = () => {
        let months = monthsContained(departureDate,returnDate);
        let rates = acrdRates[destination];
        let acrdRatesFiltered = Object.keys(rates)
            .filter(key => months.map(mon => mon.month).includes(key))
            .reduce((res, key) => {
                res[key] = rates[key];
                return res;
            }, {});

        try {
            let rates = rateDaysByMonth(departureDate, returnDate, acrdRatesFiltered)

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

            updateAccommodationCost(total)
            setAcrdTotal(total);
            let message = localeCopy.hotel_success.html
            // eslint-disable-next-line no-template-curly-in-string
            message = message.replace('{location}', `<strong>${destination}</strong>`)
            // eslint-disable-next-line no-template-curly-in-string
            message = message.replace('${daily rate}', `<strong>$${calculatedApplicableRates[0].rate}</strong>`)
            setAccommodationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span> })
            // setAccommodationMessage({ element: <FormattedMessage id="hotelAccommodationMessage" values={{
            //     destination,
            //     rate: applicableRates[0].rate,
            // }} />  })
        } catch (error) {
            console.log('fetchHotelHostError', error);
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
            fetchHotelCost()
        } else if (accommodationType === 'private') {
            let rate = (Interval.fromDateTimes(departureDate, returnDate).count('days') - 1) * 50;
            setAccommodationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.private_accom_estimate_success.html }}></span>  })
            updateAccommodationCost(rate)
        } else {
            updateAccommodationCost(0.00)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accommodationType])

    const amadeusAccessTokenCheck = () => {
        if (Date.now() >= amadeusAccessToken.expiryTime) {
            fetchAmadeusToken()
            console.log("Fetching new token.")
        } else {
            console.log("Token is good!")
        }
    }

    const [haveFlightCost, setHaveFlightCost] = useState(false)

    const fetchFlightCost = async () => {
        const departureDateISODate = departureDate.toISODate()
        const returnDateISODate = returnDate.toISODate()

        try {
            await amadeusAccessTokenCheck();
        } catch (error) {
            console.log('amadeusAccessTokenCheck', error)
        }

        if (originData.airports.length > 0 && destinationData.airports.length > 0) {
            amadeusFlightOffer(originData.airports[0].iataCode, destinationData.airports[0].iataCode, departureDateISODate, returnDateISODate, amadeusAccessToken.token)
            .then(response => response.json())
            .then(result => {
                const allPrices = [];

                result.data.forEach(itinerary => {
                    allPrices.push(parseFloat(itinerary.price.grandTotal))
                });

                const sum = allPrices.reduce((a, b) => a + b, 0);
                const avg = (sum / allPrices.length) || 0;

                let date = DateTime.local().toFormat("yyyy-MM-dd");
                let time = DateTime.local().toFormat("hh:mm a")

                localeCopy.flight_success.html = localeCopy.flight_success.html.replace('{date}', `<strong>${date}</strong>`)
                localeCopy.flight_success.html = localeCopy.flight_success.html.replace('{time}', `<strong>${time}</strong>`)

                let FlightMessage = <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.flight_success.html }}></span>
                
                updateTransportationCost(avg);
                setTransportationEstimates({
                    ...transportationEstimates,
                    flight: {
                        estimatedValue: avg,
                        estimatedValueMessage: FlightMessage,
                        responseBody: result,
                    }
                })
                setTransportationMessage({ element: FlightMessage  })
                setHaveFlightCost(true);
            })
            .catch(error => {
                console.log('amadeus flight offer error', error);
                updateTransportationCost(0.00);
                setTransportationMessage({ element: <span className="transportation-message alert-warning" dangerouslySetInnerHTML={{ __html: localeCopy.flight_error.html }}></span>  })
            });
        } else {
            setTransportationMessage({ element: <FormattedMessage id="transportationFlightMessageNoAirport" />  })
        }
    }

    useEffect(() => {
        if (transportationType === 'flight') {
            updateTransportationCost(transportationEstimates.flight.estimatedValue)
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
        setLoading(true);
        setGeneralError(false);
        e.preventDefault();
        fetchFlightCost()
        handleSubmitEstimateValidation()
            .then(async (valid) => {
                setSubmitValidationWarnings([]);
                setTransportationType('flight')
                setAccommodationType('hotel')
                let numberOfDays = Interval.fromDateTimes(
                    departureDate,
                    returnDate)
                    .count('days')

                let city = suburbCityList[destination] || destination;
                let provinceCode = city.slice(-2); // This is bad.  We need to change the data structure.

                setMealsByDay(dailyMealTemplate(departureDate, returnDate))
                setProvince(provinceCode)

                try {
                    let distanceBetweenPlaces = await fetchDistanceBetweenPlaces(origin, destination);
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
                // console.log("ERROR", err)
                setLoading(false);
                setSubmitValidationWarnings(err.inner);
                setErrorPanel(true);
            });
    }

    const clearForm = async () => {

        setAccommodationCost(0.00);
        setAccommodationMessage({ element: <span></span>, style: 'primary' });
        setHaveFlightCost(false)
        setTransportationEstimates(transportationEstimatesInitialState);
        setOrigin('')
        setDestination('')
        setDepartureDate('');
        setReturnDate('');
        setEmailConfirmationModalShow(false);
        setEmailModalShow(false);
        setLocalTransportationMessage({ element: <span></span>, style: 'primary' });
        setLocalTransportationCost(0.00);
        setDepartureDate(initialDates.departure);
        setReturnDate(initialDates.return);
        setMealsByDay({})
        setMealCost(0.00)
        setResult(false)

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
        let target = {origin, destination, departureDate, returnDate};
        let schema = yup.object().shape({
            origin: yup
                .string()
                .test(
                    <FormattedMessage id="estimateOriginCityValid" />,
                    <FormattedMessage id="estimateOriginCityNotValid" />,
                    (value) => {
                        return citiesList.includes(value)
                    },
                  ),
            destination: yup
                .string()
                .test(
                    <FormattedMessage id="estimateDestinationCityValid" />,
                    <FormattedMessage id="estimateDestinationCityNotValid" />,
                    (value) => {
                        return citiesList.includes(value)
                    },
                ),
            departureDate: yup
                .date()
                .typeError(<FormattedMessage id="estimateDepartureDateNotValid" />)
                .required(),
            returnDate: yup
                .date()
                .typeError(<FormattedMessage id="estimateReturnDateNotValid" />)
                .required().min(
                yup.ref('departureDate'),
                <FormattedMessage id="noTimeTravel" />
            )
        });
        return schema.validate(target, {abortEarly: false})
    }

    const handleSubmitEmailValidation = () => {
        let target = {tripName, travellersName, travellersEmail, approversName, approversEmail, tripNotes};
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
                .string()
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
                fetch('/api/sendEstimateEmail', {
                    method: 'post',
                    body: JSON.stringify({
                        departureDate: departureDate.toISODate(),
                        returnDate: returnDate.toISODate(),
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
            <FormattedMessage id="accommodationTooltip" />
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
                element:  <span className="transportation-message alert-warning" dangerouslySetInnerHTML={{ __html: localeCopy.local_tranportation_zero.html }}></span>
            })
        } else if (result && localTransportationEstimate !== parseInt(localTransportationCost)) {
            setLocalTransportationMessage({
                element:  <span className="transportation-message alert-warning" dangerouslySetInnerHTML={{ __html: localeCopy.local_transportation_manual.html }}></span>
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localTransportationCost]);

    useEffect(() => {
        if (transportationType === 'flight') {
            if (haveFlightCost && (parseInt(transportationCost) === 0)) {
                setTransportationMessage({
                    element:  <span className="transportation-message alert-warning">(fetched) Flight price is 0</span>
                })
            } else if (haveFlightCost && (transportationCost <= transportationEstimates.flight.estimatedValue.toFixed(2))) {
                setTransportationMessage({
                    element:  transportationEstimates.flight.estimatedValueMessage
                })
            } else if (haveFlightCost && (transportationCost > transportationEstimates.flight.estimatedValue.toFixed(2))) {
                setTransportationMessage({
                    element:  <span className="transportation-message alert-warning">(fetched) Flight price is too much</span>
                })
            }

            if(loading && !haveFlightCost) {
                setTransportationMessage({ element:
                    <>
                        <Spinner animation="border" role="status" size="sm">
                            <span className="sr-only">Loading...</span>
                        </Spinner>{' '}
                        <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.flight_loading.html }}></span>
                    </>
                })
            } else if (result && !haveFlightCost && (parseInt(transportationCost) === 0)) {
                setTransportationMessage({
                    element:  <span className="transportation-message alert-warning">(couldn't fetch) Please enter own flight value</span>
                })
            } else if (result && !haveFlightCost && (parseInt(transportationCost) > 0)) {
                setTransportationMessage({
                    element:  <span className="transportation-message alert-warning">(couldn't fetch) You have entered your own flight value</span>
                })
            }
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
            />
            <EmailConfirmationModal
                show={emailConfirmationModalShow}
                onHide={() => setEmailConfirmationModalShow(false)}
                emailRequestResult={emailRequestResult}
                approversName={approversName}
                clearForm={clearForm}
            />
            <MealsModal
                mealsByDay={mealsByDay}
                mealCost={mealCost}
                show={mealsModalShow}
                onHide={() => setMealsModalShow(false)}
                setMealsByDay={setMealsByDay}
            />
            <h2 className="mb-4">{localeCopy.title.text}</h2>
            <div className="lead mb-5" dangerouslySetInnerHTML={{ __html: localeCopy.lead.html }}></div>
             {errorPanel !== false && <div className="alert alert-danger alert-danger-banner">
                <h3><FormattedMessage id="estimateErrorTitle" /></h3>
                <p><FormattedMessage id="estimateErrorLead" /></p>
                <ul className="list-unstyled">
                    {errorList()}
                </ul>
            </div>}
            <form id="estimates-form" className="form-group row mb-5" onSubmit={handleSubmit}>
                <div className="col-sm-7" ref={summaryView}>
                    <InputDatalist
                        validationWarnings={submitValidationWarnings}
                        setValidationWarnings={setSubmitValidationWarnings}
                        label={<FormattedMessage id="estimateOrigin" />}
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
                        label={<FormattedMessage id="estimateDestination" />}
                        name="destination"
                        options={filteredCitiesList}
                        updateValue={setDestination}
                        className="col-sm-6"
                    />
                </div>
                <div className="col-sm-6"></div>
                <div className="col-sm-7">
                    <DatePicker
                        initialStart={departureDate}
                        setStart={setDepartureDate}
                        initialEnd={returnDate}
                        setEnd={setReturnDate}
                        focus={dateFocused}
                        onFocus={setDateFocused}
                    />
                </div>
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button type="submit" className="btn btn-primary px-5"><FormattedMessage id="estimate"/></button>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    {showClear &&
                        <button type="button" id="clear-button" className="btn btn-outline-primary px-5 ml-3" onClick={() => {clearForm()}}><FormattedMessage id="clear"/></button>
                    }
                    {loading && <FaSpinner className="fa-spin ml-3" size="24" />}
                </div>
            </form>

            {generalError && <div className="alert-icon alert-danger" role="alert">
                <div className="icon" aria-hidden="true">
                    <FaExclamationTriangle size="24" />
                </div>
                <div className="message">
                    <h3><FormattedMessage id="estimateApplicationError" /></h3>
                    <p><FormattedMessage id="estimateApplicationErrorText" /></p>
                </div>
            </div>}

            <div className="card bg-light p-4 mb-4">
                <h3 className="mb-3"><FormattedMessage id="estimateSummaryTitle" /></h3>

                <div className="row mb-4">
                    <div className="col-sm-12 mb-2">
                        <label htmlFor="accommodation_select"><FaBed className="mr-2" size="25" fill="#9E9E9E" /> <FormattedMessage id="accommodation" /></label>
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
                                            className="custom-select mb-2"
                                            onChange={e => {
                                                if (result) {
                                                    setAccommodationType(e.target.value)
                                                }
                                            }}
                                        >
                                            <option value="hotel">Hotel</option>
                                            <option value="private">Private Accommodation</option>
                                        </select>
                                    </ConditionalWrap>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 align-self-center">
                        <ConditionalWrap
                            condition={!result}
                            wrap={children => (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderEnterTravelInfoAboveTooltip}
                                >{children}</OverlayTrigger>)}
                        >
                            <input
                                disabled={accommodationType === "private"}
                                type="text"
                                className="form-control mb-2"
                                id={"accommodation_select"}
                                name={'accommodation'}
                                onChange={(e) => {
                                    if (!result) return;
                                    if (parseFloat(e.target.value) > acrdTotal) {
                                        setAccommodationCost(e.target.value)
                                        let message = localeCopy.hotel_above_estimate.html
                                        message = message.replace('{daily rate}', `<strong>${applicableRates[0].rate}</strong>`)
                                        message = message.replace('{tripTotal}', `<strong>${acrdTotal}</strong>`)
                                        setAccommodationMessage({ element: 
                                        <div className="mb-0 alert-warning" role="alert">
                                            <>
                                                <span className="transportation-message alert-warning" dangerouslySetInnerHTML={{ __html: message }}></span>
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
                                                <span className="transportation-message alert-warning" dangerouslySetInnerHTML={{ __html: localeCopy.hotel_zero.html }}></span>
                                            </>
                                        </div>
                                        , style: 'warn' });
                                    } else if (parseFloat(e.target.value) === acrdTotal) {
                                        setAccommodationCost(e.target.value)
                                        let message = localeCopy.hotel_above_estimate.html
                                        message = message.replace('{daily rate}', `<strong>${acrdTotal}</strong>`)
                                        // localeCopy.hotel_above_estimate.html = localeCopy.hotel_above_estimate.html.replace('{daily rate}', `<strong>${acrdTotal}</strong>`)
                                        
                                        setAccommodationMessage({ element: 
                                        <div className="mb-0" role="alert">
                                            <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span>
                                        </div>
                                        , style: 'success' });
                                    } else if (parseFloat(e.target.value) < acrdTotal) {
                                        setAccommodationCost(e.target.value)
                                        let message = localeCopy.hotel_below_estimate.html
                                        message = message.replace('{daily rate}', `<strong>${applicableRates[0].rate}</strong>`)
                                        message = message.replace('{tripTotal}', `<strong>${acrdTotal}</strong>`)
                                        setAccommodationMessage({ element: 
                                        <div className="mb-0" role="alert">
                                            <span className="transportation-message" dangerouslySetInnerHTML={{ __html: message }}></span>
                                        </div>
                                        , style: 'success' });
                                    } else {
                                        setAccommodationCost(e.target.value)
                                    }
                                }}
                                onBlur={calculateTotal}
                                value={accommodationCost}>
                            </input>
                        </ConditionalWrap>
                    </div>
                    <div className="col-sm-6 align-self-center text-wrap mb-2">
                        {accommodationMessage.element}
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-sm-12 mb-2">
                        <label htmlFor="transportation_select"><FaPlane className="mr-2" size="25" fill="#9E9E9E" /> <FormattedMessage id="transportation" /></label>
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
                                            className="custom-select mb-2"
                                            onChange={e => {
                                                console.log("result", result)
                                                if (result) {
                                                    setTransportationType(e.target.value)
                                                    if (e.target.value === 'private') {
                                                        updateLocalTransportationCost(0)
                                                    }
                                                }
                                            }}
                                        >
                                            <option value="flight" >Flight</option>
                                            <option value="train">Train</option>
                                            <option value="rental">Rental Car</option>
                                            <option value="private">Private Vehicle</option>
                                        </select>
                                    </ConditionalWrap>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 align-self-center">
                        <ConditionalWrap
                            condition={!result}
                            wrap={children => (
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderEnterTravelInfoAboveTooltip}
                                >{children}</OverlayTrigger>)}
                        >
                            <input
                                type="text"
                                className={`form-control mb-2`}
                                id={"transportation_select"}
                                name={'transportation'}
                                onChange={(e)  => {
                                    if (result) {
                                        setTransportationCost(e.target.value)
                                    }
                                    // if (parseFloat(e.target.value) === 0) {
                                    //     setTransportationMessage({ element: <span className="transportation-message" dangerouslySetInnerHTML={{ __html: localeCopy.flight_zero.html }}></span> })
                                    // }
                                    
                                }}
                                onBlur={calculateTotal}
                                value={transportationCost}
                                disabled={enterKilometricsDistanceManually && transportationType === 'private' ? true : false}
                            >
                            </input>
                        </ConditionalWrap>
                    </div>
                    <div className="col-sm-6 align-self-center text-wrap mb-2">
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
                                        <Form.Control type="privateKilometrics"
                                            value={privateKilometricsValue}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                            onChange={(e) => {
                                                setPrivateKilometricsValue(e.target.value)
                                            }} />
                                    }
                                    {!enterKilometricsDistanceManually &&
                                        <span>Enter distance manually</span>
                                    }
                                </Form.Group>
                            </Form>
                        </div>
                    }
                </div>


                <EstimatorRow
                    overlayRender={renderEnterTravelInfoAboveTooltip}
                    result={result}
                    value={localTransportationCost || '0.00'}
                    name="localTransportation"
                    id="localTransportation"
                    description="localTransportationDescription"
                    icon={<FaTaxi className="mr-2" size="25" fill="#9E9E9E" />}
                    title="localTransportation"
                    calculateTotal={calculateTotal}
                    updateCost={setLocalTransportationCost}
                    message={localTransportationMessage}
                />
                <EstimatorRow
                    overlayRender={renderEnterTravelInfoAboveTooltip}
                    result={result}
                    value={mealCost.total || '0.00'}
                    name="mealsAndIncidentals"
                    id="mealsAndIncidentals"
                    description="selectMealsToInclude"
                    message={{
                        element: 
                            result ? <a href="/" onClick={(e) => {handleMealsModalShow(e)}}>Select meals to include</a> : <span></span>
                    }}
                    icon={<FaUtensils className="mr-2" size="25" fill="#9E9E9E" />}
                    title="mealsAndIncidentals"
                    calculateTotal={calculateTotal}
                    updateCost={setMealCost}
                    disabled={true}
                />
                <EstimatorRow
                    overlayRender={renderEnterTravelInfoAboveTooltip}
                    result={result}
                    value={otherCost || '0.00'}
                    name="otherAllowances"
                    id="otherAllowances"
                    message={{ element: result ? <FormattedMessage id="otherAllowancesMessage" /> : <span></span>}}
                    icon={<FaSuitcase className="mr-2" size="25" fill="#9E9E9E" />}
                    title="otherAllowances"
                    calculateTotal={calculateTotal}
                    updateCost={setOtherCost}
                    tooltipIcon={FaQuestionCircle}
                    tooltipText={<span dangerouslySetInnerHTML={{ __html: localeCopy.other_tooltip_text }}></span>}
                />
                <div className="row mb-4">
                    <div className="col-sm-6 align-self-center text-right">
                        <hr />
                        <strong className="mr-2"><FormattedMessage id="totalCost" /></strong>{'$ ' + summaryCost}
                    </div>
                    <div className="col-sm-6 align-self-center text-wrap">
                    </div>
                </div>
            </div>
            <div className="row ml-1 mb-5">
                <Button disabled={!result} className="px-5" onClick={() => { setEmailModalShow(true) }}><FormattedMessage id="email" /></Button>
                {/* <Button variant="outline-primary" className="px-5 ml-3" onClick={() => { window.print() }}><FormattedMessage id="print" /></Button> */}
            </div>

            <hr />
            
            <div className="card bg-white px-4 mb-2">
                <div className="row">
                    <button className="col-sm-12 pl-2 pb-1 btn btn-plain" aria-expanded="false" onClick={() => setExplainerCollapsed(!explainerCollapsed)}>
                        <h3 className="display-5"><FaCalculator size="20" className='mb-1 mr-2' />{localeCopy.explainer_title.text}</h3>
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
                        Disclaimer
                    </h4>
                </button>
                {!disclaimerCollapsed &&
                    <div className="px-5 pb-3" dangerouslySetInnerHTML={{ __html: localeCopy.disclaimer_body.html }}></div>
                }
                {disclaimerCollapsed &&
                    <div className="mb-4"></div>
                }
            </div>
        </div>
    )
}

export default Estimator;
