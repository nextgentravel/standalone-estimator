import React from "react"

// import { FormattedMessage } from 'react-intl';

const InputDatalist = ({label, options}) => {

    const onChange = (e) => {
        console.log(e);
    };

    return (
        <div>
            <label htmlFor="city">{label}</label>
            <input type="text" id="city" name="city" list="suggestions" onChange={onChange} />
            <datalist id="suggestions">
                {/* <!--[if lte IE 9]><select><![endif]--> */}
                {options.map((option, index) =>
                    <option key={index} label={option.label} value={option.value}></option>
                )}
                {/* <!--[if lte IE 9]></select><![endif]--> */}
            </datalist>
        </div>
    )
}

export default InputDatalist;