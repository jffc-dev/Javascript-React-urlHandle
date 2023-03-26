import { useState } from 'react'

export const useFormMultipleInput = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const handleAddInput = ({ newIdInput, newInput }) => {
    setValues((values) => {
      values[newIdInput] = newInput
      return values
    })
  }
  const handleDeleteInput = ({ idInput }) => {
    setValues((values) => {
      const newValues = Object.fromEntries(
        Object.entries(values).filter(([prop]) => prop !== idInput)
      )
      return newValues
    })
  }
  const handleInputChange = ({ target }) => {
    const [field, id] = target.name.split('_')
    const val = target.value
    setValues((values) => {
      const copyValues = { ...values }
      const newValue = copyValues[id]
      if (newValue) {
        copyValues[id][field] = val
      }
      return { ...copyValues }
    })
  }
  const handleReset = ({ newIdInput, newInput }) => {
    const newValues = {}
    newValues[newIdInput] = newInput
    setValues(newValues)
  }

  return [values, handleInputChange, handleAddInput, handleDeleteInput, handleReset]
}
