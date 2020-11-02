import React from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby";
import { FaChevronRight } from 'react-icons/fa';
import * as FontAwesome from "react-icons/fa";

const ContentPanelItem = ({ title, lead, iconName, iconColour, linkTo, chevron }) => {
    const Icon = props => {
        const { iconName, size, color } = props;
        const icon = React.createElement(FontAwesome[iconName]);
        return <span style={{ fontSize: size, color: color, lineHeight: .5 }}>{icon}</span>;
      };

    return (
        <section className="col-md-3 col-sm-6 text-center mb-5">
            <div className="h-100 d-flex flex-column">
                <div className={`icon-background mt-2 mb-4`} style={{ backgroundColor: iconColour }}>
                    <Icon iconName={iconName} size={100} color="#FFF" />
                </div>
                <h3 className="mb-4">{title}</h3>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: lead }}></p>
                <div className="mt-auto w-100">
                    <Link to={linkTo} className="btn btn-outline-primary px-4"><FormattedMessage id="view" /></Link>
                </div>
            </div>
            {chevron === "sm" &&
                <FaChevronRight
                    className="home-chevron d-none d-sm-block"
                    size="30"
                />
            }
            {chevron === "md" &&
                <FaChevronRight
                    className="home-chevron d-none d-md-block"
                    size="30"
                />
            }
        </section>
    )
}

export default ContentPanelItem
