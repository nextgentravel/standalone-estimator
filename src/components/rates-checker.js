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
    const [suburbCityList, setSuburbCityList] = useState({});

    const [cityValue, setCityValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [validationWarnings, setValidationWarnings] = useState([]);

    const [acrdRates, setAcrdRates] = useState({});

    const [mealsAndIncidentals, setMealsAndIncidentals] = useState({});

    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState(false);

    //   Will use later when integration language
    //   const url = globalHistory.location.pathname;

    const fetchListOfCities = () => {
        fetch('https://acrd-api.herokuapp.com/cities')
        .then(function(response) {
            return response.json();
          })
          .then(json => {
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
            let city = suburbCityList[cityValue] || cityValue;
            let province = city.slice(-2); // This is bad.  We need to change the data structure.
            let uri = `https://acrd-api.herokuapp.com/${city.replace('/','sss')}/rules`
            let months = monthsContained(startDate,endDate);
            fetch(uri)
                .then(response => response.json())
                .then(json => {
                    let filtered = Object.keys(json)
                    .filter(key => months.map(mon => mon.month).includes(key))
                    .reduce((res, key) => {
                        res[key] = json[key];
                        return res;
                    }, {});
                    setAcrdRates(filtered);
                    setMealsAndIncidentals(calculateMeals(startDate, endDate, province))
                    setLoading(false);
                }).catch(err => {
                    // handle the error.  Ask user to try again?
                    setGeneralError(true);
                    setLoading(false);
                })
        })
        .catch(err => {
            setLoading(false);
            setValidationWarnings(err.errors)
        });
    }

    const clearForm = () => {
        document.getElementById("rates-form").reset();
        setStartDate('');
        setEndDate('');
        setCityValue('');
        setValidationWarnings([])
        setAcrdRates({});
        setMealsAndIncidentals({});
        setGeneralError(false);
    }

    const handleValidation = () => {
        console.log("hit point");
        console.log("startDate",startDate);
        console.log(endDate);
        let target = {start: startDate, end: endDate};
        console.log(target.start);
        console.log(target.end);
        let schema = yup.object().shape({
            start: yup
                .date(),
            end: yup.date().min(
                yup.ref('start'),
                "end date can't be before start date"
                )
        });
        return schema.validate(target)
    }

    return (
        <div className="mb-4">
            <h2>Find Your Rates and Limits</h2>
            <p className="lead">A tool to help you easily find the limits applicable to your trip.</p>

            <form id="rates-form" className="form-group mb-4" onSubmit={handleSubmit}>
                <InputDatalist label="Destination" name="destination" options={citiesList} updateValue={setCityValue} />
                <DatePicker label="Departure Date" name="departure" updateValue={setStartDate}></DatePicker>
                <DatePicker label="Return Date" name="return" updateValue={setEndDate}></DatePicker>
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

            <ul>
                {validationWarnings.map(error => (
                    <li>{error}</li>
                ))}
            </ul>

            {!loading && Object.keys(acrdRates).length !== 0 &&
                <>
                    <h3>Accommodation Rate Limits</h3>
                    <p className="lead">These limits help determine reasonable accommodation costs for <strong>{cityValue}</strong>.</p>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Month</th>
                                    <th scope="col">Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.keys(acrdRates).map((month) => (
                                <tr key={month}>
                                    <th scope="row">{month}</th>
                                    <td>{acrdRates[month]}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {!loading && Object.keys(mealsAndIncidentals).length !== 0 &&
                <>
                    <h3>Meals and Incidentals</h3>
                    <p className="lead">This text will say something useful.</p>

                    <p>You can spend this much on meals and incidentals a day: <strong>${mealsAndIncidentals.dailyTotal.toFixed(2)}</strong></p>

                    <p>${mealsAndIncidentals.dailyTotal.toFixed(2)} = (${mealsAndIncidentals.breakfast.toFixed(2)} + ${mealsAndIncidentals.lunch.toFixed(2)} + ${mealsAndIncidentals.dinner.toFixed(2)} + ${mealsAndIncidentals.incidentals.toFixed(2)}) daily rate</p>
                </>
            }

        </div>
    )
}

export default RatesChecker;
