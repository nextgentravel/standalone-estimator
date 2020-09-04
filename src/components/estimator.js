import React, {useState, useEffect} from "react"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
import mealAllowances from "../data/meals"
import { DateTime } from "luxon"
import * as yup from "yup"
import monthsContained from "./months-contained.js"
import { FormattedMessage } from 'react-intl';

import cities from "../data/cities.js"
import acrdRates from "../data/acrdRates.js"

import { FaSpinner } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

import { FaCar } from 'react-icons/fa';

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
    const [result, setResult] = useState({});


    const [validationWarnings, setValidationWarnings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [errorPanel, setErrorPanel] = useState(false);

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

    const handleSubmit = (e) => {
        setLoading(true);
        setGeneralError(false);
        e.preventDefault();
        handleValidation()
            .then((valid) => {
                setValidationWarnings([]);
                setResult({
                    destination,
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
            <form id="estimates-form" className="form-group mb-4" onSubmit={handleSubmit}>
                <InputDatalist validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label={<FormattedMessage id="estimateOrigin" />} name="origin" options={filteredCitiesList} updateValue={setOrigin} />
                <InputDatalist validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label={<FormattedMessage id="estimateDestination" />} name="destination" options={filteredCitiesList} updateValue={setDestination} />
                <DatePicker validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label={<FormattedMessage id="estimateDepartureDate" />} name="departureDate" updateValue={setDepartureDate}></DatePicker>
                <DatePicker validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label={<FormattedMessage id="estimateReturnDate" />} name="returnDate" updateValue={setReturnDate}></DatePicker>
                <button type="submit" className="btn btn-primary"><FormattedMessage id="estimate"/></button>
                <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}><FormattedMessage id="clear"/></button>
                {loading && <FaSpinner className="fa-spin ml-3" size="24" />}
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
                        <div className="col-sm-4 align-self-center">
                            <div className="align-self-center">
                                <FaCar size="25" fill="#9E9E9E" />
                                <span><FormattedMessage id="accommodation" /></span>
                            </div>
                        </div>
                        <div className="col-sm-2 align-self-center">
                            <input type="text" class="form-control" id="accommodation" placeholder="0" name="accommodation"></input>
                        </div>
                        <div className="col-sm-6 align-self-center text-wrap">
                            <FormattedMessage id="accommodationDescription" />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-4 align-self-center">
                            <div className="align-self-center">
                                <FaCar size="25" fill="#9E9E9E" />
                                <span><FormattedMessage id="transportation" /></span>
                            </div>
                        </div>
                        <div className="col-sm-2 align-self-center">
                            <input type="text" class="form-control" id="transportation" placeholder="0" name="transportation"></input>
                        </div>
                        <div className="col-sm-6 align-self-center text-wrap">
                        <FormattedMessage id="transportationDescription" />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-4 align-self-center">
                            <div className="align-self-center">
                                <FaCar size="25" fill="#9E9E9E" />
                                <span><FormattedMessage id="localTransportation" /></span>
                            </div>
                        </div>
                        <div className="col-sm-2 align-self-center">
                            <input type="text" class="form-control" id="localTransportation" placeholder="0" name="localTransportation"></input>
                        </div>
                        <div className="col-sm-6 align-self-center text-wrap">
                            <FormattedMessage id="localTransportationDescription" />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-4 align-self-center">
                            <div className="align-self-center">
                                <FaCar size="25" fill="#9E9E9E" />
                                <span><FormattedMessage id="mealsAndIncidentals" /></span>
                            </div>
                        </div>
                        <div className="col-sm-2 align-self-center">
                            <input type="text" class="form-control" id="transportation" placeholder="0" name="transportation"></input>
                        </div>
                        <div className="col-sm-6 align-self-center text-wrap">
                            <FormattedMessage id="selectMealsToInclude" />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-4 align-self-center">
                            <div className="align-self-center">
                                <FaCar size="25" fill="#9E9E9E" />
                                <span><FormattedMessage id="otherAllowances" /></span>
                            </div>
                        </div>
                        <div className="col-sm-2 align-self-center">
                            <input type="text" class="form-control" id="transportation" placeholder="0" name="transportation"></input>
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
