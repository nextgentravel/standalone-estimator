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
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    //   Will use later when integration language
    //   const url = globalHistory.location.pathname;

    console.log('cityValue', cityValue)

    console.log('startDate', startDate)

    console.log('endDate', endDate)

    return (
        <div className="mb-4">
            <InputDatalist label="City" name="city" options={mockCityList} updateValue={setCityValue} />
            <DatePicker label="Start Date" name="start" updateValue={setStartDate}></DatePicker>
            <DatePicker label="End Date" name="end" updateValue={setEndDate}></DatePicker>
        </div>
    )
}

export default RatesChecker;
