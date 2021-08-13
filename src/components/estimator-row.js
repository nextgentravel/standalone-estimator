import React from "react";
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { FormattedMessage } from "react-intl";

const ConditionalWrap = ({ condition, wrap, children }) => (
    condition ? wrap(children) : children
);

const EstimatorRow = ({ name, id, message, icon, title, updateCost, calculateTotal, value, tooltipIcon, tooltipText, readOnly, result, overlayRender, locale, ariaLabel, toolTipLabel }) => {
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
                                <button type="button" className="btn btn-default" aria-label={toolTipLabel}>
                                    <TooltipIcon className="mb-1" size="15" fill="#9E9E9E" />
                                </button>
                            </OverlayTrigger>
                        }
                        </label>
                </div>
            </div>
            <div className="col-sm-3 align-self-center">
            <ConditionalWrap
                condition={!result}
                wrap={children => (
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={overlayRender}
                    >{children}</OverlayTrigger>)}
            >
                <div className="input-group mb-2">
                    {locale === 'en-ca' &&
                        <div className='input-group-prepend'>
                            <span className="input-group-text" id={`${name}-dollar-sign`}>$</span>
                        </div>
                    }
                    <input
                        readOnly={readOnly}
                        aria-readonly={readOnly}
                        type="text"
                        value={value}
                        className="form-control"
                        id={id}
                        name={name}
                        aria-label={ariaLabel}
                        onChange={(e) => {
                            if (!result) return;
                            updateCost(e.target.value)
                        }}
                        onBlur={(e) => {
                            if (isNaN(parseFloat(e.target.value))) {
                                updateCost(parseFloat(0.00).toFixed(2))
                            } else {
                                updateCost(parseFloat(e.target.value).toFixed(2) || 0.00)
                            }
                            calculateTotal();
                        }}
                        type="number"
                        min="0"
                    >
                    </input>
                    {locale === 'fr-ca' &&
                        <div className='input-group-append'>
                            <span className="input-group-text" id={`${name}-dollar-sign`}>$</span>
                        </div>
                    }

                </div>
            </ConditionalWrap>




                
            </div>
            <div className="col-sm-5 align-self-center text-wrap mb-2">
                {message && message.element}
            </div>
        </div>
    
    )
}   



export default EstimatorRow
