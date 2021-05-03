import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FaSpinner } from 'react-icons/fa';

const FlightModal = (props) => {
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
                {/* <EmailForm {...props} /> */}
                <div dangerouslySetInnerHTML={{ __html: props.messages.flight_modal_note_disclaimer.html }} ></div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {}} >{props.messages.flight_modal_use_in_estimate_button_label}</Button>
                <Button variant="outline-primary" onClick={props.onHide} >{props.messages.feedback_modal_secondary_button_text}</Button>
            </Modal.Footer>
      </Modal>
    )
}

export default FlightModal;