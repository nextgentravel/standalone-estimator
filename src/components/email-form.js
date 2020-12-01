import React from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl';

const EmailForm = (props) => {
    return (
        <Form>
            <Form.Group as={Row} controlId="tripName">
                <Form.Label column sm="3">
                    <FormattedMessage id="tripName" />
                </Form.Label>
                <Col sm="9">
                    <FormattedMessage id="tripNamePlaceholder">
                        {msg =>
                            <Form.Control value={props.tripName} onChange={(e) => { props.setTripName(e.target.value) }} type="text" placeholder={msg} />
                        }
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
                            <Form.Control value={props.travellersName} onChange={(e) => { props.setTravellersName(e.target.value) }} type="text" placeholder={msg} />
                        }
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
                            <Form.Control value={props.travellersEmail} onChange={(e) => { props.setTravellersEmail(e.target.value) }} type="text" placeholder={msg} />
                        }
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
                            <Form.Control value={props.approversName} onChange={(e) => { props.setApproversName(e.target.value) }} type="text" placeholder={msg} />
                        }
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
                            <Form.Control value={props.approversEmail} onChange={(e) => { props.setApproversEmail(e.target.value) }} type="text" placeholder={msg} />
                        }
                    </FormattedMessage>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="notes">
                <Form.Label column sm="3">
                    <FormattedMessage id="notes" />
                </Form.Label>
                <Col sm="9">
                    <Form.Control value={props.tripNotes} onChange={(e) => { props.setTripNotes(e.target.value) }} as="textarea" rows={3} />
                </Col>
            </Form.Group>
        </Form>
    )
}

export default EmailForm;