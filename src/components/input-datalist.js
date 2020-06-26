import React from "react"

const InputDatalist = ({label, name, options, updateValue}) => {

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <input className="form-control" type="text" id={name} name={name} list="suggestions" onChange={event => updateValue(event.target.value)} />
            <datalist id="suggestions">
                {/* TODO <!--[if lte IE 9]><select><![endif]--> */}
                {options.map((option, index) =>
                    <option key={index} label={option.label} value={option.value}></option>
                )}
                {/* TODO <!--[if lte IE 9]></select><![endif]--> */}
            </datalist>
        </div>
    )
}

export default InputDatalist;
