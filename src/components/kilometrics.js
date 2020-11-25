import React, {useState, useEffect} from "react"
import locations from "../data/locations.js"
import TextInput from "./input-text.js";
import InputDatalist from "./input-datalist.js"
import * as yup from "yup"
import { FaSpinner } from 'react-icons/fa';
import { FormattedMessage } from "react-intl";

const Kilometrics = () => {

    const [province, setProvinceValue] = useState('');
    const [distance, setDistance] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [provinceCheck, setProvinceCheck] = useState([]);

    const [result, setResult] = useState({});

    const [loading, setLoading] = useState(false);

    const [validationWarnings, setValidationWarnings] = useState([]);
    const [errorPanel, setErrorPanel] = useState(false);

    useEffect(() => {
        let provinceOptions = Object.keys(locations)
        .map(location => {
            return {
               value: `${locations[location].label} (${location})`,
               label: `${locations[location].label} (${location})`,
            }
        })
        setProvinces(provinceOptions);
        provinceOptions = Object.keys(locations)
        .map(location => {
            return `${locations[location].label} (${location})`;
        })
        setProvinceCheck(provinceOptions);
    }, []);

    const handleValidation = () => {
        let target = {province, distance};
        console.log('target', target)
        let schema = yup.object().shape({
            province: yup
                .string()
                .required(<FormattedMessage id="kilometricsRequireProvince"/>)
                .test(
                    <FormattedMessage id="kilometricsProvinceNotValid"/>,
                    <FormattedMessage id="kilometricsProvinceValid"/>,
                    (value) => {
                        return provinceCheck.includes(value)
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
                console.log(province.lastIndexOf('(') + 1, 2);
                let provinceAbbreviation = province.substr(province.lastIndexOf('(') + 1, 2)
                let provinceRate = locations[provinceAbbreviation].rateCents
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
        setProvinceValue('');
        setDistance('');
        setResult({});
        setValidationWarnings([]);
        setErrorPanel(false);
        document.getElementById("kilometrics-form").reset();
        // START OF HACK This is a hack to programatically clear the autocomplete inputs

        let destinationElement = document.querySelector('#autocomplete-province')
        let clearFormButton = document.querySelector('#clear-button')

        destinationElement.value = "";
        destinationElement.click();
        destinationElement.focus();
        destinationElement.blur();

        // END OF HACK


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
                    <button type="submit" className="btn btn-primary"><FormattedMessage id="submit" /></button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}><FormattedMessage id="clear" /></button>
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
