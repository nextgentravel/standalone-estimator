import React from 'react'
import Autocomplete from 'accessible-autocomplete/react'

const InputDatalist = ({validationWarnings, setValidationWarnings, label, name, options, updateValue}) => {
    let showValidationWarning = false;
    let componentWarnings = [];

    validationWarnings.forEach(warning => {
        if (warning.path === name) {
            componentWarnings.push(warning);
        }
    })

    function suggest(query, syncResults) {
        var results = options.map((option) => option.label);
        syncResults(query
          ? results.filter(function (result) {
              return result.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(query.toLowerCase()) !== -1
            })
          : []
        )
    }

    if (componentWarnings.length > 0) {
        showValidationWarning = true;
    }

    return (
        <div className="mb-4">
            <label htmlFor={`autocomplete-${name}`}>{label}</label>
            <div id={`${name}container`}>
                <Autocomplete
                    id={`autocomplete-${name}`}
                    source={suggest}
                    element={`${name}container`}
                    confirmOnBlur={false}
                    displayValue="overlay"
                    onConfirm={value => {
                        // do our validation here?
                        // if this is a valid option, then:
                        value = value.replace(',','');
                        updateValue(value)
                        // if not, set it to blank, so it will fail validation
                    }}
                    aria-describedby={`autocomplete-${name}`}
                    className={showValidationWarning ? 'form-control is-invalid' : 'form-control' }
                />
            </div>
            {componentWarnings.map((warning, index) => (
                <small key={index} id={`${name}-error`} className="invalid-feedback">{warning.message}</small>
            ))}
        </div>
    )
}

export default InputDatalist;