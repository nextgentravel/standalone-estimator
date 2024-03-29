import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FlightForm from './flight-form'

const FlightModal = (props) => {

    const localCurrencyDisplay = (string) => {
        return string.toLocaleString(props.locale, {minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'CAD', currencyDisplay: 'symbol'}).replace('CA', '')
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 className="h3">{props.messages.flight_modal_header}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FlightForm {...props}
                />
                <div className="small" dangerouslySetInnerHTML={{ __html: props.messages.flight_modal_note_disclaimer.html }} ></div>
            </Modal.Body>
            <Modal.Footer>
                <span className="mr-3" tabindex='0' ><strong>{props.messages.transportation_total}: </strong>{localCurrencyDisplay(parseFloat(props.selectedFlightPrice))}</span>
                <Button
                    variant="primary"
                    onClick={() => {
                        props.setAcceptedFlight(parseFloat(props.selectedFlightPrice))
                        props.updateTransportationCost(parseFloat(props.selectedFlightPrice))
                        props.setTransportationType('flight')
                        props.onHide()
                    }}
                    disabled={!(Object.keys(props.flightResult).length !== 0 && props.flightResult.numberOfResults > 0 && props.selectedFlightPrice > 0)}
                >
                    {props.messages.flight_modal_use_in_estimate_button_label}
                </Button>
                <Button variant="outline-primary" onClick={props.onHide} >{props.messages.flight_modal_close_button_label}</Button>
            </Modal.Footer>
      </Modal>
    )
}

export default FlightModal;