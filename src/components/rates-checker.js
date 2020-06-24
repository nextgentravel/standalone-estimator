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
    const [citiesList, setCitiesList] = useState([])

    const [cityValue, setCityValue] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    //   Will use later when integration language
    //   const url = globalHistory.location.pathname;

    const fetchListOfCities = () => {
        fetch('https://acrd-api.herokuapp.com/cities')
        .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            console.log('Request successful', json);
            let list = json.citiesList.map(city => {
                return {
                    value: city,
                    label: city,
                }
            })
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
        console.log('cityValue', cityValue)

        console.log('startDate', startDate)
    
        console.log('endDate', endDate)
    }

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <InputDatalist label="City" name="city" options={citiesList} updateValue={setCityValue} />
                <DatePicker label="Start Date" name="start" updateValue={setStartDate}></DatePicker>
                <DatePicker label="End Date" name="end" updateValue={setEndDate}></DatePicker>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default RatesChecker;
