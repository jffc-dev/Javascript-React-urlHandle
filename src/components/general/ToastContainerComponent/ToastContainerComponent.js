import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

import './ToastContainerComponent.css'

const ToastContainerComponent = ({ toastAppProperties }) => {
  const { title, message, delay, type, date } = toastAppProperties
  const [showToast, setShowToast] = useState(false)

  React.useEffect(() => {
    if (date) {
      setShowToast(true)
    }
  }, [date])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="toastContainer"
      style={showToast ? { display: 'block' } : { display: 'none' }}>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={type}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={delay}
          autohide>
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default ToastContainerComponent
