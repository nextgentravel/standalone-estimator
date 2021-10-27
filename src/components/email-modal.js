import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import EmailForm from "./email-form.js";
import { FaSpinner } from 'react-icons/fa';

const EmailModal = (props) => {
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
                    <h2 className='h3'>{props.messages.email_modal_title}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EmailForm {...props} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.sendEmail} className={`${props.emailRequestLoading ? 'disabled' : ''}`} >{props.messages.email_modal_submit}</Button>
                {props.emailRequestLoading && <FaSpinner focusable="false" aria-hidden="true" title={props.messages.alt_for_faspinner}  className="fa-spin ml-3" size="24" />}
            </Modal.Footer>
      </Modal>
    )
}

export default EmailModal;