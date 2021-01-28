import React, { useState } from "react";

import { FaPlusCircle, FaMinusCircle, FaExternalLinkAlt } from 'react-icons/fa';

const TravelStep = ({data, index}) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <div className="card px-5 py-4 my-4 bg-light">
            <div className="row">
                <div className="col-sm-12">
                    <h3 className="mb-3 mt-1">
                        {data.show_step_number &&
                            <span className="text-secondary pr-3">
                            Step {index + 1}
                            </span>
                        }
                        {data.title.text}
                    </h3>
                </div>
                <div className="col-sm-8">
                    <div dangerouslySetInnerHTML={{ __html: data.content.html }}></div>
                    {data.directives_reference && data.directives_reference.length > 0 &&
                        <div>
                            <button className="header-button btn btn-plain p-0" aria-expanded="false" onClick={() => setCollapsed(!collapsed)}>
                                <h4 className="step-directives-header">
                                    {collapsed &&
                                        <FaPlusCircle size="15" />}
                                    {!collapsed &&
                                        <FaMinusCircle size="15" />
                                    }
                                    Directives
                                </h4>
                            </button>
                            {!collapsed &&
                                <ul className="ml-2">
                                    {data.directives_reference.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <a href={item.directive_link.url} target="_blank">{item.directive_link_text}
                                                    <FaExternalLinkAlt size="12" className="external-link" />
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            }
                            {collapsed &&
                                <div className="mb-4"></div>
                            }

                        </div>
                    }

                </div>
                <div className="col-sm-4">
                    {data.action_link &&
                        <p className="text-center">
                        <a
                            href={data.action_link}
                            className="btn btn-primary my-0 px-4"
                            target={data.action_new_window ? '_blank' : '' }
                        >
                            {data.action_title.text}
                        </a>
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

export default TravelStep;
