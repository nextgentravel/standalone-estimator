import React from 'react'
import 'unorm';
import Autocomplete from 'accessible-autocomplete/react'
import { FaPlane } from 'react-icons/fa';
import { renderToString } from 'react-dom/server'

const InputDatalist = ({validationWarnings, setValidationWarnings, label, name, options, updateValue}) => {
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