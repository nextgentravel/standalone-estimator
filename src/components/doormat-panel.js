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
        <div className="row">
            <DoormatPanelItem
                linkTo={`${homeLink}plan`}
                title="New to GC Travel?"
                content="If you are about to travel for the first time on behalf of the Government of Canada, set up your traveler profile using this guide for 'first time travelers'."
            />
            <DoormatPanelItem
                linkTo={`${homeLink}book`}
                title="Covid-19 Travel Information"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat. Aliquam egestas, velit at condimentum placerat, sem sapien laoreet mauris, dictum porttitor lacus est nec enim."
            />
        </div>
    )
}

export default DoormatPanel
