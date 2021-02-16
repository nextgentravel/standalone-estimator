import React from "react";
import { FormattedMessage } from 'react-intl';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const EstimatorRow = ({ name, id, message, icon, title, updateCost, calculateTotal, value, tooltipIcon, tooltipText, disabled, result }) => {
    const TooltipIcon = tooltipIcon ? tooltipIcon : null;

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {tooltipText}
        </Tooltip>
      );


    return (
        <div className="row mb-4">
            <div className="col-sm-4 align-self-center mb-2">
                <div className="align-self-center">
                    {icon}
                        <label htmlFor={id}><FormattedMessage id={title} />
                        {tooltipIcon &&
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <TooltipIcon className="ml-2" size="15" fill="#9E9E9E" />
                            </OverlayTrigger>
                        }
                        </label>
                </div>
            </div>
            <div className="col-sm-2 align-self-center">
                <input
                    disabled={disabled}
                    type="text"
                    value={value}
                    className="form-control mb-2"
                    id={id}
                    name={name}
                    onChange={(e) => {
                        if (!result) return;
                        updateCost(e.target.value)
                    }} onBlur={calculateTotal}
                    ></input>
            </div>
            <div className="col-sm-6 align-self-center text-wrap mb-2">
                {message && message.element}
            </div>
        </div>
    
    )
}   



export default EstimatorRow
