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
// import EstimatorRowDropdown from "./estimator-row-dropdown.js";

import cities from "../data/cities.js"
import acrdRates from "../data/acrdRates.js"
import accommodations from "../data/accommodations.js"
import transportData from "../data/transport-data.js"

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

const Estimator = () => {
    const citiesList = cities.citiesList;
    const suburbCityList = cities.suburbCityList;
    const [filteredCitiesList, setFilteredCitiesList] = useState([]);

    useEffect(() => {
        let list = cities.citiesList.map(city => {
            return {
                value: city,
                label: city,
            }
        })
        setFilteredCitiesList(list);
    }, []);


    // Variables/state for inputs
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [accommodation, setAccommodation] = useState('');
    const [transport, setTransport] = useState('');

    const [validationWarnings, setValidationWarnings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [errorPanel, setErrorPanel] = useState(false);

    const [accommodationCost, setAccommodationCost] = useState(0.00);
    const [accommodationMessage, setAccommodationMessage] = useState({ element: <FormattedMessage id='accommodationDescription' />, style: 'primary' });
    const [transportationMessage, setTransportationMessage] = useState({ element: <FormattedMessage id='transportationDescription' />, style: 'primary' });
    const [localTransportationMessage, setLocalTransportationMessage] = useState({ element: <FormattedMessage id='localTransportationDescription' />, style: 'primary' });
    const [transportationCost, setTransportationCost] = useState(0.00);
    const [localTransportationCost, setLocalTransportationCost] = useState(0.00);
    const [mealCost, setMealCost] = useState(0.00);
    const [otherCost, setOtherCost] = useState(0.00);
    const [summaryCost, setSummaryCost] = useState(0.00);
    const [amadeusAccessToken, setAmadeusAccessToken] = useState('')

    useEffect(() => {
        calculateTotal()
    }, [accommodationCost, transportationCost, localTransportationCost, mealCost, otherCost])

    useEffect(() => {
        async function fetchAmadeusToken() {
            await fetch(`/api/FetchAmadeusToken`)
                .then(response => response.json())
                .then(result => {
                    console.log('Fetched Access Token!!!', result);
                    setAmadeusAccessToken(result.access_token)
                })
                .catch(error => { console.log('error', error) });
        }
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
        if (accommodation === 'hotel') {
            fetchHotelCost()
        } else if (accommodation === 'private') {
            let rate = (Interval.fromDateTimes(departureDate, returnDate).count('days') - 1) * 50;
            setAccommodationMessage({ element: <FormattedMessage id="privateAccommodationMessage" />  })
            updateAccommodationCost(rate)
        } else {
            updateAccommodationCost(0.00)
        }
    }, [accommodation])

    const fetchFlightCost = () => {
        setTransportationMessage({ element:
            <>
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>{' '}
                <FormattedMessage id="transportationFlightMessageLoading" />
            </>
        })
        const departureDateISODate = departureDate.toISODate()
        const returnDateISODate = returnDate.toISODate()
        amadeusFlightOffer('YOW', 'YVR', departureDateISODate, returnDateISODate, amadeusAccessToken)
            .then(response => response.json())
            .then(result => {

                const allPrices = [];

                result.data.forEach(itinerary => {
                    allPrices.push(parseFloat(itinerary.price.grandTotal))
                });
                
                const sum = allPrices.reduce((a, b) => a + b, 0);
                const avg = (sum / allPrices.length) || 0;

                updateTransportationCost(avg);
                setTransportationMessage({ element: <FormattedMessage id="transportationFlightMessage" values={{
                    date: DateTime.local().toFormat("yyyy-MM-dd' at 'hh:mm a"),
                    strong: chunks => <strong>{chunks}</strong>,
                  }} />  })
            })
            .catch(error => {
                updateTransportationCost(0.00);
                setTransportationMessage({ element: <FormattedMessage id="transportationFlightMessageCouldNotLoad" />  })
            });
    }

    useEffect(() => {
        if (transport === 'flight') {
            fetchFlightCost()
        } else if (transport === 'train') {
            updateTransportationCost(436)
            setTransportationMessage({ element: <FormattedMessage id="transportationTrainMessage" />  })
        } else if (transport === 'rental') {
            updateTransportationCost(348)
            setTransportationMessage({ element: <FormattedMessage id="transportationRentalCarMessage" />  })
        } else if (transport === 'private') {
            updateTransportationCost(203)
            setTransportationMessage({ element: <FormattedMessage id="transportationPrivateVehicleMessage" />  })
        }
    }, [transport])



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
            .then((valid) => {
                setValidationWarnings([]);

                let numberOfDays = Interval.fromDateTimes(
                    departureDate, 
                    returnDate)
                    .count('days')


                let city = suburbCityList[destination] || destination;
                let province = city.slice(-2); // This is bad.  We need to change the data structure.

                let mealsAndIncidentals = calculateMeals(departureDate, returnDate, province);

                updateMealCost(mealsAndIncidentals.total)
                fetchFlightCost()
                fetchHotelCost()
                fetchLocalTransportationRate(numberOfDays)

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

    const clearForm = () => {
        console.log('clear')
        setDestination('')
        setOrigin('')

        console.log(destination)
        console.log(origin)
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
        let total = parseFloat(accommodationCost) + parseFloat(transportationCost) + parseFloat(localTransportationCost) + parseFloat(mealCost) + parseFloat(otherCost);
        await setSummaryCost(total)
    }


    return (
        <div className="mb-4">
            <h2><FormattedMessage id="estimateTitle" /></h2>
            <p className="lead"><FormattedMessage id="estimateLead" /></p>
             {errorPanel !== false && <div className="alert alert-danger alert-danger-banner">
                <h3><FormattedMessage id="estimateErrorTitle" /></h3>
                <p><FormattedMessage id="estimateErrorLead" /></p>
                <ul className="list-unstyled">
                    {errorList()}
                </ul>
            </div>}
            <form id="estimates-form" className="form-group row mb-4" onSubmit={handleSubmit}>
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
                    <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}><FormattedMessage id="clear"/></button>
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

            {/* {!loading && result && */}
            {true &&
                <div className="card bg-light p-4">
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
                                        className="custom-select"
                                        onChange={e => {setAccommodation(e.target.value)}}
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
                                type="number"
                                className="form-control"
                                id={`accommodation_select`}
                                name={'accommodation'}
                                onChange={(e) => {setAccommodationCost(e.target.value)}}
                                onBlur={calculateTotal}
                                value={accommodationCost}>
                            </input>
                        </div>
                        <div className="col-sm-6 align-self-center text-wrap">
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
                                        className="custom-select"
                                        onChange={e => {setTransport(e.target.value)}}
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
                                type="number"
                                className="form-control"
                                id={`transportation_select`}
                                name={'transportation'}
                                onChange={(e)  => {setTransportationCost(e.target.value)}}
                                onBlur={calculateTotal}
                                value={transportationCost}
                            >
                            </input>
                        </div>
                        <div className="col-sm-6 align-self-center text-wrap">
                            {transportationMessage.element}
                        </div>
                    </div>


                    <EstimatorRow
                        value={localTransportationCost}
                        name="localTransportation"
                        id="localTransportation"
                        description="localTransportationDescription"
                        icon={<FaTaxi className="mr-2" size="25" fill="#9E9E9E" />}
                        title="localTransportation"
                        calculateTotal={calculateTotal}
                        updateCost={updateLocalTransportationCost}
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
                        updateCost={updateMealCost}
                    />
                    <EstimatorRow
                        value={otherCost}
                        name="otherAllowances"
                        id="otherAllowances"
                        message={{ element: <FormattedMessage id="otherAllowancesMessage" />}}
                        icon={<FaSuitcase className="mr-2" size="25" fill="#9E9E9E" />}
                        title="otherAllowances"
                        calculateTotal={calculateTotal}
                        updateCost={updateOtherCost}
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
            }
        </div>
    )
}

export default Estimator;