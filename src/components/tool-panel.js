import React from "react";
import { FormattedMessage } from 'react-intl';
import { Link } from "gatsby";

const ToolPanel = ({ title, icon, linkto }) => (

<div className="tool-link-item text-center m-5">
    <Link to={linkto}>
    {icon}
      <p className="mt-2"><FormattedMessage id={title} /></p>
    </Link>
</div>

)

export default ToolPanel