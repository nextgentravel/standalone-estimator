import React from "react"

const QuickReferenceCard = (props) => {
    return (
        <div className="card">
            <div className="card-header">
                {props.messages.quick_reference_title}
            </div>
            <div className="card-body">
                <ul className="card-columns">
                    {props.messages.quick_reference_links.map(link => {
                        return <li>
                            <a href={link.link_url}>{link.link_title}</a>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default QuickReferenceCard;



