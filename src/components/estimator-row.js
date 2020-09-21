import React from "react";
import { FormattedMessage } from 'react-intl';

const EstimatorRow = ({ name, id, description, icon, title, updateCost }) => (

    <div className="row mb-4">
        <div className="col-sm-4 align-self-center">
            <div className="align-self-center">
                {icon}
                <span><FormattedMessage id={title} /></span>
            </div>
        </div>
        <div className="col-sm-2 align-self-center">
            <input type="text" className="form-control" id={id} placeholder="0" name={name} onChange={updateCost}></input>
        </div>
        <div className="col-sm-6 align-self-center text-wrap">
            <FormattedMessage id={description} />
        </div>
    </div>

)

export default EstimatorRow

