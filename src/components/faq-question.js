import React from "react";
import {FaCaretDown, FaCaretUp} from 'react-icons/fa';

const FaqItem = ({data, index, collapsed, toggleFaqAccordian}) => {
    return (
        <div
            className="card px-4 pt-4 pb-3 my-4"
        >
            <div className="row">
                <div className="col-sm-12" onClick={() => toggleFaqAccordian(index)}>
                    <p className="lead mb-1">
                        {data.question.text}
                    </p>
                    {collapsed &&
                        <FaCaretDown
                            style={{
                                position: 'absolute',
                                right: 15,
                                top: 10,
                            }}
                    />}
                    {!collapsed &&
                        <FaCaretUp
                            style={{
                                position: 'absolute',
                                right: 15,
                                top: 10,
                            }}
                        />
                    }
                </div>
                {!collapsed &&
                    <React.Fragment>
                        <div className="col-sm-12 mt-2">
                            {data.answer.text}
                        </div>
                    </React.Fragment>
                }
                {collapsed &&
                    <React.Fragment>
                        <div className="col-sm-12" />
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default FaqItem;
