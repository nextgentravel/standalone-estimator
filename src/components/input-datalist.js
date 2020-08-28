import React from 'react'
import Autocomplete from 'accessible-autocomplete/react'

const InputDatalist = ({validationWarnings, setValidationWarnings, label, name, options, updateValue}) => {
    let showValidationWarning = false;
    let componentWarnings = [];
    const locations = options;
    validationWarnings.forEach(warning => {
        if (warning.path === name) {
            componentWarnings.push(warning);
        }
    })

    function suggest (query, syncResults) {
        var results = options;
        syncResults(query
          ? results.filter(function (result) {
              return result.toLowerCase().indexOf(query.toLowerCase()) !== -1
            })
          : []
        )
      }

    if (componentWarnings.length > 0) {
        showValidationWarning = true;
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div id={`${name}container`}>
                <Autocomplete
                    id={name}
                    source={suggest}
                    element={`${name}container`}
                    displayValue="overlay"

                    onChange={event => {
                        updateValue(event.target.value)
                    }}
                    aria-describedby={`${name}-error`}
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
