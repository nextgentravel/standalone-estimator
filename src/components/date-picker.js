
import React, { useState } from "react"
import { DateRangePicker } from 'react-dates';
import "react-dates/initialize";
import moment from "moment";
import "moment/min/locales.min";

const DatePickerComponent = ({startDate, endDate, initialStart, setStart, initialEnd, setEnd, label, screenReaderInputMessage, localeCopy, locale}) => {
    let [focusedInput, setFocusedInput] = useState(null)
    moment.locale(locale.substring(0,2));
    let phrases = {
        calendarLabel: localeCopy.datepicker_calendar_label,
        roleDescription: localeCopy.datepicker_role_description,
        closeDatePicker: localeCopy.datepicker_close,
        focusStartDate: localeCopy.date_picker_focus_start_date,
        clearDate: localeCopy.datepicker_clear_date,
        clearDates: localeCopy.datepicker_clear_dates,
        jumpToPrevMonth: localeCopy.datepicker_jump_to_prev_month,
        jumpToNextMonth: localeCopy.datepicker_jump_to_next_month,
        keyboardShortcuts: localeCopy.datepicker_keyboard_shortcuts,
        showKeyboardShortcutsPanel: localeCopy.datepicker_showkeyboard_shortcuts_panel,
        hideKeyboardShortcutsPanel: localeCopy.datepicker_hide_keyboard_shortcuts_panel,
        openThisPanel: localeCopy.datepicker_open_this_panel,
        enterKey: localeCopy.datepicker_enter_key,
        leftArrowRightArrow: localeCopy.datepicker_left_arrow_right_arrow,
        upArrowDownArrow: localeCopy.datepicker_up_arrow_down_arrow,
        pageUpPageDown: localeCopy.datepicker_page_up_page_down,
        homeEnd: localeCopy.datepicker_home_end,
        escape: localeCopy.datepicker_escape,
        questionMark: localeCopy.datepicker_question_mark,
        selectFocusedDate: localeCopy.datepicker_select_focused_date,
        moveFocusByOneDay: localeCopy.datepicker_move_focus_by_one_day,
        moveFocusByOneWeek: localeCopy.datepicker_move_focus_by_one_week,
        moveFocusByOneMonth: localeCopy.datepicker_move_focus_by_one_month,
        moveFocustoStartAndEndOfWeek: localeCopy.datepicker_move_focus_to_start_and_end_of_week,
        returnFocusToInput: localeCopy.datepicker_return_focus_to_input,
        keyboardForwardNavigationInstructions: localeCopy.datepicker_keyboard_forward_navigation_instructions,
        keyboardBackwardNavigationInstructions: localeCopy.datepicker_keyboard_backward_navigation_instructions,
        chooseAvailableStartDate: localeCopy.datepicker_choose_available_start_date,
        chooseAvailableEndDate: localeCopy.datepicker_choose_available_end_date,
        dateIsUnavailable: localeCopy.datepicker_date_is_unavailable,
        dateIsSelected: localeCopy.datepicker_date_is_selected,
        dateIsSelectedAsStartDate: localeCopy.datepicker_date_is_selected_as_start_date,
        dateIsSelectedAsEndDate: localeCopy.datepicker_date_is_selected_as_end_date,
    }

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
                    displayFormat="YYYY-MM-DD"
                    phrases={phrases}
                    startDatePlaceholderText={localeCopy.datepicker_start_date}
                    endDatePlaceholderText={localeCopy.datepicker_end_date}
                />
            </div>
        </div>
    )
}

export default DatePickerComponent;