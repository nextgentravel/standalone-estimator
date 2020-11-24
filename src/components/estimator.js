import React, {useState, useEffect} from "react"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
import calculateMeals from "./calculate-meals.js"
import { DateTime, Interval, Info } from "luxon"
import * as yup from "yup"
import monthsContained from "./months-contained.js"
import { FormattedMessage } from 'react-intl'
import EstimatorRow from "./estimator-row.js"
import EmailModal from "./email-modal.js"
import MealsModal from "./meals-modal.js"

import { dailyMealTemplate } from "./functions/dailyMealTemplate"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Spinner } from 'react-bootstrap'

import cities from "../data/cities.js"
import geocodedCities from "../data/geocodedCities"
import acrdRates from "../data/acrdRates.js"
import locations from "../data/locations.js"

import { FaSpinner, FaQuestionCircle, FaExclamationTriangle, FaBed, FaPlane, FaTaxi, FaUtensils, FaSuitcase } from 'react-icons/fa'

import amadeusFlightOffer from '../api-calls/amadeusFlightOffer'
import amadeusAirportCode from '../api-calls/amadeusAirportCode'
import fetchDistanceBetweenPlaces from '../api-calls/fetchDistanceBetweenPlaces'

import './extra/estimator-print.css'

const Estimator = () => {
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
        departure: DateTime.local(),
        return: DateTime.local().plus({ days: 1 }),
    }

    // Variables/state for inputs
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    // These will be used by the API's later.
    const [originData, setOriginData] = useState({});
    const [destinationData, setDestinationData] = useState({});
    const [departureDate, setDepartureDate] = useState(initialDates.departure);
    const [returnDate, setReturnDate] = useState(initialDates.return);
    const [privateVehicleRate, setPrivateVehicleRate] = useState('');

    useEffect((() => {
        const data = geocodedCities[origin]
        if (origin !== '') {
            let provinceAbbreviation = origin.slice(-2);
            let provinceRate = locations[provinceAbbreviation].rateCents
            setPrivateVehicleRate(provinceRate);
        }

        const getClosestsAirports = async () => {
            try {
                await amadeusAccessTokenCheck();
                let response = await amadeusAirportCode(data.geometry.location.lat, data.geometry.location.lng, amadeusAccessToken.token)
                return response;
            } catch (error) {
                console.log('getClosestsAirports: ', error);
            }

        }

        if (data && Object.keys(data).length !== 0) {
            getClosestsAirports()
            .then((response) => {
                console.log('closestAirports response', response)
            }).catch((err) => console.log('getClosestsAirports', err))
        }

        setOriginData(data);

    }), [origin])

    useEffect((() => {
        const data = geocodedCities[destination]
        setDestinationData(data);
    }), [destination])

    const [accommodationType, setAccommodationType] = useState('');
    const [transportationType, setTransportationType] = useState('');

    const [validationWarnings, setValidationWarnings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [errorPanel, setErrorPanel] = useState(false);

    const [accommodationCost, setAccommodationCost] = useState(0.00);
    const [acrdTotal, setAcrdTotal] = useState(0.00);
    const [accommodationMessage, setAccommodationMessage] = useState({ element: <FormattedMessage id='accommodationDescription' />, style: 'primary' });
    const [transportationMessage, setTransportationMessage] = useState({ element: <FormattedMessage id='transportationDescription' />, style: 'primary' });
    const [localTransportationMessage, setLocalTransportationMessage] = useState({ element: <FormattedMessage id='localTransportationDescription' />, style: 'primary' });
    const [transportationCost, setTransportationCost] = useState(0.00);
    const [localTransportationCost, setLocalTransportationCost] = useState(0.00);
    const [mealCost, setMealCost] = useState({ total: 0.00 });
    const [otherCost, setOtherCost] = useState(0.00);
    const [summaryCost, setSummaryCost] = useState(0.00);
    const [amadeusAccessToken, setAmadeusAccessToken] = useState({})
    const [enterKilometricsDistanceManually, setEnterKilometricsDistanceManually] = useState(false)
    const [privateKilometricsValue, setPrivateKilometricsValue] = useState('');
    const [returnDistance, setReturnDistance] = useState('');

    const [mealsByDay, setMealsByDay] = useState({});
    const [province, setProvince] = useState('');

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

    useEffect(() => {
        let calculateKilometrics = privateKilometricsValue * (privateVehicleRate / 100);
        setTransportationCost(calculateKilometrics.toFixed(2))
        setTransportationEstimates({
            ...transportationEstimates,
            rentalCar: {
                estimatedValue: calculateKilometrics,
            }
        })
    }, [privateKilometricsValue])

    useEffect(() => {
        calculateTotal()
    }, [accommodationCost, transportationCost, localTransportationCost, mealCost, otherCost])

    useEffect(() => {
        let mealTotals = calculateMeals(mealsByDay, province)
        setMealCost(mealTotals)
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
                console.log('Fetched Access Token: ', result);
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

            let applicableRates = []

            for (const month in rates) {
                total = total + rates[month].monthTotal
                applicableRates.push({
                    month: month,
                    rate: rates[month].rate
                })
            }

            updateAccommodationCost(total)
            setAcrdTotal(total);
            setAccommodationMessage({ element: <FormattedMessage id="hotelAccommodationMessage" values={{
                destination,
                rate: applicableRates[0].rate,
            }} />  })
        } catch (error) {
            console.log('fetchHotelHostError', error);
        }
    }

    const fetchLocalTransportationRate = (numberOfDays) => {
        let cost = 100 + 50 * (numberOfDays)
        updateLocalTransportationCost(cost)
        setLocalTransportationMessage({ element: <FormattedMessage id="localTransportationMessage" />  })
    }

    useEffect(() => {
        if (accommodationType === 'hotel') {
            fetchHotelCost()
        } else if (accommodationType === 'private') {
            let rate = (Interval.fromDateTimes(departureDate, returnDate).count('days') - 1) * 50;
            setAccommodationMessage({ element: <FormattedMessage id="privateAccommodationMessage" />  })
            updateAccommodationCost(rate)
        } else {
            updateAccommodationCost(0.00)
        }
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

        amadeusFlightOffer('YOW', 'YVR', departureDateISODate, returnDateISODate, amadeusAccessToken.token)
            .then(response => response.json())
            .then(result => {

                const allPrices = [];

                result.data.forEach(itinerary => {
                    allPrices.push(parseFloat(itinerary.price.grandTotal))
                });

                const sum = allPrices.reduce((a, b) => a + b, 0);
                const avg = (sum / allPrices.length) || 0;

                let FlightMessage = <FormattedMessage id="transportationFlightMessage" values={{
                    date: DateTime.local().toFormat("yyyy-MM-dd' at 'hh:mm a"),
                    strong: chunks => <strong>{chunks}</strong>,
                  }} />

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
                setTransportationMessage({ element: <FormattedMessage id="transportationFlightMessageCouldNotLoad" />  })
            });
    }

    useEffect(() => {
        if (transportationType === 'flight') {
            if(!haveFlightCost) {
                fetchFlightCost()
                setTransportationMessage({ element:
                    <>
                        <Spinner animation="border" role="status" size="sm">
                            <span className="sr-only">Loading...</span>
                        </Spinner>{' '}
                        <FormattedMessage id="transportationFlightMessageLoading" />
                    </>
                })
            } else {
                setTransportationMessage({ element: transportationEstimates.flight.estimatedValueMessage })
            };
            updateTransportationCost(transportationEstimates.flight.estimatedValue)
            
        } else if (transportationType === 'train') {
            updateTransportationCost(436)
            setTransportationMessage({ element: <FormattedMessage id="transportationTrainMessage" />  })
        } else if (transportationType === 'rental') {
            updateTransportationCost(348)
            setTransportationMessage({ element: <FormattedMessage id="transportationRentalCarMessage" />  })
        } else if (transportationType === 'private') {
            setPrivateKilometricsValue((returnDistance / 1000).toFixed(2));
            updateTransportationCost(transportationEstimates.rentalCar.estimatedValue)
            setTransportationMessage({ element: <FormattedMessage id="transportationPrivateVehicleMessage" values={{ rate: privateVehicleRate, kilometres: (returnDistance / 1000).toFixed(0) }} />  })
        }
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
        handleValidation()
            .then(async (valid) => {
                setValidationWarnings([]);
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


                    let drivingDistance = distanceBetweenPlacesBody.rows[0].elements[0].distance.value;
                    let returnCalc = drivingDistance * 2;
                    setReturnDistance(returnCalc);
                } catch (error) {
                    console.log('distanceBetweenPlaces error', error)
                }

                fetchHotelCost()
                fetchLocalTransportationRate(numberOfDays - 1)

                // get ACRD rate for destination

                // calculate meals for destination
                setResult(true);
                setLoading(false);
                setErrorPanel(false);
            })
            .catch(err => {
                console.log("ERROR", err)
                setLoading(false);
                setValidationWarnings(err.inner);
                setErrorPanel(true);
            });
    }

    const clearForm = async () => {
        setOrigin('')
        setDestination('')
        setDepartureDate('');
        setReturnDate('');

        // START OF HACK This is a hack to programatically clear the autocomplete inputs

        let originElement = document.querySelector('#autocomplete-origin')
        let destinationElement = document.querySelector('#autocomplete-destination')
        let clearFormButton = document.querySelector('#clear-button')
        let datePickerDepart = document.querySelector('#departureDate')
        let datePickerReturn = document.querySelector('#returnDate')

        destinationElement.value = "";
        destinationElement.click();
        destinationElement.focus();
        destinationElement.blur();
        originElement.value = "";
        originElement.click();
        originElement.focus();
        originElement.blur();

        setTimeout(function(){ 
            if(originElement){
                originElement.focus();
            }
            datePickerDepart.value = '';
            datePickerReturn.value = '';
        },0);

        // END OF HACK

    }

    const handleValidation = () => {
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

    const errorList = () => {
        let list = [];
        list = validationWarnings.map((error, index) =>
            <li key={index}><a className="alert-link" href={'#' + error.path}>{error.errors}</a></li>
        );
        return list;
    }

    const calculateTotal = async () => {
        let total = parseFloat(accommodationCost || 0) + parseFloat(transportationCost || 0) + parseFloat(localTransportationCost || 0) + parseFloat(mealCost.total || 0) + parseFloat(otherCost || 0);
        await updateSummaryCost(total)
    }

    const sendEmail = async () => {
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
                mealCost,
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
            return response.json()
          }).then(function(data) {
            console.log('email service: ', data);
          })
          .catch((err) => console.log('send email error: ', err));
    }

    const [emailModalShow, setEmailModalShow] = React.useState(false);

    const [tripName, setTripName] = useState('');
    const [travellersName, setTravellersName] = useState('');
    const [travellersEmail, setTravellersEmail] = useState('');
    const [approversName, setApproversName] = useState('');
    const [approversEmail, setApproversEmail] = useState('');
    const [tripNotes, setTripNotes] = useState('');

    return (
        <div className="mb-4">
            <EmailModal
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
            />
            <MealsModal
                mealsByDay={mealsByDay}
                mealCost={mealCost}
                show={mealsModalShow}
                onHide={() => setMealsModalShow(false)}
                setMealsByDay={setMealsByDay}
            />
            <h2><FormattedMessage id="estimateTitle" /></h2>
            <p className="lead"><FormattedMessage id="estimateLead" /></p>
             {errorPanel !== false && <div className="alert alert-danger alert-danger-banner">
                <h3><FormattedMessage id="estimateErrorTitle" /></h3>
                <p><FormattedMessage id="estimateErrorLead" /></p>
                <ul className="list-unstyled">
                    {errorList()}
                </ul>
            </div>}
            <form id="estimates-form" className="form-group row mb-5" onSubmit={handleSubmit}>
                <div className="col-sm-6">
                    <InputDatalist
                        validationWarnings={validationWarnings}
                        setValidationWarnings={setValidationWarnings}
                        label={<FormattedMessage id="estimateOrigin" />}
                        name="origin"
                        options={filteredCitiesList}
                        updateValue={setOrigin}
                    />
                </div>
                <div className="col-sm-6"></div>
                <div className="col-sm-6">
                    <InputDatalist
                        validationWarnings={validationWarnings}
                        setValidationWarnings={setValidationWarnings}
                        label={<FormattedMessage id="estimateDestination" />}
                        name="destination"
                        options={filteredCitiesList}
                        updateValue={setDestination}
                        className="col-sm-6"
                    />
                </div>
                <div className="col-sm-6"></div>
                <div className="col-sm-3">
                    <DatePicker
                        validationWarnings={validationWarnings}
                        setValidationWarnings={setValidationWarnings}
                        label={<FormattedMessage id="estimateDepartureDate" />}
                        name="departureDate"
                        initialDate={initialDates.departure}
                        updateValue={setDepartureDate}
                    ></DatePicker>
                </div>
                <div className="col-sm-3">
                    <DatePicker
                        validationWarnings={validationWarnings}
                        setValidationWarnings={setValidationWarnings}
                        label={<FormattedMessage id="estimateReturnDate" />}
                        name="returnDate"
                        initialDate={initialDates.return}
                        updateValue={setReturnDate}
                    ></DatePicker>
                </div>
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <button type="submit" className="btn btn-primary"><FormattedMessage id="estimate"/></button>
                    <button type="button" id="clear-button" className="btn btn-secondary ml-2" onClick={() => {clearForm()}}><FormattedMessage id="clear"/></button>
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

            {!loading && result &&
                <>
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
                                        <select
                                            className="custom-select mb-2"
                                            onChange={e => setAccommodationType(e.target.value)}
                                        >
                                            <option value="hotel">Hotel</option>
                                            <option value="private">Private Accommodation</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 align-self-center">
                                <input
                                    disabled={accommodationType === "private"}
                                    type="text"
                                    className="form-control mb-2"
                                    id={"accommodation_select"}
                                    name={'accommodation'}
                                    onChange={(e) => {
                                        if (parseFloat(e.target.value) > acrdTotal) {
                                            setAccommodationCost(e.target.value)
                                            setAccommodationMessage({ element: 
                                            <div className="alert alert-warning mb-0" role="alert">
                                                <FormattedMessage id='accommodationWarning' values={{ acrdTotal }} />
                                            </div>

                                            , style: 'warn' });
                                        } else {
                                            setAccommodationCost(e.target.value)
                                        }
                                    }}
                                    onBlur={calculateTotal}
                                    value={accommodationCost}>
                                </input>
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
                                        <select
                                            className="custom-select mb-2"
                                            onChange={e => {
                                                setTransportationType(e.target.value)
                                                if (e.target.value === 'private') {
                                                    updateLocalTransportationCost(0)
                                                };
                                            }}
                                        >
                                            <option value="flight" >Flight</option>
                                            <option value="train">Train</option>
                                            <option value="rental">Rental Car</option>
                                            <option value="private">Private Vehicle</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 align-self-center">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    id={"transportation_select"}
                                    name={'transportation'}
                                    onChange={(e)  => {setTransportationCost(e.target.value)}}
                                    onBlur={calculateTotal}
                                    value={transportationCost}
                                >
                                </input>
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
                                                value={enterKilometricsDistanceManually}
                                                onChange={(e) => setEnterKilometricsDistanceManually(!enterKilometricsDistanceManually)}
                                            />
                                                {enterKilometricsDistanceManually && 
                                                    <Form.Control type="privateKilometrics" value={privateKilometricsValue} onChange={(e) => {setPrivateKilometricsValue(e.target.value)}} />
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
                            value={localTransportationCost}
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
                            value={mealCost.total}
                            name="mealsAndIncidentals"
                            id="mealsAndIncidentals"
                            description="selectMealsToInclude"
                            message={{
                                element: <a href="#" onClick={(e) => { handleMealsModalShow(e) }}>Select meals to include</a>
                            }}
                            icon={<FaUtensils className="mr-2" size="25" fill="#9E9E9E" />}
                            title="mealsAndIncidentals"
                            calculateTotal={calculateTotal}
                            updateCost={setMealCost}
                        />
                        <EstimatorRow
                            value={otherCost}
                            name="otherAllowances"
                            id="otherAllowances"
                            message={{ element: <FormattedMessage id="otherAllowancesMessage" />}}
                            icon={<FaSuitcase className="mr-2" size="25" fill="#9E9E9E" />}
                            title="otherAllowances"
                            calculateTotal={calculateTotal}
                            updateCost={setOtherCost}
                            tooltipIcon={FaQuestionCircle}
                            tooltipText={<FormattedMessage id="otherTooltipText" />}
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
                        <Button className="px-5" onClick={() => { setEmailModalShow(true) }}><FormattedMessage id="email" /></Button>
                        <Button variant="outline-primary" className="px-5 ml-3" onClick={() => { window.print() }}><FormattedMessage id="print" /></Button>
                    </div>
                    <div>
                        <h3>How did we get these numbers?</h3>
                        <p>City rate limits are outlined in the <a href="https://rehelv-acrd.tpsgc-pwgsc.gc.ca/index-eng.aspx">Accommodation and Car Rental Directory</a></p>
                        <p>Non-commercial accommodation, meals and incidental allowances are outlined in the <a href="https://www.njc-cnm.gc.ca/directive/d10/v238/s659/en">National Joint Council Travel Directive - Appendix C</a></p>
                    </div>
                </>
            }
        </div>
    )
}

export default Estimator;
