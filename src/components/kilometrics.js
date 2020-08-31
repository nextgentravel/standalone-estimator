import React, {useState, useEffect} from "react"
import locations from "../data/locations.js"
import TextInput from "./input-text.js";
import InputDatalist from "./input-datalist.js"
import * as yup from "yup"
import { FaSpinner } from 'react-icons/fa';

const Kilometrics = () => {

    const [province, setProvinceValue] = useState('');
    const [distance, setDistance] = useState('');
    const [provinces, setProvinces] = useState([]);

    const [result, setResult] = useState({});

    const [loading, setLoading] = useState(false);

    const [validationWarnings, setValidationWarnings] = useState([]);
    const [errorPanel, setErrorPanel] = useState(false);

    useEffect(() => {
        let provinceOptions = Object.keys(locations).map(location => {
            return locations[location].label;
        })
        setProvinces(provinceOptions);
    }, []);

    const handleValidation = () => {
        let provinceKeys = Object.keys(locations);
        let target = {province, distance};
        let schema = yup.object().shape({
            province: yup
                .string()
                .required(<FormattedMessage id="kilometricsRequireProvince"/>)
                .test(
                    <FormattedMessage id="kilometricsProvinceNotValid"/>,
                    <FormattedMessage id="kilometricsProvinceValid"/>,
                    (value) => {
                        return provinceKeys.includes(value)
                    },
                  ),
            distance: yup
                .number()
                .integer()
                .typeError(<FormattedMessage id="kilometricsMustBeNumber"/>)
                .required(<FormattedMessage id="kilometricsDistanceRequired"/>),
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
                let rateCalc = parseInt(provinceRate) * parseInt(distance) / 100;
                setResult({
                    total: rateCalc.toFixed(2),
                    provinceRate,
                    distance,
                    province,
                });
                setLoading(false);
                setErrorPanel(false);
            })
            .catch(err => {
                setLoading(false);
                setValidationWarnings(err.inner);
                setErrorPanel(true);
            });
    }

    const clearForm = () => {
        document.getElementById("kilometrics-form").reset();
        setProvinceValue('');
        setDistance('');
        setResult({});
        setValidationWarnings([]);
        setErrorPanel(false);
    }

    const errorList =() => {
        let list = [];
        list = validationWarnings.map((error, index) =>
            <li key={index}><a className="alert-link" href={`#${error.path}`}>{error.errors}</a></li>
        );
        return list;
    }

    return (
        <>
            <div className="mb-4">
                <h2><FormattedMessage id="kilometricsTitle" /></h2>
                <p className="lead"><FormattedMessage id="kilometricsLead" /></p>
                {errorPanel !== false && <div className="alert alert-danger alert-danger-banner">
                    <h2><FormattedMessage id="kilometricsErrorTitle" /></h2>
                    <p><FormattedMessage id="kilometricsErrorText" /></p>
                    <ul className="list-unstyled">
                        {errorList()}
                    </ul>
                </div>}
                <form id="kilometrics-form" className="form-group mb-4" onSubmit={handleSubmit}>
                    <InputDatalist
                        validationWarnings={validationWarnings}
                        setValidationWarnings={setValidationWarnings}
                        label={<FormattedMessage id="provinceLabel" />}
                        name="province"
                        options={provinces}
                        updateValue={setProvinceValue}
                        clearForm={clearForm}
                    />
                    <TextInput
                        validationWarnings={validationWarnings}
                        setValidationWarnings={setValidationWarnings}
                        label={<FormattedMessage id="travelledLabel" />}
                        name="distance"
                        updateValue={setDistance}
                        clearForm={clearForm}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}>Clear</button>
                    {loading && <FaSpinner className="fa-spin ml-3" size="24" />}
                </form>
                {!loading && Object.keys(result).length !== 0 &&
	                <>
                    <p><FormattedMessage id="results1" /><strong>{result.province}</strong><FormattedMessage id="results2" /><strong>{result.provinceRate}</strong><FormattedMessage id="results3" /></p>
                    <p><FormattedMessage id="results4" /><strong>{result.distance}</strong><FormattedMessage id="results5" /><strong>${result.total}</strong></p>
                </>}
            </div>
        </>
    )
}

export default Kilometrics;
