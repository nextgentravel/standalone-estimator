import React from "react"

const DatePicker = ({validationWarnings, setValidationWarnings, label, name, updateValue}) => {
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

    return (
        <div className="mb-4">
	        <label htmlFor={name}>{label}</label>
            <input
                aria-describedby={`${name}-error`}
                className={showValidationWarning ? 'form-control is-invalid' : 'form-control' }
                type="date"
                id={name}
                name={name}
                onChange={event => {
                    updateValue(event.target.value)
                }}
            />
            {componentWarnings.map((warning, index) => (
                <small key={index} id={`${name}-error`} className="invalid-feedback">{warning.message}</small>
            ))}
        </div>
    )
}

export default DatePicker;