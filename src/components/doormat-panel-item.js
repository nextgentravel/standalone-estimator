import React from "react";
import { Link } from "gatsby";
import { Card } from "react-bootstrap"

<<<<<<< HEAD
const DoormatPanelItem = ({ title, content, linkTo, image, alt, linkNewWindow }) => (
    <div className="col-sm-6 mb-4">
        <Card className="bg-light h-100">
            <img
                className="doormat-image m-2"
                src={image}
                alt={alt}
            />
            <Card.Body>
                <Card.Title><Link to={linkTo} target={linkNewWindow ? '_blank' : ''}>{title}</Link></Card.Title>
                <Card.Text>
                    {content}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
)
=======
const DoormatPanelItem = ({ title, content, linkTo, image, alt, linkNewWindow }) => {
    return (
        <div className="col-sm-6 mb-4">
            <Card className="bg-light h-100">
                <img
                    className="doormat-image m-2"
                    src={image}
                    alt={alt}
                />
                <Card.Body>
                    <Card.Title>
                        {!linkNewWindow &&
                            <Link to={linkTo} target={linkNewWindow ? '_blank' : ''}>{title}</Link>
                        }
                        {linkNewWindow &&
                            <a href={linkTo} target={linkNewWindow ? '_blank' : ''}>{title}</a>
                        }
                    </Card.Title>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
>>>>>>> bugs/dev-cleanup

export default DoormatPanelItem
