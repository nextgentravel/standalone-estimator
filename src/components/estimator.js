import React, {useState, useEffect} from "react"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
import mealAllowances from "../data/meals"
import { DateTime, Interval, Info } from "luxon"
import * as yup from "yup"
import monthsContained from "./months-contained.js"
import { FormattedMessage } from 'react-intl';
import EstimatorRow from "./estimator-row.js";
import Tooltip from 'react-bootstrap/Tooltip'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import EstimatorRowDropdown from "./estimator-row-dropdown.js";

import cities from "../data/cities.js"
import geocodedCities from "../data/geocodedCities"
import acrdRates from "../data/acrdRates.js"
import accommodations from "../data/accommodations.js"
import transportData from "../data/transport-data.js"
import locations from "../data/locations.js"

import { FaSpinner } from 'react-icons/fa';
import { FaQuestionCircle } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

import { Spinner } from 'react-bootstrap';

import { FaBed } from 'react-icons/fa';
import { FaPlane } from 'react-icons/fa';
import { FaTaxi } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa';
import { FaSuitcase } from 'react-icons/fa';

import amadeusFlightOffer from '../api-calls/amadeusFlightOffer'
import amadeusAirportCode from '../api-calls/amadeusAirportCode'
import fetchDistanceBetweenPlaces from '../api-calls/fetchDistanceBetweenPlaces'

const EmailModal = (props) => {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <FormattedMessage id="emailEstimate" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EmailForm {...props} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.sendEmail}><FormattedMessage id="submit" /></Button>
            </Modal.Footer>
      </Modal>
    )
}

