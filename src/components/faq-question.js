import React from "react";

const FaqItem = ({data, index}) => {
    return (
        <div
            className="card px-4 pt-4 pb-3 my-4"
            key={index}
        >
            <div className="row">
            <div className="col-sm-12">
                <p className="lead mb-1">
                    {data.question.text}
                </p>
            </div>
            <React.Fragment>
                <div className="col-sm-12 mt-2">
                {data.answer.text}
                </div>
            </React.Fragment>
            </div>
        </div>
    )
}

export default FaqItem;