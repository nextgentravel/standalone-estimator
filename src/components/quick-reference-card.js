import React from "react"

const QuickReferenceCard = (props) => {
    return (
        <div className="card">
            <div className="card-header">
                <h2 >{props.messages.quick_reference_title}</h2>
            </div>
            <div className="card-body">
                <ul className="card-columns">
                    {props.messages.quick_reference_links.map((link, index) => {
                        return <li key={`link-${index}`}>
                            <a href={link.link_url}>{link.link_title}</a>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default QuickReferenceCard;



