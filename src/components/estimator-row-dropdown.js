import React from "react";
import { FormattedMessage } from 'react-intl';

const EstimatorRowDropdown = ({ validationWarnings, setValidationWarnings, label, name, option, updateValue, clearForm, id, description, updateCost, calculateTotal }) => (

    <div className="row mb-4">
        <div className="col-sm-12 mb-2">
            {label}
        </div>
        <div className="col-sm-4 align-self-center">
            <div className="align-self-center">
                {/* i'm not sure how to set this up so that one of the options is a default/placeholder */}
                <div>
                    {/* <label htmlFor={name}>{label}</label> */}
                    <div id={`${name}container`}>
                    <select className="custom-select">
                        <option defaultValue>Select accommodation type</option>
                        <option value="1">Hotel</option>
                        <option value="2">Private Accommodation</option>
                    </select>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-sm-2 align-self-center">
            <input type="text" className="form-control" id={`${id}_dropdown`} placeholder="0" name={name} onChange={(e) => {updateCost(e.target.value)}} onBlur={calculateTotal}></input>
        </div>
        <div className="col-sm-6 align-self-center text-wrap">
            <FormattedMessage id={description} />
        </div>
    </div>

)

export default EstimatorRowDropdown


