import React, {useState} from "react"
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
    const [cityValue, setCityValue] = useState('')

    //   const url = globalHistory.location.pathname;

    console.log(cityValue)

    return (
        <div className="container mt-4">
            <InputDatalist label="City" name="city" options={mockCityList} updateCityValue={setCityValue} />
            <DatePicker label="Start Date" name="start"></DatePicker>
            <DatePicker label="End Date" name="end"></DatePicker>
        </div>
    )
}

export default RatesChecker;
