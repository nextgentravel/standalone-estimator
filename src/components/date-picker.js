import 'react-dates/initialize';
import React from "react"
import { DateRangePicker } from 'react-dates';
 import { DateTime } from "luxon";
import moment from 'moment';

const DatePickerComponent = ({initialStart, setStart, initialEnd, setEnd, focus, onFocus, label, screenReaderInputMessage}) => {
    return(
        <div className="mb-4">
            <div>
                <label htmlFor="datepicker-start">{label}</label>
            </div>
            <div className="mb-4">
                <DateRangePicker
                    startDate={moment(initialStart.toJSDate())}
                    startDateId="datepicker-start"
                    endDate={moment(initialEnd.toJSDate())}
                    endDateId="datepicker-end"
                    onDatesChange={({ startDate, endDate }) => {
                        if(startDate){
                            setStart(DateTime.fromJSDate(startDate.toDate()))
                        }
                        if(endDate){
                            setEnd(DateTime.fromJSDate(endDate.toDate()))
                        }
                    }}
                    focusedInput={focus}
                    onFocusChange={onFocus}
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