import 'react-dates/initialize';
import React from "react"
import { DateRangePicker } from 'react-dates';
 import { DateTime } from "luxon";
import moment from 'moment';
import { FaCalendar } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl'

const DatePickerComponent = ({initialStart, setStart, initialEnd, setEnd, focus, onFocus}) => {
    console.log(initialStart);
    return(
        <div className="mb-4">
            <div>
                <FormattedMessage id="estDateRange" />
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
                    screenReaderInputMessage="This is a date range selection tool. (insert directions on how to use here)"
                    required={true}
                    showDefaultInputIcon={true}
                />
            </div>
        </div>
    )
}

export default DatePickerComponent;