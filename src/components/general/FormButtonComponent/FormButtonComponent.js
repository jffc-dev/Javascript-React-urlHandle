import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FormButtonComponent.css'

const FormButtonComponent = ({text, faIcon}) => {
    return (
        <button className='inputModal__formButton'>
            {(faIcon) && <FontAwesomeIcon className='faIcon formbutton__icon' icon={faIcon} size="1x" inverse />}
            <span>{text}</span>
        </button>
    )
}

export default FormButtonComponent;