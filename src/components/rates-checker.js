import React, {useState, useEffect} from "react"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
import mealAllowances from "../data/meals"
import { DateTime } from "luxon"
import * as yup from "yup"
import monthsContained from "./months-contained.js"

// import { globalHistory } from "@reach/router"

const RatesChecker = () => {
    const [citiesList, setCitiesList] = useState([]);
    const [suburbCityList, setSuburbCityList] = useState({});

    const [cityValue, setCityValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [acrdRates, setAcrdRates] = useState({});

    const [mealsAndIncidentals, setMealsAndIncidentals] = useState({});

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
        e.preventDefault();
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
          })
        setMealsAndIncidentals(calculateMeals(startDate, endDate, province))
    }

    let schema = yup.object().shape({
        start: yup
            .date()
            .required(),
        end: yup
            .date()
            .when(
                'startDate',
                (start, schema) => (start && schema.min(start, "The end date is before the start date.")),
        ),
    });
    const dateChange = (e) => {
        schema.isValid({
            start: startDate,
            end: endDate
            })
            .then(valid => {
                if(valid = false) {
                    console.log("i failed");
                } else {
                    console.log("i returned true");
                }
            });
    }
    
    return (
        <div>
            <h2>Find Your Rates and Limits</h2>
            <p className="lead">A tool to help you easily find the limits applicable to your trip.</p>

            <form className="form-group mb-4" onSubmit={handleSubmit}>
                <InputDatalist label="Destination" name="destination" options={citiesList} updateValue={setCityValue}  />
                <DatePicker label="Departure Date" name="departure" updateValue={setStartDate} onChange={dateChange}></DatePicker>
                <DatePicker label="Return Date" name="return" updateValue={setEndDate} onChange={dateChange}></DatePicker>
                <button type="submit" className="btn btn-primary">Submit</button>
                {/* TODO <button type="button" className="btn btn-secondary ml-2" onPress={clearForm}>Reset</button> */}
            </form>

            {Object.keys(acrdRates).length !== 0 &&
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
            {Object.keys(mealsAndIncidentals).length !== 0 &&
                <>
                    <h3>Meals and Incidentals</h3>
                    <p className="lead">This text will say something useful.</p>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Breakfast</th>
                                    <th scope="col">Lunch</th>
                                    <th scope="col">Dinner</th>
                                    <th scope="col">Incidentals</th>
                                    <th scope="col">Daily Total</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${mealsAndIncidentals.breakfast}</td>
                                    <td>${mealsAndIncidentals.lunch}</td>
                                    <td>${mealsAndIncidentals.dinner}</td>
                                    <td>${mealsAndIncidentals.incidentals}</td>
                                    <td>${mealsAndIncidentals.dailyTotal}</td>
                                    <td>${mealsAndIncidentals.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            }

        </div>
    )
}

export default RatesChecker;
