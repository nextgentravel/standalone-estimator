import React, {useState, useEffect} from "react"
import InputDatalist from "./input-datalist.js"
import DatePicker from "./date-picker.js"
// import { globalHistory } from "@reach/router"

// the following will be fetched from an API
let mockCityList = [
  {
      label: "Barrie",
      value: "Barrie"
  },
  {
      label: "Calgary",
      value: "Calgary"
  },
]

const RatesChecker = () => {
    const [citiesList, setCitiesList] = useState([]);
    const [suburbCityList, setSuburbCityList] = useState({});

    const [cityValue, setCityValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [acrdRates, setAcrdRates] = useState({});

    //   Will use later when integration language
    //   const url = globalHistory.location.pathname;

    const fetchListOfCities = () => {
        fetch('https://acrd-api.herokuapp.com/cities')
        .then(function(response) {
            return response.json();
          })
          .then(json => {
            console.log('Request successful', json);
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

    useEffect(() => {
        fetchListOfCities();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let city = suburbCityList[cityValue] || cityValue;
        let uri = `https://acrd-api.herokuapp.com/${city.replace('/','sss')}/rules`
        fetch(uri)
          .then(response => response.json())
          .then(json => {
            setAcrdRates(json);
          })
    }

    return (
        <div>
            <h2>Find Your Rates and Limits</h2>
            <p className="lead">A tool to help you easily find the limits applicable to your trip.</p>

            <form className="mb-4" onSubmit={handleSubmit}>
                <InputDatalist label="Destination" name="destination" options={citiesList} updateValue={setCityValue} />
                <DatePicker label="Departure Date" name="departure" updateValue={setStartDate}></DatePicker>
                <DatePicker label="Return Date" name="return" updateValue={setEndDate}></DatePicker>
                <button type="submit" className="btn btn-primary">Submit</button>
                {/* TODO <button type="button" className="btn btn-secondary ml-2" onPress={clearForm}>Reset</button> */}
            </form>

            {Object.keys(acrdRates).length !== 0 &&
                <>
                    <h3>Accommodation Rate Limits</h3>
                    <p className="lead">These limits help determine reasonable accommodation costs for <strong>{cityValue}</strong>.</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Month</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.keys(acrdRates).map((month) => (
                            <tr>
                                <th scope="row">{month}</th>
                                <td>{acrdRates[month]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}

export default RatesChecker;
