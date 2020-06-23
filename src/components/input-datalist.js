import React, {useState} from "react"

// import { FormattedMessage } from 'react-intl';

const InputDatalist = ({label, name, options}) => {

    const [input, setInput] = useState('')

    console.log('input: ', input);

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} name={name} list="suggestions" onChange={event => setInput(event.target.value)} />
            <datalist id="suggestions">
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
