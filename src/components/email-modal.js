import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl';
import EmailForm from "./email-form.js";

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
                    <FormattedMessage id="emailEstimate" />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EmailForm {...props} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.sendEmail}><FormattedMessage id="submit" /></Button>
            </Modal.Footer>
      </Modal>
    )
}

export default EmailModal;