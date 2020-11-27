import React, {useState, useEffect} from "react"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
import calculateMeals from "./calculate-meals.js"
import * as yup from "yup"
import monthsContained from "./months-contained.js"
import { FormattedMessage } from 'react-intl';

import { DateTime } from "luxon"

import cities from "../data/cities.js"
import acrdRates from "../data/acrdRates.js"

import { FaSpinner } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

import {dailyMealTemplate} from "./functions/dailyMealTemplate"

const RatesChecker = () => {

    let initialDates = {
        departure: DateTime.local(),
        return: DateTime.local().plus({ days: 1 }),
    }

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

    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState(initialDates.departure);
    const [returnDate, setReturnDate] = useState(initialDates.return);
    const [result, setResult] = useState({});
    const [mealsByDay, setMealsByDay] = useState({});

    const [validationWarnings, setValidationWarnings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [errorPanel, setErrorPanel] = useState(false);

    //   Will use later when integration language
    //   const url = globalHistory.location.pathname;

    const handleSubmit = (e) => {
        setLoading(true);
        setGeneralError(false);
        e.preventDefault();
        handleValidation()
            .then((valid) => {
                setValidationWarnings([]);
                let city = suburbCityList[destination] || destination;
                let province = city.slice(-2); // This is bad.  We need to change the data structure.
                let months = monthsContained(departureDate,returnDate);
                let rates = acrdRates[destination];
                let acrdRatesFiltered = Object.keys(rates)
                .filter(key => months.map(mon => mon.month).includes(key))
                .reduce((res, key) => {
                    res[key] = rates[key];
                    return res;
                }, {});

                setMealsByDay(dailyMealTemplate(departureDate, returnDate))

                let mealsAndIncidentals = calculateMeals(mealsByDay, province);

                setResult({
                    acrdRatesFiltered,
                    destination,
                    mealsAndIncidentals,
                })
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
                .required(<FormattedMessage id="rateDestinationRequired" />)
                .test(
                    <FormattedMessage id="rateCityValid" />,
                    <FormattedMessage id="rateCityNotValid" />,
                    (value) => {
                        return citiesList.includes(value)
                    },
                  ),
            departureDate: yup
                .date()
                .typeError(<FormattedMessage id="rateDateFormatStart" />)
                .required(),
            returnDate: yup
                .date()
                .typeError(<FormattedMessage id="rateDateFormatReturn" />)
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

    return (
        <div className="mb-4">
            <h2><FormattedMessage id="rateTitle" /></h2>
            <p className="lead"><FormattedMessage id="rateLead" /></p>
             {errorPanel !== false && <div className="alert alert-danger alert-danger-banner">
                <h3><FormattedMessage id="rateErrorTitle" /></h3>
                <p><FormattedMessage id="rateErrorLead" /></p>
                <ul className="list-unstyled">
                    {errorList()}
                </ul>
            </div>}
            <form id="rates-form" className="form-group mb-4" onSubmit={handleSubmit}>
                <InputDatalist
                    validationWarnings={validationWarnings}
                    setValidationWarnings={setValidationWarnings}
                    label={<FormattedMessage id="rateDestination"/>}
                    name="destination"
                    options={filteredCitiesList}
                    updateValue={setDestination}
                />
                <DatePicker validationWarnings={validationWarnings}
                    setValidationWarnings={setValidationWarnings}
                    label={<FormattedMessage id="rateDepart" />}
                    name="departureDate"
                    updateValue={setDepartureDate}
                    initialDate={initialDates.return}
                />
                <DatePicker
                    validationWarnings={validationWarnings}
                    setValidationWarnings={setValidationWarnings}
                    label={<FormattedMessage id="rateReturn" />}
                    name="returnDate"
                    updateValue={setReturnDate}
                    initialDate={initialDates.return}
                />
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="submit" className="btn btn-primary"><FormattedMessage id="submit"/></button>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}><FormattedMessage id="clear"/></button>
                {loading && <FaSpinner className="fa-spin ml-3" size="24" />}
            </form>

            {generalError && <div className="alert-icon alert-danger" role="alert">
                <div className="icon" aria-hidden="true">
                    <FaExclamationTriangle size="24" />
                </div>
                <div className="message">
                    <h3><FormattedMessage id="rateApplicationError" /></h3>
                    <p><FormattedMessage id="rateApplicationErrorText" /></p>
                </div>
            </div>}

            {!loading && 'acrdRatesFiltered' in result &&
                <>
                    <h3><FormattedMessage id="rateResultTitle" /></h3>
                    <p className="lead"><FormattedMessage id="rateLeadResult" /><strong>{result.destination}</strong>.</p>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                    <th scope="col"><FormattedMessage id="rateTableHeadMonth" /></th>
                                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                    <th scope="col"><FormattedMessage id="rateTableHeadRate" /></th>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.keys(result.acrdRatesFiltered).map((month) => (
                                <tr key={month}>
                                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                    <th scope="row"><FormattedMessage id={month} /></th>
                                    <td>${result.acrdRatesFiltered[month]}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {!loading && 'mealsAndIncidentals' in result &&
                <>
                    <h3><FormattedMessage id="rateMealsTitle" /></h3>
                    <p className="lead"><FormattedMessage id="rateMealsLead" /></p>
                    <p><FormattedMessage id="rateMealsText1" /><strong>${result.mealsAndIncidentals.dailyTotal.toFixed(2)}</strong><FormattedMessage id="rateMealsText2" /></p>
                </>
            }

        </div>
    )
}

export default RatesChecker;
