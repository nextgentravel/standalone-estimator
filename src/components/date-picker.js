import React, {useState} from "react"

const DatePicker = ({label, name}) => {

    const [date, setDate] = useState('')

    console.log('date selected: ', date);

    return (
        <div className="mb-4">
	        <label htmlFor={name}>{label}</label>
	        <input className="col-12" type="date" id={name} name={name} onChange={event => setDate(event.target.value)}/>
        </div>
    )
}

export default DatePicker;