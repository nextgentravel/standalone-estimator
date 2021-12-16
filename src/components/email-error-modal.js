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
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 className="h3">{props.errorTitle}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div role='alert'>
                    <ol>
                        {props.emailErrorList.map((error, index)=>(
                            <li tabIndex='0' key={`error-${index}`}>{error}</li>
                            ))
                        }
                    </ol>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={() => {
                    props.onHide()}} >{props.closeText}</Button>
            </Modal.Footer>
      </Modal>
    )}


export default EmailErrorModal;