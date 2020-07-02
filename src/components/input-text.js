import React from "react"

// Missing curly braces here which led to the 'object not valid as react children' error

const TextInput = ({label, name, updateValue}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <input className="form-control" type="text" id={name} name={name} onChange={event => updateValue(event.target.value)} />
        </div>
    )
}
export default TextInput;