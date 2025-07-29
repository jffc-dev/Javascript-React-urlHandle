import { useEffect, useState } from 'react'

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  useEffect(() => {
    if (!initialState.initial) {
      setValues(initialState)
    }
  }, [initialState])

  const reset = () => {
    setValues(initialState)
  }

  const handleInputChange = ({ target, val }) => {
    const valuesSet = val || values
    const targetVal = val || target.value
    setValues({
      ...valuesSet,
      [target.name]: targetVal
    })
  }

  return [values, handleInputChange, reset]
}
