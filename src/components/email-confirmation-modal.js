import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl';
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
                    {emailRequestResult && <span className="align-middle"><FaCheckCircle size="24" className="text-success mb-1" /> <span className="ml-2">Success!</span></span>}
                    {!emailRequestResult && <span><FaExclamationTriangle size="24" className="text-danger mb-1" /><span className="ml-2">Error</span></span>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {emailRequestResult && <span>Your travel estimate is on its way!</span>}
                {!emailRequestResult && <div>
                    <p>Oops. There was a problem sending your estimate.</p>
                    <p>{JSON.stringify(props.emailRequestResult.raw)}</p>
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Back to estimate</Button>
                <Button variant="outline-primary" onClick={props.clearForm}>New estimate</Button>
            </Modal.Footer>
      </Modal>
    )
}

export default EmailConfirmationModal;