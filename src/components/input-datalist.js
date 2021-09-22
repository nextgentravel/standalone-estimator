import React from 'react'
import 'unorm';
import Autocomplete from 'accessible-autocomplete/react'

const InputDatalist = ({validationWarnings, setValidationWarnings, label, name, options, updateValue, localeCopy}) => {
    let showValidationWarning = false;
    let componentWarnings = [];

    validationWarnings.forEach(warning => {
        if (warning.path === name) {
            componentWarnings.push(warning);
        }
    })

    if (componentWarnings.length > 0) {
        showValidationWarning = true;
    }

    const find = (key, array) => {
        return array.filter(item => {
            return item.searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(key.toLowerCase()) !== -1
        });
    }
    
    const source = (query, populateResults) => {
        const places = options
        const results = find(query, places);
        populateResults(results);
    }
    
    const templates = {
        inputValue: (value) => {
          if (!value) {
            return '';
          }
          return value.searchTerm;
        },
        suggestion: (value) => {
            return value.label;
        }
    }
    
    // autocomplete_no_results
    // autocomplete_query_too_short
    // autocomplete_status_selected_option
    // autocomplete_status_no_results
    // autocomplete_assistive_hint


    return (
        <div className="mb-4">
            <label htmlFor={`autocomplete-${name}`}>{label}</label>
            <div id={`${name}container`}>
                <Autocomplete
                    id={`autocomplete-${name}`}
                    templates={templates}
                    source={source}
                    element={`${name}container`}
                    confirmOnBlur={false}
                    displayValue="overlay"
                    onConfirm={value => {
                        updateValue(value)
                    }}
                    className={showValidationWarning ? 'form-control is-invalid' : 'form-control' }
                    tNoResults={() => localeCopy.autocomplete_no_results}
                    tStatusQueryTooShort={(minQueryLength) => {
                        let message = localeCopy.autocomplete_query_too_short
                        message = message.replace('{minQueryLength}', minQueryLength)
                        return message
                    }}
                    tStatusNoResults={() => localeCopy.autocomplete_status_no_results}
                    tStatusSelectedOption={(selectedOption, length, index) => {
                        let message = localeCopy.autocomplete_status_selected_option
                        message = message.replace('{selectedOption}', selectedOption)
                        message = message.replace('{length}', length)
                        message = message.replace('{index}', index + 1)
                        return message;
                    }}
                    tAssistiveHint={() => { return localeCopy.autocomplete_assistive_hint }}
                />
                {/* <small id={`autocomplete-help-${name}`} class="form-text pl-1">{localeCopy.autocomplete_assistive_hint}</small> */}
            </div>
            {componentWarnings.map((warning, index) => (
                <small key={index} id={`${name}-error`} className="invalid-feedback">{warning.message}</small>
            ))}
        </div>
    )
}

export default InputDatalist;