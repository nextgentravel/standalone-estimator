import React, {useState} from "react"
import InputDatalist from "./input-datalist.js"

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
    </div>
  )
}

export default RatesChecker;
