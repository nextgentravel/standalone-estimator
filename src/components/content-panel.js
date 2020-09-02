import React from "react";
import { useIntl } from 'react-intl';
import { FaClipboardList } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import ContentPanelItem from './content-panel-item';



const ContentPanel = () => {
    const intl = useIntl();
    let homeLink = `/${intl.locale}/`;
    return (
        <>
            <ContentPanelItem
                title="plan"
                icon={<FaClipboardList size="100" color="#fff" alt=""/>}
                linkTo={`${homeLink}plan`}
                chevron="sm"
            />
            <ContentPanelItem
                title="book"
                icon={<FaTicketAlt size="100" color="#fff" alt="" />}
                linkTo={`${homeLink}book`}
                chevron="md"
            />
            <ContentPanelItem
                title="travel"
                icon={<FaPlaneDeparture size="100" color="#fff" alt="" />}
                linkTo={`${homeLink}travel`}
                chevron="sm"
            />
            <ContentPanelItem
                title="expense"
                icon={<FaFileInvoiceDollar size="100" color="#fff" alt="" />}
                linkTo={`${homeLink}expense`}
                chevron="no"
            />
        </>
    )
}

export default ContentPanel
