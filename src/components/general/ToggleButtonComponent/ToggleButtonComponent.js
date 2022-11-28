import './ToggleButtonComponent.css'

const ToggleButtonComponent = () => {
    return(
        <div className='switch_container'>
            <label id="switch" className='switch'>
            <input type="checkbox" id="slider"/>
            <span className='slider round'></span>
            </label>
        </div>
    )
}

export default ToggleDarkModeComponent;