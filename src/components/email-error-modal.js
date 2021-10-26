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
            <span dangerouslySetInnerHTML={{ __html: props.errorMessage.html }}></span>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={() => {
                    props.onHide()}} >Close</Button>
            </Modal.Footer>
      </Modal>
    )}


export default EmailErrorModal;