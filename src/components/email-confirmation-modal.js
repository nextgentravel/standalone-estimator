import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const EmailConfirmationModal = (props) => {
    let emailRequestResult = (props.emailRequestResult.status === 'success')
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
                    {emailRequestResult && <span className="align-middle"><FaCheckCircle size="24" className="text-success mb-1" /> <span className="ml-2">{props.messages.email_confirm_success_title}</span></span>}
                    {!emailRequestResult && <span><FaExclamationTriangle size="24" className="text-danger mb-1" /><span className="ml-2">{props.messages.email_confirm_error_title}</span></span>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {emailRequestResult && <span>{props.messages.email_confirm_success_body}</span>}
                {!emailRequestResult && <div>
                    <p>{props.messages.email_confirm_error_body}</p>
                    <p>{JSON.stringify(props.emailRequestResult.raw)}</p>
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>{props.messages.email_confirm_back_button}</Button>
                <Button variant="outline-primary" onClick={props.clearForm}>{props.messages.email_confirm_new_estimate_button}</Button>
            </Modal.Footer>
      </Modal>
    )
}

export default EmailConfirmationModal;