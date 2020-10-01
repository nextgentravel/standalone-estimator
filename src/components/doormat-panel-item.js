import React from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby";
import { Card } from "react-bootstrap"
import Image from "../components/image";
import { FaChevronRight } from 'react-icons/fa';

const DoormatPanelItem = ({ title, content, linkTo, image, alt }) => (
    <div className="col-sm-6">
        <Card className="bg-light  h-100">
            <Image
                className="m-2"
                filename={image}
                alt={alt}
            />
            <Card.Body>
                <Card.Title><Link to="#">{title}</Link></Card.Title>
                <Card.Text>
                    {content}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
)

export default DoormatPanelItem
