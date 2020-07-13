import React, {useState, useEffect} from "react"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
import mealAllowances from "../data/meals"
import { DateTime } from "luxon"
import * as yup from "yup"
import monthsContained from "./months-contained.js"

import { FaSpinner } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

// import { globalHistory } from "@reach/router"

const RatesChecker = () => {
    const [citiesList, setCitiesList] = useState([]);
    const [citiesListArray, setCitiesListArray] = useState([]);
    const [suburbCityList, setSuburbCityList] = useState({});

    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [result, setResult] = useState({});


    const [validationWarnings, setValidationWarnings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [errorPanel, setErrorPanel] = useState(false);

    //   Will use later when integration language
    //   const url = globalHistory.location.pathname;

    const fetchListOfCities = () => {
        fetch('https://acrd-api.herokuapp.com/cities')
        .then(function(response) {
            return response.json();
          })
          .then(json => {
            setCitiesListArray(json.citiesList);
            let list = json.citiesList.map(city => {
                return {
                    value: city,
                    label: city,
                }
            })
            setSuburbCityList(json.suburbCityList)
            setCitiesList(list)
          })
          .catch(function(error) {
            console.log('Request failed', error)
          });
    }

    const calculateMeals = (departDate, returnDate, province) => {
        let departD = DateTime.fromISO(departDate);
        let returnD = DateTime.fromISO(returnDate);
        let duration = returnD.diff(departD, 'days')
        let provinceAllowances = Object.keys(mealAllowances);

        let ratesForProvince = {};

        if (provinceAllowances.includes(province)) {
            ratesForProvince = mealAllowances[province];
        } else {
            ratesForProvince = mealAllowances['CAN'];
        };

        let breakfast = ratesForProvince.breakfast;
        let lunch = ratesForProvince.lunch;
        let dinner = ratesForProvince.dinner;
        let incidentals = ratesForProvince.incidentals;
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

    useEffect(() => {
        fetchListOfCities();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        setGeneralError(false);
        e.preventDefault();
        handleValidation()
            .then((valid) => {
                setValidationWarnings([]);
                let city = suburbCityList[destination] || destination;
                let province = city.slice(-2); // This is bad.  We need to change the data structure.
                let uri = `https://acrd-api.herokuapp.com/${city.replace('/','sss')}/rules`
                let months = monthsContained(departureDate,returnDate);
                fetch(uri)
                    .then(response => response.json())
                    .then(json => {
                        let acrdRatesFiltered = Object.keys(json)
                        .filter(key => months.map(mon => mon.month).includes(key))
                        .reduce((res, key) => {
                            res[key] = json[key];
                            return res;
                        }, {});

                        let mealsAndIncidentals = calculateMeals(departureDate, returnDate, province);

                        setResult({
                            acrdRatesFiltered,
                            destination,
                            mealsAndIncidentals,
                        })
                        setLoading(false);
                        setErrorPanel(false);
                    }).catch(err => {
                        // handle the error.  Ask user to try again?
                        setGeneralError(true);
                        setLoading(false);
                        setErrorPanel(false);
                    })
            })
            .catch(err => {
                setLoading(false);
                setValidationWarnings(err.inner);
                setErrorPanel(true);
            });
    }

    const clearForm = () => {
        document.getElementById("rates-form").reset();
        setDepartureDate('');
        setReturnDate('');
        setDestination('');
        setValidationWarnings([])
        setGeneralError(false);
        setErrorPanel(false);
        setResult({});
    }

    const handleValidation = () => {
        let target = {destination, departureDate, returnDate};
        let schema = yup.object().shape({
            destination: yup
                .string()
                .required('Destination is a required field')
                .test(
                    'City is valid',
                    'City is not valid.',
                    (value) => {
                        return citiesListArray.includes(value)
                    },
                  ),
            departureDate: yup
                .date()
                .typeError('Start Date must be in DD-MM-YYYY format')
                .required(),
            returnDate: yup
                .date()
                .typeError('Return Date must be in DD-MM-YYYY format')
                .required().min(
                yup.ref('departureDate'),
                "End date cannot be before start date"
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

    return (
        <div className="mb-4">
            <h1>Find Your Rates and Limits</h1>
            <p className="lead">A tool to help you easily find the limits applicable to your trip.</p>
             {errorPanel !== false && <div className="alert alert-danger alert-danger-banner">
                <h2>Field error or required</h2>
                <p>Please verify the following fields: </p>
                <ul className="list-unstyled">
                    {errorList()}
                </ul>
            </div>}
            <form id="rates-form" className="form-group mb-4" onSubmit={handleSubmit}>
                <InputDatalist validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label="Destination" name="destination" options={citiesList} updateValue={setDestination} />
                <DatePicker validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label="Departure Date" name="departureDate" updateValue={setDepartureDate}></DatePicker>
                <DatePicker validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label="Return Date" name="returnDate" updateValue={setReturnDate}></DatePicker>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}>Clear</button>
                {loading && <FaSpinner className="fa-spin ml-3" size="24" />}
            </form>

            {generalError && <div className="alert-icon alert-danger" role="alert">
                <div className="icon" aria-hidden="true">
                    <FaExclamationTriangle size="24" />
                </div>
                <div className="message">
                    <h3>Application Error</h3>
                    <p>Unable to load rates and limits.</p>
                </div>
            </div>}

            {!loading && 'acrdRatesFiltered' in result &&
                <>
                    <h3>Accommodation Rate Limits</h3>
                    <p className="lead">These limits help determine reasonable accommodation costs for <strong>{result.destination}</strong>.</p>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Month</th>
                                    <th scope="col">Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.keys(result.acrdRatesFiltered).map((month) => (
                                <tr key={month}>
                                    <th scope="row">{month}</th>
                                    <td>{result.acrdRatesFiltered[month]}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {!loading && 'mealsAndIncidentals' in result &&
                <>
                    <h3>Meals and Incidentals</h3>
                    <p className="lead">These rates help determine reasonable meal costs. </p>
                    <p>You can spend <strong>${result.mealsAndIncidentals.dailyTotal.toFixed(2)}</strong> on meals and incidentals per day.</p>
                </>
            }

        </div>
    )
}

export default RatesChecker;
