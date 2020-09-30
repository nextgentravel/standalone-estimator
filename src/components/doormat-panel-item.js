import React from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby";
import { Card } from "react-bootstrap"
import Image from "../components/image";
import { FaChevronRight } from 'react-icons/fa';

const DoormatPanelItem = ({ title, content, linkTo }) => (
    <div className="col-sm-6">
        <Card>
            <Image
                filename="sp-bg-3-1-min.jpg"
                className="goc-logo"
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {content}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
)

export default DoormatPanelItem
