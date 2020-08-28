import 'react-dates/initialize';
import React, {useState} from "react"
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { DateTime } from "luxon";

const DatePicker = ({validationWarnings, setValidationWarnings, label, name, updateValue}) => {
    let showValidationWarning = false;
    let componentWarnings = []
    validationWarnings.forEach(warning => {
        if (warning.path === name) {
            componentWarnings.push(warning);
        }
    })

    let aday = DateTime;

    const [datestate, setDate] = useState('');
    const [focusstate, setFocus] = useState(false);

    if (componentWarnings.length > 0) {
        showValidationWarning = true;
    }

    return (
        <div className="mb-4">
	        <label htmlFor={name}>{label}</label>
            <br/>
            <SingleDatePicker
                date={datestate}
                onDateChange={date => setDate(date)}
                focused={focusstate}
                onFocusChange={({ focused }) => setFocus(focused)}
                id={name}
                showClearDate={true}
                reopenPickerOnClearDate={true}
                className={showValidationWarning ? 'form-control is-invalid' : 'form-control' }
            />
            {/* <input
                aria-describedby={`${name}-error`}
                type="date"
                id={name}
                name={name}
                onChange={event => {
                    updateValue(event.target.value)
                }}
            /> */}
            {componentWarnings.map((warning, index) => (
                <small key={index} id={`${name}-error`} className="invalid-feedback">{warning.message}</small>
            ))}
        </div>
    )
}

export default DatePicker;