import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ButtonGeneralComponent.css'

const ButtonGeneralComponent = ({ text, faIcon, action }) => {
  return (
    <button type="button" className="button__general" onClick={action}>
      <span className="button__text">{text}</span>
      <span className="button__icon">
        <FontAwesomeIcon className="faIcon" icon={faIcon} size="xs" inverse />
      </span>
    </button>
  )
}

export default ButtonGeneralComponent
