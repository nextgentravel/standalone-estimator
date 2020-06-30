import React, {useState, useEffect} from "react"
import getLocation from "./get-location.js"
import locations from "../data/locations.en.js"

const kilometrics = () => {

    const [locValue, setLocValue] = useState('');

    const handleSubmit = () => {

    }

    return (
        <div className="mb-4">
            <h2>Find the correct rate for your kilometrics</h2>
            <p className="lead">Taking your personal vehicle on a government trip? Refer to these rates.</p>
            <form onSubmit={handleSubmit}>
                <getLocation label="Province/Territory of Travel: " name="destination" options={locations} updateValue={setLocValue}/>
                {/* there will be a box to do kilometres here */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default kilometrics;
