import 'react-dates/initialize';
import React from "react"
import DateRangePicker from 'react-dates';
/* import {
    DatePicker,
    DatePickerCalendar,
    DatePickerMonth,
    DatePickerButton,
    DatePickerTable,
    DatePickerInput
  } from '@reecelucas/react-datepicker'; */
 import { DateTime } from "luxon";
import moment from 'moment';
import { FaCalendar } from 'react-icons/fa';

//this is stll broken atm but also even when it works it won't do validation beyond what's included yet, but at the same time it has a built-in required flag and won't allow dates out of order, so it should be fine
const DatePickerComponent = ({initialStart, setStart, startlabel, initialEnd, setEnd, endLabel, focus, onFocus}) => {
    // i think i might be using luxon wrong?
    console.log(initialStart);
    let start = moment(initialStart.toJSDate()); // should work, they're luxon dates
    let end = moment(initialEnd.toJSDate()); // current attempt here to make moment work is turn luxon to js to moment and the reverse after
    //which is overly complex but i'm not really sure how else to do it - neither class has a direct method or anything
    return(
        <div>
            <DateRangePicker
                startDate={start} // these should work, though it also stores the dates in the same place i think?
                startDateId={startlabel} // i think not right
                endDate={end} // idk if anything is working
                endDateId={endLabel} // i think not working
                OnDatesChange={setStart(DateTime.fromJSDate(start.toDate())), setEnd(DateTime.fromJSDate(end.toDate()))} //also very broken
                focusedInput={focus} // should be working? set up like in example, but the guide is super unclear
                onFocusChange={onFocus} // same as one above
                screenReaderInputMessage="This is a date range selection tool. (insert directions on how to use here)"
                required={true}
            />
        </div>
    )

    /*     // let showValidationWarning = false;
    let componentWarnings = []
    validationWarnings.forEach(warning => {
        if (warning.path === name) {
            componentWarnings.push(warning);
        }
    })

    // if (componentWarnings.length > 0) {
    //     showValidationWarning = true;
    // }

    let today = new Date()

    return (
        <div className="mb-4">
	        <label htmlFor={name}>{label}</label>
            <br/>
            <DatePicker
                className="dp-wrapper"
                id={`datepicker-${name}`}
                minDate={today}
                initialDate={initialDate.toJSDate()}
                onSelect={date => updateValue(DateTime.fromJSDate(date))}
            >
                <div className="input-group mb-3">
                    <DatePickerInput id={name} className="form-control" dateFormat={'yyyy-MM-dd'} />
                    <div className="input-group-append">
                        <span className="input-group-text bg-light" id="calendar"><FaCalendar /></span>
                    </div>
                </div>

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
        </div> */
    //)
}

export default DatePickerComponent;