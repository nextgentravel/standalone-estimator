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

    let today = new Date()
    let tomorrow = today.setDate(today.getDate() + 1);

    return (
        <div className="mb-4">
	        <label htmlFor={name}>{label}</label>
            <br/>

            {/* <DatePicker onSelect={date => updateValue(DateTime.fromJSDate(date))} className="dp-calendar">
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
            </DatePicker> */}


            <DatePicker className="dp-wrapper"
                minDate={today}
                onSelect={date => updateValue(DateTime.fromJSDate(date))}>
                <DatePickerInput className="form-control" />

                <DatePickerCalendar className="dp-calendar">
                <div className="dp-top-bar">
                    <DatePickerButton
                    className="dp-button"
                    aria-label="Switch to the previous month."
                    updateMonth={({ prev }) => prev()}
                    >
                    <svg focusable="false" viewBox="0 0 1000 1000" aria-hidden="true">
                        <path d="M336 275L126 485h806c13 0 23 10 23 23s-10 23-23 23H126l210 210c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7L55 524c-11-11-11-21 0-32l249-249c21-22 53 10 32 32z" />
                    </svg>
                    </DatePickerButton>
                    <DatePickerMonth className="dp-month" />
                    <DatePickerButton
                    className="dp-button"
                    aria-label="Switch to the next month."
                    updateMonth={({ next }) => next()}
                    >
                    <svg focusable="false" viewBox="0 0 1000 1000" aria-hidden="true">
                        <path d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z" />
                    </svg>
                    </DatePickerButton>
                </div>
                <DatePickerTable className="dp-table" />
                </DatePickerCalendar>
            </DatePicker>

            {componentWarnings.map((warning, index) => (
                <small key={index} id={`${name}-error`} className="invalid-feedback">{warning.message}</small>
            ))}
        </div>
    )
}

export default DatePickerComponent;