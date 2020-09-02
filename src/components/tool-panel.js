import React from "react";
import { useIntl } from 'react-intl';
import ToolPanelItem from './tool-panel-item';
import { FaMapMarker } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';

const ToolPanel = () => {
    const intl = useIntl();
    let homeLink = `/${intl.locale}/`;
    return (
        <div className="d-flex justify-content-center">
            <ToolPanelItem title="rates" icon={<FaMapMarker size="40" />} linkTo={`${homeLink}rates`} />
            <ToolPanelItem title="kilometrics" icon={<FaCar size="40" />} linkTo={`${homeLink}kilometrics`} />
        </div>
    )
}

export default ToolPanel
