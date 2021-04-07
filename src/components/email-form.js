import React from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

const EmailForm = (props) => {
    let validationErrors = props.validationWarnings || []
    function removeIsInvalid (path, errors) {
        let filtered = errors.filter(function(field) { return field.path !== path; });
        props.setEmailValidationWarnings(filtered);
    }
    let validationErrorList = validationErrors.map(a => a.path) || [];
    return (
        <Form noValidate>
            <Form.Group as={Row} controlId="travellersName">
                <Form.Label column sm="3">
                    {props.messages.email_form_travellers_name}
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('travellersName')}
                        required
                        value={props.travellersName}
                        onChange={(e) => {
                            removeIsInvalid('travellersName', validationErrors)
                            props.setTravellersName(e.target.value)
                        }}
                        type="text"
                        placeholder={props.messages.email_form_travellers_name_placeholder}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="travellersEmail" className="mb-5">
                <Form.Label column sm="3">
                    {props.messages.email_form_travellers_email}
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('travellersEmail')}
                        required
                        value={props.travellersEmail}
                        onChange={(e) => {
                            removeIsInvalid('travellersEmail', validationErrors)
                            props.setTravellersEmail(e.target.value)
                        }}
                        type="text"
                        placeholder={props.messages.email_form_travellers_email_placeholder}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                    <Form.Check
                        className="mt-3 checkbox-label"
                        type={'checkbox'}
                        id={`public-servant-${'checkbox'}`}
                        label={props.messages.email_form_is_public_servant_checkbox_label}
                        value={props.travellerIsPublicServant}
                        onChange={(e) => {
                            props.setTravellerIsPublicServant(!props.travellerIsPublicServant)
                        }}
                        defaultChecked={props.travellerIsPublicServant}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="approversName">
                <Form.Label column sm="3">
                    {props.messages.email_form_approvers_name}
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('approversName')}
                        required
                        value={props.approversName}
                        onChange={(e) => {
                            removeIsInvalid('approversName', validationErrors)
                            props.setApproversName(e.target.value)
                        }}
                        type="text"
                        placeholder={props.messages.email_form_approvers_name_placeholder}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="approversEmail" className="mb-5">
                <Form.Label column sm="3">
                    {props.messages.email_form_approvers_email}
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('approversEmail')}
                        required
                        value={props.approversEmail}
                        onChange={(e) => {
                            removeIsInvalid('approversEmail', validationErrors)
                            props.setApproversEmail(e.target.value)
                        }}
                        type="text"
                        placeholder={props.messages.email_form_approvers_email_placeholder}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="tripName">
                <Form.Label column sm="3">
                    {props.messages.email_form_trip_name}
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('tripName')}
                        required
                        value={props.tripName}
                        onChange={(e) => {
                            removeIsInvalid('tripName', validationErrors)
                            props.setTripName(e.target.value)
                        }}
                        type="text"
                        placeholder={props.messages.email_form_trip_name_placeholder}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="travelCategory">
                <Form.Label column sm="3">{props.messages.email_form_category_label}</Form.Label>
                <Col sm="9">
                    <Form.Control as="select"
                        value={props.travelCategory}
                        onChange={(e) => {
                            removeIsInvalid('travelCategory', validationErrors)
                            props.setTravelCategory(e.target.value)
                        }}
                        isInvalid={validationErrorList.includes('travelCategory')}
                    >
                        <option value='' disabled>Select</option>
                        {props.messages.email_form_category_options.map((item, index) => {
                            return (
                                <option key={index} value={item.option_value}>{item.option_label}</option>
                            )
                        })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="notes">
                <Form.Label column sm="3">
                    {props.messages.email_form_notes}
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('tripNotes')}
                        required
                        value={props.tripNotes}
                        onChange={(e) => {
                            removeIsInvalid('tripNotes', validationErrors)
                            props.setTripNotes(e.target.value)
                            }} as="textarea" rows={3}
                        placeholder={props.messages.email_form_notes_placeholder}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default EmailForm;