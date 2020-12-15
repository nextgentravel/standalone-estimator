import 'react-dates/initialize';
import React from "react"
import { DateRangePicker } from 'react-dates';
 import { DateTime } from "luxon";
import moment from 'moment';
import { FaCalendar } from 'react-icons/fa';

const DatePickerComponent = ({initialStart, setStart, startlabel, initialEnd, setEnd, endLabel, focus, onFocus}) => {
    console.log(initialStart);
    let start = moment(initialStart.toJSDate());
    let end = moment(initialEnd.toJSDate());
    return(
        <div>
            <DateRangePicker
                startDate={start}
                startDateId="datepicker-start"
                endDate={end}
                endDateId="datepicker-end"
                onDatesChange={() => {setStart(DateTime.fromJSDate(start.toDate()));setEnd(DateTime.fromJSDate(end.toDate()))}}
                focusedInput={focus}
                onFocusChange={onFocus}
                screenReaderInputMessage="This is a date range selection tool. (insert directions on how to use here)"
                required={true}
            />
        </div>
    )
}

export default DatePickerComponent;