import React from "react"

const InputDatalist = ({validationWarnings, setValidationWarnings, label, name, options, updateValue}) => {
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
                type="text"
                id={name}
                name={name}
                list={`${name}-options`}
                onChange={event => {
                    updateValue(event.target.value)
                }}
            />
            {componentWarnings.map((warning, index) => (
                <small key={index} id={`${name}-error`} className="invalid-feedback">{warning.message}</small>
            ))}
            <datalist id={`${name}-options`}>
                {/* TODO <!--[if lte IE 9]><select><![endif]--> */}
                {options.map((option, index) =>
                    <option key={index} label={option.label} value={option.value}></option>
                )}
                {/* TODO <!--[if lte IE 9]></select><![endif]--> */}
            </datalist>
        </div>
    )
}

export default InputDatalist;