const EmailForm = (props) => {
    return (
        <Form>
            <Form.Group as={Row} controlId="tripName">
                <Form.Label column sm="3">
                    <FormattedMessage id="tripName" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="tripNamePlaceholder">
                        {msg =>
                            <Form.Control value={props.tripName} onChange={(e) => { props.setTripName(e.target.value) }} type="text" placeholder={msg} />
                        }
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="travellersName">
                <Form.Label column sm="3">
                    <FormattedMessage id="travellersName" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="travellersNamePlaceholder">
                        {msg =>
                            <Form.Control value={props.travellersName} onChange={(e) => { props.setTravellersName(e.target.value) }} type="text" placeholder={msg} />
                        }
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="travellersEmail">
                <Form.Label column sm="3">
                    <FormattedMessage id="travellersEmail" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="travellersEmailPlaceholder">
                        {msg =>
                            <Form.Control value={props.travellersEmail} onChange={(e) => { props.setTravellersEmail(e.target.value) }} type="text" placeholder={msg} />
                        }
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="approversName">
                <Form.Label column sm="3">
                    <FormattedMessage id="approversName" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="approversNamePlaceholder">
                        {msg =>
                            <Form.Control value={props.approversName} onChange={(e) => { props.setApproversName(e.target.value) }} type="text" placeholder={msg} />
                        }
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="approversEmail">
                <Form.Label column sm="3">
                    <FormattedMessage id="approversEmail" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="approversEmailPlaceholder">
                        {msg =>
                            <Form.Control value={props.approversEmail} onChange={(e) => { props.setApproversEmail(e.target.value) }} type="text" placeholder={msg} />
                        }
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="notes">
                <Form.Label column sm="3">
                    <FormattedMessage id="notes" />
                </Form.Label>
                <Col sm="9">
                    <Form.Control value={props.tripNotes} onChange={(e) => { props.setTripNotes(e.target.value) }} value={props.tripNotes} as="textarea" rows={3} />
                </Col>
            </Form.Group>
        </Form>
    )
}

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

    // Variables/state for inputs
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [originData, setOriginData] = useState({});
    const [destinationData, setDestinationData] = useState({});
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [privateVehicleRate, setPrivateVehicleRate] = useState('');

    useEffect((() => {
        const data = geocodedCities[origin]
        if (origin !== '') {
            let provinceAbbreviation = origin.slice(-2);
            let provinceRate = locations[provinceAbbreviation].rateCents
            setPrivateVehicleRate(provinceRate);
        }

        const getClosestsAirports = async () => {
            await amadeusAccessTokenCheck();
            let response = await amadeusAirportCode(data.geometry.location.lat, data.geometry.location.lng, amadeusAccessToken.token)
            return response;
        }

        if (data && Object.keys(data).length !== 0) {
            getClosestsAirports()
            .then((response) => {
                console.log('closestAirports response', response)
            })
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
    const [mealCost, setMealCost] = useState(0.00);
    const [otherCost, setOtherCost] = useState(0.00);
    const [summaryCost, setSummaryCost] = useState(0.00);
    const [amadeusAccessToken, setAmadeusAccessToken] = useState({})
    const [enterKilometricsDistanceManually, setEnterKilometricsDistanceManually] = useState(false)
    const [privateKilometricsValue, setPrivateKilometricsValue] = useState('');
    const [returnDistance, setReturnDistance] = useState('');

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

    const [transporationEstimates, setTransportationEstimates] = useState(transportationEstimatesInitialState);

    useEffect(() => {
        let calculateKilometrics = privateKilometricsValue * (privateVehicleRate / 100);
        setTransportationCost(calculateKilometrics.toFixed(2))
        setTransportationEstimates({
            ...transporationEstimates,
            rentalCar: {
                estimatedValue: calculateKilometrics,
            }
        })
    }, [privateKilometricsValue])

    useEffect(() => {
        calculateTotal()
    }, [accommodationCost, transportationCost, localTransportationCost, mealCost, otherCost])

    async function fetchAmadeusToken() {
        await fetch(`/api/FetchAmadeusToken`)
            .then(response => response.json())
            .then(result => {
                console.log('Fetched Access Token!!!', result);
                let expiryTime = new Date();
                expiryTime.setSeconds(expiryTime.getSeconds() + result.expires_in);
                setAmadeusAccessToken({ token: result.access_token, expiryTime: expiryTime.getTime() });
            })
            .catch(error => { console.log('error', error) });
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
        clearForm()
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
            console.log(error);
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

        await amadeusAccessTokenCheck();

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
                    ...transporationEstimates,
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
                setTransportationMessage({ element: transporationEstimates.flight.estimatedValueMessage })
            };
            updateTransportationCost(transporationEstimates.flight.estimatedValue)
            
        } else if (transportationType === 'train') {
            updateTransportationCost(436)
            setTransportationMessage({ element: <FormattedMessage id="transportationTrainMessage" />  })
        } else if (transportationType === 'rental') {
            updateTransportationCost(348)
            setTransportationMessage({ element: <FormattedMessage id="transportationRentalCarMessage" />  })
        } else if (transportationType === 'private') {
            setPrivateKilometricsValue((returnDistance / 1000).toFixed(2));
            updateTransportationCost(transporationEstimates.rentalCar.estimatedValue)
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

    // since this function is used in two files, we should import it
    const calculateMeals = (departDate, returnDate, province) => {
        let departD = DateTime.fromISO(departDate);
        let returnD = DateTime.fromISO(returnDate);
        
        let duration = returnD.diff(departD, 'days')
        let provinceAllowances = Object.keys(mealAllowances);

        let estimatesForProvince = {};

        if (provinceAllowances.includes(province)) {
            estimatesForProvince = mealAllowances[province];
        } else {
            estimatesForProvince = mealAllowances['CAN'];
        };

        let breakfast = estimatesForProvince.breakfast;
        let lunch = estimatesForProvince.lunch;
        let dinner = estimatesForProvince.dinner;
        let incidentals = estimatesForProvince.incidentals;
        let dailyTotal = breakfast + lunch + dinner + incidentals;
        let total = dailyTotal * duration.values.days;

        return {
            dailyTotal,
            total,
            breakfast,
            lunch,
            dinner,
            incidentals,
        }
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
                let province = city.slice(-2); // This is bad.  We need to change the data structure.

                let mealsAndIncidentals = calculateMeals(departureDate, returnDate, province);

                let distanceBetweenPlaces = await fetchDistanceBetweenPlaces(origin, destination);
                let distanceBetweenPlacesBody = await distanceBetweenPlaces.json()

                try {
                    let drivingDistance = distanceBetweenPlacesBody.rows[0].elements[0].distance.value;
                    let returnCalc = drivingDistance * 2;
                    setReturnDistance(returnCalc);
                } catch (error) {
                    console.log(error)
                }

                

                updateMealCost(mealsAndIncidentals.total)
                fetchHotelCost()
                fetchLocalTransportationRate(numberOfDays - 1)

                // get ACRD rate for destination

                // calculate meals for destination
                setResult(true);
                setLoading(false);
                setErrorPanel(false);
            })
            .catch(err => {
                setLoading(false);
                setValidationWarnings(err.inner);
                setErrorPanel(true);
            });
    }

    const clearForm = async () => {
        setOrigin('')
        setDestination('')
        document.querySelector('#origin').value = ""
        document.querySelector('#destination').value = ""
        // setDepartureDate('')
        // setReturnDate('');
        // document.querySelector('#departureDate').value = ""
        // document.querySelector('#returnDate').value = ""
    }

    const handleValidation = () => {
        let target = {origin, destination, departureDate, returnDate};
        let schema = yup.object().shape({
            origin: yup
                .string()
                .required(<FormattedMessage id="estimateOriginDestinationRequired" />)
                .test(
                    <FormattedMessage id="estimateOriginCityValid" />,
                    <FormattedMessage id="estimateOriginCityNotValid" />,
                    (value) => {
                        return citiesList.includes(value)
                    },
                  ),
            destination: yup
                .string()
                .required(<FormattedMessage id="estimateDestinationRequired" />)
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

    const errorList =() => {
        let list = [];
        list = validationWarnings.map((error, index) =>
            <li key={index}><a className="alert-link" href={`#${error.path}`}>{error.errors}</a></li>
        );
        return list;
    }

    const calculateTotal = async () => {
        let total = parseFloat(accommodationCost || 0) + parseFloat(transportationCost || 0) + parseFloat(localTransportationCost || 0) + parseFloat(mealCost || 0) + parseFloat(otherCost || 0);
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
          });
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
                        updateValue={setDepartureDate}
                    ></DatePicker>
                </div>
                <div className="col-sm-3">
                    <DatePicker
                        validationWarnings={validationWarnings}
                        setValidationWarnings={setValidationWarnings}
                        label={<FormattedMessage id="estimateReturnDate" />}
                        name="returnDate"
                        updateValue={setReturnDate}
                    ></DatePicker>
                </div>
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <button type="submit" className="btn btn-primary"><FormattedMessage id="estimate"/></button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={() => {clearForm()}}><FormattedMessage id="clear"/></button>
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
                        {/* Each row could be a generic componemt with props passed in to define what they are */}

                        <div className="row mb-4">
                            <div className="col-sm-12 mb-2">
                                <div><FaBed className="mr-2" size="25" fill="#9E9E9E" /> <FormattedMessage id="accommodation" /></div>
                            </div>
                            <div className="col-sm-4 align-self-center">
                                <div className="align-self-center">
                                    <div>
                                        {/* <label htmlFor={name}>{label}</label> */}
                                        <div id={`accommodation_container`}>
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
                                    id={`accommodation_select`}
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
                                <div><FaPlane className="mr-2" size="25" fill="#9E9E9E" /> <FormattedMessage id="transportation" /></div>
                            </div>
                            <div className="col-sm-4 align-self-center">
                                <div className="align-self-center">
                                    <div>
                                        {/* <label htmlFor={name}>{label}</label> */}
                                        <div id={`transportation_container`}>
                                        <select
                                            className="custom-select mb-2"
                                            onChange={e => {
                                                setTransportationType(e.target.value)
                                                if (e.target.value === 'private') {
                                                    console.log('here')
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
                                    id={`transportation_select`}
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
                            value={mealCost}
                            name="mealsAndIncidentals"
                            id="mealsAndIncidentals"
                            description="selectMealsToInclude"
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
                                <strong className="mr-2"><FormattedMessage id="totalCost" /></strong>{`$${summaryCost}`}
                            </div>
                            <div className="col-sm-6 align-self-center text-wrap">
                            </div>
                        </div>
                    </div>
                    <div className="row ml-1 mb-5">
                        <Button className="px-5" onClick={() => { setEmailModalShow(true) }}><FormattedMessage id="email" /></Button>
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