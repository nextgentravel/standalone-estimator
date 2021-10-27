import React, { useState, useEffect, useRef } from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

const EmailForm = (props) => {
    let validationErrors = props.validationWarnings || []
    let [errorPanel, setErrorPanel] = useState(false);
    const errorPanelView = useRef(null)
    const executeErrorPanelScroll = () => errorPanelView.current.scrollIntoView()

    function removeIsInvalid (path, errors) {
        let filtered = errors.filter(function(field) { return field.path !== path; });
        props.setEmailValidationWarnings(filtered);
    }

    const errorList = () => {
        let list = [];
        list = validationErrors.map((error, index) =>
            <li key={index}><a className="alert-link" href={'#' + error.path}>{error.errors}</a></li>
        );
        return list;
    }

    useEffect(() => {
        if (validationErrors.length > 0) {
            setErrorPanel(true)
        } 
    }, [validationErrors]);

    useEffect(() => {
        if (errorPanel) {
            executeErrorPanelScroll();
        }
    }, [errorPanel])

    let validationErrorList = validationErrors.map(a => a.path) || [];
    return (
        <Form noValidate>
            {errorPanel !== false && <div className="alert alert-danger alert-danger-banner" role="alert" ref={errorPanelView}>
                <h3>{props.messages.estimate_error_title}</h3>
                <p>{props.messages.estimate_error_lead}</p>
                <ol>
                    {errorList()}
                </ol>
            </div>}


            <Form.Group as={Row} controlId="travellersName">
                <Form.Label column sm="3">
                    {props.messages.email_form_travellers_name}
                    <span className='sr-only'>{props.messages.email_form_travellers_name_placeholder}</span>
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('travellersName')}
                        aria-invalid={validationErrorList.includes('travellersName')}
                        required
                        value={props.travellersName}
                        onChange={(e) => {
                            removeIsInvalid('travellersName', validationErrors)
                            props.setTravellersName(e.target.value)
                        }}
                        type="text"
                    />
                    <Form.Text id="travellersNameHelp" muted>
                        {props.messages.email_form_travellers_name_placeholder}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid" role="alert">
                        <span className="sr-only">{props.messages.email_form_travellers_name}.{' '}</span>
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="travellersEmail" className="mb-5">
                <Form.Label column sm="3">
                    {props.messages.email_form_travellers_email}
                    <span className="sr-only">{props.messages.email_form_travellers_email_placeholder}</span>
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('travellersEmail')}
                        aria-invalid={validationErrorList.includes('travellersEmail')}
                        required
                        value={props.travellersEmail}
                        onChange={(e) => {
                            removeIsInvalid('travellersEmail', validationErrors)
                            props.setTravellersEmail(e.target.value)
                        }}
                        type="text"
                    />
                    <Form.Text id="travellersEmailHelp" muted>
                        {props.messages.email_form_travellers_email_placeholder}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid" role="alert">
                        <span className="sr-only">{props.messages.email_form_travellers_email}.{' '}</span>
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
                    <span className="sr-only">{props.messages.email_form_approvers_name_placeholder}</span>
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('approversName')}
                        aria-invalid={validationErrorList.includes('approversName')}
                        required
                        value={props.approversName}
                        onChange={(e) => {
                            removeIsInvalid('approversName', validationErrors)
                            props.setApproversName(e.target.value)
                        }}
                        type="text"
                    />
                    <Form.Text id="approversNameHelp" muted>
                        {props.messages.email_form_approvers_name_placeholder}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid" role="alert">
                        <span className="sr-only">{props.messages.email_form_approvers_name}.{' '}</span>
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="approversEmail" className="mb-5">
                <Form.Label column sm="3">
                    {props.messages.email_form_approvers_email}
                    <span className='sr-only'>{props.messages.email_form_approvers_email_placeholder}</span>
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('approversEmail')}
                        aria-invalid={validationErrorList.includes('approversEmail')}
                        required
                        value={props.approversEmail}
                        onChange={(e) => {
                            removeIsInvalid('approversEmail', validationErrors)
                            props.setApproversEmail(e.target.value)
                        }}
                        type="text"
                        aria-describedby="approversEmailHelp"
                    />
                    <Form.Text id="approversEmailHelp" muted>
                        {props.messages.email_form_approvers_email_placeholder}
                    </Form.Text>
                    <Form.Control.Feedback type="invalid" role="alert">
                        <span className="sr-only">{props.messages.email_form_approvers_email}.{' '}</span>
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="tripName">
                <Form.Label column sm="3">
                    {props.messages.email_form_trip_name}
                    <p className='sr-only'>{props.messages.email_form_trip_name_placeholder}</p>
                    <p className='sr-only'>{props.messages.email_form_trip_name_helptext}</p>
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('tripName')}
                        aria-invalid={validationErrorList.includes('tripName')}
                        required
                        value={props.tripName}
                        onChange={(e) => {
                            removeIsInvalid('tripName', validationErrors)
                            props.setTripName(e.target.value)
                        }}
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid" role="alert">
                        <span className="sr-only">{props.messages.email_form_trip_name}.{' '}</span>
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                    <Form.Text id="emailTripName" muted>
                        <p>{props.messages.email_form_trip_name_placeholder}</p>
                        <p>{props.messages.email_form_trip_name_helptext}</p>
                    </Form.Text>

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
                        aria-invalid={validationErrorList.includes('travelCategory')}
                        required
                    >
                        <option value='' disabled>{props.messages.select}</option>
                        {props.messages.email_form_category_options.map((item, index) => {
                            return (
                                <option key={index} value={item.option_value}>{item.option_label}</option>
                            )
                        })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid" role="alert">
                        <span className="sr-only">{props.messages.email_form_category_label}.{' '}</span>
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="notes">
                <Form.Label column sm="3">
                    {props.messages.email_form_notes}
                    <span className="sr-only">{props.messages.email_form_notes_helptext}</span>
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('tripNotes')}
                        aria-invalid={validationErrorList.includes('tripNotes')}
                        className="notes-box-placeholder"
                        value={props.tripNotes}
                        onChange={(e) => {
                            removeIsInvalid('tripNotes', validationErrors)
                            props.setTripNotes(e.target.value)
                            }} as="textarea" rows={5}
                        placeholder={''}
                    />
                    <Form.Control.Feedback type="invalid" role="alert">
                        <span className="sr-only">.{' '}</span>
                        {props.messages.email_form_field_required}
                    </Form.Control.Feedback>
                    <Form.Text id="emailNotesBox" muted>
                        {props.messages.email_form_notes_helptext}
                    </Form.Text>

                    
                </Col>
            </Form.Group>
        </Form>
    )
}

export default EmailForm;