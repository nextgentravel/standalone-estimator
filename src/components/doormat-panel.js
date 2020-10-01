import React from "react";
import { useIntl } from 'react-intl';
import { FaClipboardList } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import DoormatPanelItem from './doormat-panel-item';

const DoormatPanel = () => {
    const intl = useIntl();
    let homeLink = `/${intl.locale}/`;
    return (
        <React.Fragment>
            <h3 className="mb-4">Get more out of GC Travel Guide</h3>
            <div className="row mb-5">
                <DoormatPanelItem
                    image="first-time-traveller.jpeg"
                    alt=""
                    linkTo={`${homeLink}newuser`}
                    linkNewWindow={false}
                    title="New to GC Travel?"
                    content="If you are about to travel for the first time on behalf of the Government of Canada, set up your traveler profile using this guide for 'first time travelers'."
                />
                <DoormatPanelItem
                    image="covid19.jpeg"
                    alt=""
                    linkNewWindow={true}
                    linkTo={`https://travel.gc.ca/travelling/health-safety/travel-health-notices/221`}
                    title="Covid-19 Travel Information"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat."
                />
            </div>
        </React.Fragment>
    )
}

export default DoormatPanel
