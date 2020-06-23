import React, {useState} from "react"

const DatePicker = ({label, name, updateValue}) => {

    return (
        <div className="mb-4">
	        <label htmlFor={name}>{label}</label>
	        <input className="col-12" type="date" id={name} name={name} onChange={event => updateValue(event.target.value)}/>
        </div>
    )
}

export default DatePicker;