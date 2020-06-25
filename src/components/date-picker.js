import React from "react"

const DatePicker = ({label, name, updateValue}) => {

    return (
        <div className="mb-4">
	        <label htmlFor={name}>{label}</label>
	        <input class="form-control" type="date" id={name} name={name} onChange={event => updateValue(event.target.value)}/>
        </div>
    )
}

export default DatePicker;