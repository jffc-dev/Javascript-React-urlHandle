import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './tableButton.css';

const GeneralTableButton = ({faIcon, msgTooltip, action}) => {
    
    const key = 'key';

    return (
        <OverlayTrigger
            key={key}
            placement='bottom'
            overlay={
                <Tooltip id={`tooltip-${key}`}>
                    {msgTooltip}
                </Tooltip>
            }
        >
            <button className='table_button' data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" onClick={action}>
                <FontAwesomeIcon className='faIcon' icon={faIcon} size="1x" inverse />
            </button>
        </OverlayTrigger>
    );

}

export default GeneralTableButton;