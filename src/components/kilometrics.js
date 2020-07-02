import React, {useState} from "react"
import GetLocation from "./get-location.js"
import locations from "../data/locations.en.js"
import GetKilometres from "./get-kilometres.js";

const Kilometrics = () => {

    const [locValue, setLocValue] = useState('');
    const [distance, setDistance] = useState(0);
    const [locList, setLocList] = useState(locations);

    const [results, setResults] = useState(false);

    const handleSubmit = () => {
        // this is where validation goes
        let rateCalc = locValue * distance;
        // do stuff to make the hidden display part show here
        setResults(true);

    }

    return (
        <div className="mb-4">
            <h2>Find the correct rate for your kilometrics</h2>
            <p className="lead">Taking your personal vehicle on a government trip? Refer to these rates.</p>
            <form onSubmit={handleSubmit}>
                <GetLocation label="Province/Territory of Travel: " name="destination" options={locList} updateValue={setLocValue}></GetLocation>
                <GetKilometres label="Input kilometres traveled" name="distance" updateValue={setDistance}></GetKilometres>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
       // {results && distance !== 0 &&
        //    <>
        //    <p>The kilometics covered portion of this travel is {rateCalc}</p>
       //     </>
       // }
    )
}

export default Kilometrics;
