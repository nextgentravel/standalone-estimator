import React, {useState, useEffect} from "react"
import locations from "../data/locations.js"
import TextInput from "./input-text.js";

import InputDatalist from "./input-datalist.js"

const Kilometrics = () => {

    const [province, setProvinceValue] = useState('');
    const [distance, setDistance] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [calculatedTotal, setCalculatedTotal] = useState(false);
    const [rate, setRate] = useState('');

    const [validationWarnings, setValidationWarnings] = useState([]);

    // We need to process the incoming province data to a format that
    // the InputDatalist component expects
    // this function runs once on render
    useEffect(() => {
        let provinceOptions = Object.keys(locations).map(location => {
            return {
                label: locations[location].label,
                value: location,
            }
        })
        setProvinces(provinceOptions);
    }, []);

    

    const handleSubmit = (e) => {
        // unless we have the next line, the page is going to refresh
        // since this is the standard behaviour of a 'submit' button
        e.preventDefault();
        // this is where validation goes
        let provinceRate = locations[province].rateCents
        setRate(provinceRate)
        let rateCalc = parseInt(provinceRate) * parseInt(distance) / 100;
        // do stuff to make the hidden display part show here
        setCalculatedTotal(rateCalc.toFixed(2));
    }

    return (
        <>
            <div className="mb-4">
                <h2>Find the correct rate for your kilometrics</h2>
                <p className="lead">Taking your personal vehicle on a government trip? Refer to these rates.</p>
                <form onSubmit={handleSubmit}>
                    <InputDatalist validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label="Province/Territory of Travel:" name="province" options={provinces} updateValue={setProvinceValue} />
                    <TextInput label="Kilometres Travelled" name="distance" updateValue={setDistance} />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            {rate !== '' && calculatedTotal !== '' && distance !== '' &&
                <>
                    <p>The kilometric rate for <strong>{province}</strong> is <strong>{rate}</strong> cents per kilometre</p>
                    <p>For your trip of <strong>{distance}</strong> kilometres you would be reimbursed <strong>${calculatedTotal}</strong></p>
                </>
            }
        </>

    // ## Note that this wasn't going to work
    // ## as a react child can only ever be a single element.
    // ## so wrap the whole element you're exporting in a <div> or <>
    // ## like above
    //    {results && distance !== 0 &&
    //        <>
    //        <p>The kilometics covered portion of this travel is {rateCalc}</p>
    //        </>
    //    }
    )
}

export default Kilometrics;
