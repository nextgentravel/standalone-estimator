import 'react-dates/initialize';
import React, {useState} from "react"
// import { SingleDatePicker} from 'react-dates';
import {
    DatePicker,
    DatePickerCalendar,
    DatePickerMonth,
    DatePickerButton,
    DatePickerTable,
    DatePickerInput
  } from '@reecelucas/react-datepicker';
import 'react-dates/lib/css/_datepicker.css';
import { DateTime } from "luxon";
import { FormattedMessage } from 'react-intl';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DatePickerComponent = ({validationWarnings, setValidationWarnings, label, name, updateValue}) => {
    let showValidationWarning = false;
    let componentWarnings = []
    validationWarnings.forEach(warning => {
        if (warning.path === name) {
            componentWarnings.push(warning);
        }
    })

    if (componentWarnings.length > 0) {
        showValidationWarning = true;
    }

    return (
        <div className="mb-4">
	        <label htmlFor={name}>{label}</label>
            <br/>

            <DatePicker  onSelect={date => updateValue(DateTime.fromJSDate(date))}>
                <DatePickerInput className={showValidationWarning ? 'form-control is-invalid' : 'form-control' }/>
                <DatePickerCalendar className='table'>
                    <DatePickerButton className='btn' updateMonth={({ prev }) => prev()}>
                        <FaChevronLeft />
                    </DatePickerButton>
                    <DatePickerMonth className='lead' />
                    <DatePickerButton className='btn' updateMonth={({ next }) => next()}>
                        <FaChevronRight />
                    </DatePickerButton>
                    <DatePickerTable />
                </DatePickerCalendar>
            </DatePicker>

            {/* <SingleDatePicker
                date={null}
                onDateChange={date => {
                    ;
                }}
                focused={focusstate}
                onFocusChange={({ focused }) => setFocus(focused)}
                id={name}
                showClearDate={true}
                reopenPickerOnClearDate={true}
                // How do we pass a className to this component?
                // className={showValidationWarning ? 'form-control is-invalid' : 'form-control' }
            /> */}
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

export default DatePickerComponent;