import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const EmailErrorModal = (props) => {
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This is a danger alert—check it out!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark"  >Close</Button>
            </Modal.Footer>
      </Modal>
    )}


export default EmailErrorModal;