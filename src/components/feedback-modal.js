import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const FeedBackModal = (props) => {
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
                    {props.messages.feedback_modal_header_text}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{ __html: props.messages.feedback_modal_body.html }}>
            </Modal.Body>
            <Modal.Footer>
                <Button target="_blank" href={props.messages.feedback_modal_link_to_survey} >{props.messages.feedback_modal_primary_button_text}</Button>
                {/* <Button variant="outline-primary" onClick={props.onHide} >{props.messages.feedback_modal_secondary_button_text}</Button> */}
            </Modal.Footer>
      </Modal>
    )
}

export default FeedBackModal;