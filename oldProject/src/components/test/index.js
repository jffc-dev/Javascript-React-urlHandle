// Note: Uncomment import lines while working with JSX Compiler.
import React from 'react'

const Test = () => {
  const [counter, setCounter] = React.useState(100)
  const intervalRef = React.useRef(null)

  React.useEffect(() => {
    return () => stopCounter() // when App is unmounted we should stop counter
  }, [])

  // styles --------------------------------------

  const containerStyle = {
    height: '300px',
    width: '300px'
  }

  const elementStyle = {
    margin: '5px',
    height: `${counter}px`,
    width: `${counter}px`,
    background: 'radial-gradient(at 25% 25%, #2b86c5, #562b7c, #ff3cac)',
    border: '2px solid black',
    borderRadius: '50%',
    boxShadow: '10px 5px 5px #BEBEBE'
  }

  // functions -----------------------------------

  const startCounter = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1)
    }, 10)
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  return (
    <div style={containerStyle}>
      <div
        onMouseDown={startCounter}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
        style={elementStyle}
      />
    </div>
  )
}

export default Test
