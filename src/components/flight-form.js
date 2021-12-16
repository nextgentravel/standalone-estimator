import React, { useState } from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaSpinner } from 'react-icons/fa';
import * as yup from "yup"


const FlightForm = (props) => {

    function formattedMessage(prismicKey, classes) {
        let messageType = typeof props.messages[prismicKey]
        let message;
        if (messageType === 'string') {
            message = props.messages[prismicKey]
        } else if (messageType === 'object' && props.messages[prismicKey] !== null) {
            message = <span className={classes} dangerouslySetInnerHTML={{ __html: props.messages[prismicKey].html }}></span>
        } else {
            message = 'MISSING MESSAGE ' + prismicKey
        }
        return message
    }

    let validationErrors = props.validationWarnings || []
    let [screenReaderStatus, setScreenReaderStatus] = useState('');
    const handleSubmitFlightRequestValidation = () => {
        let target = {
            originAirportCode: props.originAirportCode,
            destinationAirportCode: props.destinationAirportCode,
            departureTime: props.departureTime,
            returnTime: props.returnTime,
            departureOffset: props.departureOffset,
            returnOffset: props.returnOffset
        };
        let schema = yup.object().shape({
            originAirportCode: yup
                .string()
                .typeError(' is required')
                .required(),
            destinationAirportCode: yup
                .string()
                .typeError(' is required')
                .required(),
            departureTime: yup
                .string()
                .typeError(' is required')
                .required(),
            returnTime: yup
                .string()
                .typeError(' is required')
                .required(),
            departureOffset: yup
                .string()
                .typeError(' is required')
                .required(),
            returnOffset: yup
                .string(),
        });
        return schema.validate(target, {abortEarly: false})
    }

    const localCurrencyDisplay = (string) => {
        if (string) {
            return string.toLocaleString(props.locale, {minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'CAD', currencyDisplay: 'symbol'}).replace('CA', '')
        } else {
            return ''
        }
        
    }

    let times = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

    let hourAbbreviation = props.locale === 'en-ca' ? 'hour' : 'heure';

    let offsetOptions = [
        {
            label: `+ / − 1 ${hourAbbreviation}`,
            value: 1,
        },
        {
            label: `+ / − 2 ${hourAbbreviation}`,
            value: 2,
        },
        {
            label: `+ / − 3 ${hourAbbreviation}`,
            value: 3,
        },
        {
            label: `+ / − 4 ${hourAbbreviation}`,
            value: 4,
        },
        {
            label: `+ / − 5 ${hourAbbreviation}`,
            value: 5
        },
        {
            label: `+ / − 6 ${hourAbbreviation}`,
            value: 6,
        },
        {
            label: `+ / − 7 ${hourAbbreviation}`,
            value: 7,
        },
        {
            label: `+ / − 9 ${hourAbbreviation}`,
            value: 9,
        },
        {
            label: `+ / − 10 ${hourAbbreviation}`,
            value: 10,
        },
        {
            label: `+ / − 11 ${hourAbbreviation}`,
            value: 11,
        },
        {
            label: `+ / − 12 ${hourAbbreviation}`,
            value: 12,
        },
    ]

    let [flightLoading, setFlightLoading] = useState(false);
    
    let validationErrorList = validationErrors.map(a => a.path) || [];

    let departureHeader = props.messages.flight_modal_leaving_header.replace('{originCity}', props.origin.acrdName).replace('{departureDate}', props.departureDate)

    let returnHeader = props.messages.flight_modal_return_header.replace('{destinationCity}', props.destination.acrdName).replace('{returnDate}', props.returnDate)

    return (
        <>
            <Form noValidate>
                <h3 className="mb-4">{departureHeader}</h3>
                <Form.Group as={Row} controlId="originAirport">
                    <Form.Label column sm="4">{props.messages.flight_modal_origin_airport_label}</Form.Label>
                    <Col sm="8">
                        <Form.Control as="select"
                            value={props.originAirportCode}
                            onChange={(e) => {
                                props.setOriginAirportCode(e.target.value)
                            }}
                            isInvalid={validationErrorList.includes('originAirport')}
                        >
                            {props.origin.airports.filter((item) => item.distance.value < 300).map((item, index) => {
                                return (
                                    <option key={index} value={item.iataCode}>{props.locale === 'en-ca' ? `${item.englishLabel} (${item.iataCode})` : `${item.frenchLabel} (${item.iataCode})`}</option>
                                )
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {props.messages.email_form_field_required}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-5">
                    <Form.Label htmlFor="departureTime" column sm="4">{props.messages.flight_modal_departure_time_label}</Form.Label>
                    <Col sm="4">
                        <Form.Control as="select"
                            id="departureTime"
                            value={props.departureTime}
                            onChange={(e) => {
                                props.setDepartureTime(e.target.value)
                            }}
                            isInvalid={validationErrorList.includes('departureTime')}
                        >
                            <option value='' disabled>{props.messages.select}</option>
                            {times.map((item, index) => {
                                return (
                                    <option key={index} value={item}>{item}</option>
                                )
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {props.messages.email_form_field_required}
                        </Form.Control.Feedback>
                    </Col>
                    <Col sm="4">
                        <Form.Label htmlFor="originOffset" srOnly>{props.messages.flight_modal_departure_time_offset_label}</Form.Label>
                        <Form.Control as="select"
                            id="originOffset"
                            value={props.departureOffset}
                            onChange={(e) => {
                                props.setDepartureOffset(e.target.value)
                            }}
                            isInvalid={validationErrorList.includes('originOffset')}
                        >
                            {offsetOptions.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {props.messages.email_form_field_required}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <h3 className="mb-4">{returnHeader}</h3>
                <Form.Group as={Row} controlId="destinationAirport">
                    <Form.Label column sm="4">{props.messages.flight_modal_destination_airport_label}</Form.Label>
                    <Col sm="8">
                        <Form.Control as="select"
                            value={props.destinationAirportCode}
                            onChange={(e) => {
                                props.setDestinationAirportCode(e.target.value)
                            }}
                            isInvalid={validationErrorList.includes('destinationAirport')}
                        >
                            {props.destination.airports.filter((item) => item.distance.value < 300).map((item, index) => {
                                return (
                                    <option key={index} value={item.iataCode}>{props.locale === 'en-ca' ? `${item.englishLabel} (${item.iataCode})` : `${item.frenchLabel} (${item.iataCode})`}</option>
                                )
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {props.messages.email_form_field_required}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Form.Label column sm="4">{props.messages.flight_modal_return_time_label}</Form.Label>
                    <Col sm="4">
                        <Form.Control as="select"
                            value={props.returnTime}
                            id="returnTime" 
                            onChange={(e) => {
                                props.setReturnTime(e.target.value)
                            }}
                            isInvalid={validationErrorList.includes('returnTime')}
                        >
                            <option value='' disabled>{props.messages.select}</option>
                            {times.map((item, index) => {
                                return (
                                    <option key={index} value={item}>{item}</option>
                                )
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {props.messages.email_form_field_required}
                        </Form.Control.Feedback>
                    </Col>
                    <Col sm="4">
                    <Form.Label htmlFor="returnOffset" srOnly>{props.messages.flight_modal_return_time_offset_label}</Form.Label>
                        <Form.Control as="select"
                            id="returnOffset"
                            value={props.returnOffset}
                            onChange={(e) => {
                                props.setReturnOffset(e.target.value)
                            }}
                            isInvalid={validationErrorList.includes('returnOffset')}
                        >
                            {offsetOptions.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {props.messages.email_form_field_required}
                        </Form.Control.Feedback>
                    </Col>
                    {/* fetchFlightCost = async (origin, destination, departTime, returnTime, departOffset, returnOffset) */}
                </Form.Group>
                <Form.Group as={Row} controlId="submitFlightEstimate" className="mb-5">
                    <Col sm="12">
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleSubmitFlightRequestValidation()
                                    .then(async (valid) => {
                                        setScreenReaderStatus(formattedMessage('aria_flight_estimate_loading'))
                                        props.setValidationWarnings([]);
                                        props.setFlightResult({});
                                        setFlightLoading(true);
                                        props.fetchFlightCost(props.originAirportCode, props.destinationAirportCode, props.departureTime, props.returnTime, props.departureOffset, props.returnOffset).then((result) => {
                                            props.setFlightResult(result);
                                            setFlightLoading(false);
                                            setScreenReaderStatus(formattedMessage('aria_flight_estimate_loaded'))
                                        })
                                    })
                                    .catch(err => {
                                        setScreenReaderStatus(formattedMessage('aria_flight_estimate_loaded'))
                                        console.log("ERROR", err)
                                        props.setValidationWarnings(err.inner);
                                    });
                            }}
                            className={`${flightLoading ? 'float-right disabled' : 'float-right'}`}>{props.messages.flight_modal_fetch_flight_estimate_label}
                            {flightLoading && <FaSpinner focusable="false" aria-hidden="true" title={props.messages.alt_for_faspinner}  className="float-right fa-spin ml-3 mt-1" size="24" />}
                            </Button>
                            <div role="status" className="sr-only">{screenReaderStatus}</div>
                            
                    </Col>
                </Form.Group>
            </Form>
            <div aria-live="polite">
                {Object.keys(props.flightResult).length !== 0 && props.flightResult.numberOfResults > 0 &&
                    <>
                        <Form onChange={(e) => props.setSelectedFlightPrice(e.target.value)}>
                            <fieldset>
                                <legend>
                                    {props.messages.flight_modal_result_header}
                                </legend>

                                <div className="my-3 pl-4">
                                    <Form.Check
                                        // inline
                                        label={`${localCurrencyDisplay(props.flightResult.minimum)} (${props.messages.flight_modal_label_minimum})`}
                                        type={'radio'}
                                        name="priceSelection"
                                        id={`minimum`}
                                        value={props.flightResult.minimum}
                                        defaultChecked={props.acceptedFlight === props.flightResult.minimum}
                                    />
                                    <Form.Check
                                        // inline
                                        label={`${localCurrencyDisplay(props.flightResult.median)} (${props.messages.flight_modal_label_median})`}
                                        type={'radio'}
                                        name="priceSelection"
                                        id={`median`}
                                        value={props.flightResult.median}
                                        defaultChecked={props.acceptedFlight === props.flightResult.median}
                                    />
                                    <Form.Check
                                        // inline
                                        label={`${localCurrencyDisplay(props.flightResult.maximum)} (${props.messages.flight_modal_label_maximum})`}
                                        type={'radio'}
                                        name="priceSelection"
                                        id={`highest`}
                                        value={props.flightResult.maximum}
                                        defaultChecked={props.acceptedFlight === props.flightResult.maximum}
                                    />
                                </div>
                            </fieldset>
                        </Form>
                    </>
                }
                {props.flightResult.numberOfResults === 0 &&
                    <>
                        <h3>{props.messages.flight_modal_result_header}</h3>
                        <div dangerouslySetInnerHTML={{ __html: props.messages.flight_modal_zero_results_with_link.html }}></div>
                    </>
                }
                {Object.keys(props.flightResult).length === 0 && !flightLoading &&
                    <>
                        <div dangerouslySetInnerHTML={{ __html: props.messages.flight_modal_initial_instructions.html }}></div>
                    </>
                }
            </div>
        </>
    )
}

export default FlightForm;