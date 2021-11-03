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
                    {emailRequestResult && <h3 className="align-middle"><FaCheckCircle focusable="false" aria-hidden="true" title={props.messages.alt_for_facheckcircle}  size="24" className="text-success mb-1" /> <span className="ml-2">{props.messages.email_confirm_success_title}</span></h3>}
                    {!emailRequestResult && <h3><FaExclamationTriangle focusable="false" aria-hidden="true" title={props.messages.alt_for_faexclamationtriangle}  size="24" className="text-danger mb-1" /><span className="ml-2">{props.messages.email_confirm_error_title}</span></h3>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {emailRequestResult && <span>
                    <p>{props.messages.email_confirm_success_body}</p>    
                </span>}
                {!emailRequestResult && <div>
                    <p>{props.messages.email_confirm_error_body}</p>
                    <p>{JSON.stringify(props.emailRequestResult.raw)}</p>
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {
                    props.onHide()
                }}>{props.messages.email_confirm_back_button}</Button>
                <Button variant="outline-primary" onClick={() => {
                    props.clearForm()
                }
                }>{props.messages.email_confirm_new_estimate_button}</Button>
            </Modal.Footer>
      </Modal>
    )
}

export default EmailConfirmationModal;