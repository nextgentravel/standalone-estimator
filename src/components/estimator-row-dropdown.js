import React from "react";
import { FormattedMessage } from 'react-intl';
import InputDatalist from "./input-datalist.js"

const EstimatorRowDropdown = ({ validationWarnings, setValidationWarnings, label, name, option, updateValue, clearForm, id, description, updateCost }) => (

    <div className="row mb-4">
        <div className="col-sm-4 align-self-center">
            <div className="align-self-center">
                {/* i'm not sure how to set this up so that one of the options is a default/placeholder */}
                <InputDatalist
                    validationWarnings={validationWarnings}
                    setValidationWarnings={setValidationWarnings}
                    label={label}
                    name={name}
                    options={option}
                    updateValue={updateValue}
                />
            </div>
        </div>
        <div className="col-sm-2 align-self-center">
            <input type="text" className="form-control" id={`${id}_dropdown`} placeholder="0" name={name} onChange={updateCost}></input>
        </div>
        <div className="col-sm-6 align-self-center text-wrap">
            <FormattedMessage id={description} />
        </div>
    </div>

)

export default EstimatorRowDropdown


