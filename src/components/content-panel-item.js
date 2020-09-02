import React from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby";
import { FaChevronRight } from 'react-icons/fa';

const ContentPanelItem = ({ title, icon, linkTo, chevron }) => (
    <section className="col-md-3 col-sm-6 text-center mb-5">
        <div className="h-100 d-flex flex-column">
            <div className={`icon-background icon-background-${title} mt-2 mb-4`}>
                {icon}
            </div>
            <h3 className="mb-4"><FormattedMessage id={title} /></h3>
            <p className="mb-4"><FormattedMessage id={`${title}Lead`}/></p>
            <div className="mt-auto w-100">
                <Link to={linkTo} className="btn btn-outline-primary px-4"><FormattedMessage id="launch" /></Link>
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

export default ContentPanelItem
