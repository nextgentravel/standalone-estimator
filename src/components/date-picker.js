
import React, { useState } from "react"
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import "react-dates/initialize";

const DatePickerComponent = ({startDate, endDate, initialStart, setStart, initialEnd, setEnd, label, screenReaderInputMessage}) => {
    let [focusedInput, setFocusedInput] = useState(null)
    return(
        <div className="mb-4">
            <div>
                <label htmlFor="datepicker-start">{label}</label>
            </div>
            <div className="mb-4">
                <DateRangePicker
                    startDate={startDate}
                    startDateId="datepicker-start"
                    endDate={endDate}
                    endDateId="datepicker-end"
                    onDatesChange={({ startDate, endDate }) => {
                        setStart(startDate)
                        setEnd(endDate)
                    }}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                    screenReaderInputMessage={screenReaderInputMessage}
                    required={true}
                    showDefaultInputIcon={true}
                    displayFormat="DD-MM-YYYY"
                />
            </div>
        </div>
    )
}

export default DatePickerComponent;