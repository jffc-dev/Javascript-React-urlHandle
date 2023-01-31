import React from 'react'
import './LoaderFullScreenComponent.css'

const LoaderFullScreenComponent = ({ show }) => {
  return <div className={`loading " ${show && 'loading-display'}`}></div>
}

export default LoaderFullScreenComponent
