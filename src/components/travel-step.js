import React from "react";

const TravelStep = ({data, index}) => {
    console.log('data', data);
    return (
        <div className="card px-4 pt-4 my-4 bg-light">
            <div className="row">
                <div className="col-sm-12">
                    <h3 className="mb-3">
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
                    {data.secondary_action_link &&
                        <p className="text-center">
                        <a
                            href={data.secondary_action_link}
                            className="btn btn-outline-primary my-0 px-4"
                            target={data.secondary_action_new_window ? '_blank' : '' }
                        >
                            {data.secondary_action_title.text}
                        </a>
                        </p>
                    }

                </div>
            </div>
        </div>
    )
}

export default TravelStep;
