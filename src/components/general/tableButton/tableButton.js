import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import './TableButton.css'

export const GeneralTableButton = ({ faIcon, msgTooltip, action, color }) => {
  const key = 'key'

  return (
    <OverlayTrigger
      key={key}
      placement="bottom"
      overlay={<Tooltip id={`tooltip-${key}`}>{msgTooltip}</Tooltip>}>
      <button className={`table_button table_button_${color || 'green'}`} onClick={action}>
        <FontAwesomeIcon className="faIcon" icon={faIcon} size="1x" inverse />
      </button>
    </OverlayTrigger>
  )
}
