import React, { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FlightForm from './flight-form'

const FlightModal = (props) => {
    let [selectedPrice, setSelectedPrice] = useState(0.00);

    const localCurrencyDisplay = (string) => {
        console.log(props.locale)
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
                    {props.messages.flight_modal_header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FlightForm {...props}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                />
                <div className="small" dangerouslySetInnerHTML={{ __html: props.messages.flight_modal_note_disclaimer.html }} ></div>
            </Modal.Body>
            <Modal.Footer>
                <span className="mr-3">{localCurrencyDisplay(parseFloat(selectedPrice))}</span>
                <Button onClick={() => {}} >{props.messages.flight_modal_use_in_estimate_button_label}</Button>
                <Button variant="outline-primary" onClick={props.onHide} >{props.messages.feedback_modal_secondary_button_text}</Button>
            </Modal.Footer>
      </Modal>
    )
}

export default FlightModal;