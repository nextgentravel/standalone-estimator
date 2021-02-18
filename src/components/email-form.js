import React, {useState} from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl';

const EmailForm = (props) => {
    let validationErrors = props.validationWarnings || []
    function removeIsInvalid (path, errors) {
        let filtered = errors.filter(function(field) { return field.path !== path; });
        props.setEmailValidationWarnings(filtered);
    }
    let validationErrorList = validationErrors.map(a => a.path) || [];
    return (
        <Form>
            <Form.Group as={Row} controlId="tripName">
                <Form.Label column sm="3">
                    <FormattedMessage id="tripName" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="tripNamePlaceholder">
                        {msg =>
                        <>
                            <Form.Control
                                isInvalid={validationErrorList.includes('tripName')}
                                required
                                value={props.tripName}
                                onChange={(e) => {
                                    removeIsInvalid('tripName', validationErrors)
                                    props.setTripName(e.target.value)
                                }}
                                type="text"
                                placeholder={msg}
                            />
                        </>}
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="travellersName">
                <Form.Label column sm="3">
                    <FormattedMessage id="travellersName" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="travellersNamePlaceholder">
                        {msg =>
                        <>
                            <Form.Control
                                isInvalid={validationErrorList.includes('travellersName')}
                                required
                                value={props.travellersName}
                                onChange={(e) => {
                                    removeIsInvalid('travellersName', validationErrors)
                                    props.setTravellersName(e.target.value)
                                }}
                                type="text"
                                placeholder={msg}
                            />
                        </>}
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="travellersEmail">
                <Form.Label column sm="3">
                    <FormattedMessage id="travellersEmail" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="travellersEmailPlaceholder">
                        {msg =>
                        <>
                            <Form.Control
                                isInvalid={validationErrorList.includes('travellersEmail')}
                                required
                                value={props.travellersEmail}
                                onChange={(e) => {
                                    removeIsInvalid('travellersEmail', validationErrors)
                                    props.setTravellersEmail(e.target.value)
                                }}
                                type="text"
                                placeholder={msg}
                            />
                        </>}
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="approversName">
                <Form.Label column sm="3">
                    <FormattedMessage id="approversName" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="approversNamePlaceholder">
                        {msg =>
                        <>
                            <Form.Control
                                isInvalid={validationErrorList.includes('approversName')}
                                required
                                value={props.approversName}
                                onChange={(e) => {
                                    removeIsInvalid('approversName', validationErrors)
                                    props.setApproversName(e.target.value)
                                }}
                                type="text"
                                placeholder={msg}
                            />
                        </>}
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="approversEmail">
                <Form.Label column sm="3">
                    <FormattedMessage id="approversEmail" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="approversEmailPlaceholder">
                        {msg =>
                        <>
                            <Form.Control
                                isInvalid={validationErrorList.includes('approversEmail')}
                                required
                                value={props.approversEmail}
                                onChange={(e) => {
                                    removeIsInvalid('approversEmail', validationErrors)
                                    props.setApproversEmail(e.target.value)
                                }}
                                type="text"
                                placeholder={msg}
                            />
                        </>}
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="notes">
                <Form.Label column sm="3">
                    <FormattedMessage id="notes" />
                </Form.Label>
                <Col sm="9">
                    <Form.Control
                        isInvalid={validationErrorList.includes('tripNotes')}
                        required
                        value={props.tripNotes}
                        onChange={(e) => {
                            removeIsInvalid('tripNotes', validationErrors)
                            props.setTripNotes(e.target.value)
                            }} as="textarea" rows={3} />
                </Col>
            </Form.Group>
        </Form>
    )
}

export default EmailForm;