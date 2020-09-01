import React from "react"

// Missing curly braces here which led to the 'object not valid as react children' error

const TextInput = ({validationWarnings, setValidationWarnings, label, name, updateValue}) => {
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
                type="text" id={name}
                name={name}
                onChange={event => updateValue(event.target.value)} />
            {componentWarnings.map((warning, index) => (
                <small key={index} id={`${name}-error`} className="invalid-feedback">{warning.message}</small>
            ))}
        </div>
    )
}
export default TextInput;