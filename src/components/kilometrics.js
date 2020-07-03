import React, {useState, useEffect} from "react"
import locations from "../data/locations.js"
import TextInput from "./input-text.js";
import InputDatalist from "./input-datalist.js"
import * as yup from "yup"


const Kilometrics = () => {

    const [province, setProvinceValue] = useState('');
    const [distance, setDistance] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [calculatedTotal, setCalculatedTotal] = useState(false);
    const [rate, setRate] = useState('');

    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState(false);

    const [validationWarnings, setValidationWarnings] = useState([]);

    useEffect(() => {
        let provinceOptions = Object.keys(locations).map(location => {
            return {
                label: locations[location].label,
                value: location,
            }
        })
        setProvinces(provinceOptions);

    }, []);

    const handleValidation = () => {
        let provinceKeys = Object.keys(locations);
        console.log(provinceKeys)
        let target = {province, distance};
        let schema = yup.object().shape({
            province: yup
                .string()
                .required('Province is a required field')
                .test(
                    'Province is valid',
                    'Province is not valid.',
                    (value) => {
                        return provinceKeys.includes(value)
                    },
                  ),
            distance: yup
                .number()
                .integer()
                .typeError('Kilometres Travelled must be a number')
                .required('Distance is a required field'),
        });
        return schema.validate(target, {abortEarly: false})
    }

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        handleValidation()
            .then((valid) => {
                setValidationWarnings([]);
                let provinceRate = locations[province].rateCents
                setRate(provinceRate)
                let rateCalc = parseInt(provinceRate) * parseInt(distance) / 100;
                setCalculatedTotal(rateCalc.toFixed(2));
            })
            .catch(err => {
                setLoading(false);
                setValidationWarnings(err.inner)
            });
    }

    const clearForm = () => {
        document.getElementById("kilometrics-form").reset();
        setProvinceValue('');
        setDistance('');
    }


    return (
        <>
            <div className="mb-4">
                <h1>Find the correct rate for your kilometrics</h1>
                <p className="lead">Taking your personal vehicle on a government trip? Refer to these rates.</p>
                <form id="kilometrics-form" onSubmit={handleSubmit}>
                    <InputDatalist validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label="Province/Territory of Travel:" name="province" options={provinces} updateValue={setProvinceValue} />
                    <TextInput validationWarnings={validationWarnings} setValidationWarnings={setValidationWarnings} label="Kilometres Travelled" name="distance" updateValue={setDistance} />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}>Clear</button>
                </form>
            </div>
            {rate !== '' && calculatedTotal !== '' && distance !== '' &&
                <>
                    <p>The kilometric rate for <strong>{province}</strong> is <strong>{rate}</strong> cents per kilometre</p>
                    <p>For your trip of <strong>{distance}</strong> kilometres you would be reimbursed <strong>${calculatedTotal}</strong></p>
                </>
            }
        </>
    )
}

export default Kilometrics;
