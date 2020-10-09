import React, { useState, useRef } from "react";
import { FormattedMessage } from 'react-intl';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
const EstimatorRow = ({ name, id, message, icon, title, updateCost, calculateTotal, value, tooltipIcon, tooltipText }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const target = useRef(null);

    const TooltipIcon = tooltipIcon ? tooltipIcon : null;

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {tooltipText}
        </Tooltip>
      );


    return (
        <div className="row mb-4">
            <div className="col-sm-4 align-self-center">
                <div className="align-self-center">
                    {icon}
                        <span><FormattedMessage id={title} />
                        {tooltipIcon &&
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <TooltipIcon className="ml-2" size="15" fill="#9E9E9E" />
                            </OverlayTrigger>
                        }
                        </span>
                </div>
            </div>
            <div className="col-sm-2 align-self-center">
                <input
                    type="text"
                    value={value}
                    className="form-control"
                    id={id}
                    placeholder="0"
                    name={name}
                    onChange={(e) => {updateCost(e.target.value)}} onBlur={calculateTotal}></input>
            </div>
            <div className="col-sm-6 align-self-center text-wrap">
                {message && message.element}
            </div>
        </div>
    
    )
}   



export default EstimatorRow
