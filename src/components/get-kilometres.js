import React from "react"

const getKilometers = (label, name, updateValue) => {
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <input className="form-control" type="text" id={name} name={name} onChange={event => updateValue(event.target.value)} />
        </div>
    )
}
export default getKilometers;