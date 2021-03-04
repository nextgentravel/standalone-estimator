import React from "react";
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const ConditionalWrap = ({ condition, wrap, children }) => (
    condition ? wrap(children) : children
);

const EstimatorRow = ({ name, id, message, icon, title, updateCost, calculateTotal, value, tooltipIcon, tooltipText, disabled, result, overlayRender }) => {
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
                        <label htmlFor={id}>{title}
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
            <ConditionalWrap
                condition={!result}
                wrap={children => (
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={overlayRender}
                    >{children}</OverlayTrigger>)}
            >
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
                    }}
                    onBlur={(e) => {
                        console.log(e.target.value)
                        if (isNaN(parseFloat(e.target.value))) {
                            updateCost(parseFloat(0.00).toFixed(2))
                        } else {
                            updateCost(parseFloat(e.target.value).toFixed(2) || 0.00)
                        }
                        calculateTotal();
                    }}
                >
                </input>
            </ConditionalWrap>




                
            </div>
            <div className="col-sm-6 align-self-center text-wrap mb-2">
                {message && message.element}
            </div>
        </div>
    
    )
}   



export default EstimatorRow
