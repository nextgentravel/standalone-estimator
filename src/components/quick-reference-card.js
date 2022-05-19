import React from "react"

const QuickReferenceCard = props => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="h5 m-0 p-1">{props.messages.quick_reference_title}</h2>
      </div>
      <div className="card-body">
        <ul className="card-columns">
          {props.messages.quick_reference_links.map((link, index) => {
            return (
              <li key={`link-${index}`}>
                <a href={link.link_url.url} target={link.link_url.target}>
                  {link.link_title}
                  {link.link_url.target != null && (
                    <span class="sr-only">
                      {props.messages.new_tab_message}
                    </span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default QuickReferenceCard
