import { useEffect, useState } from "react"

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState)

    useEffect(() => {
        if(!initialState.initial){
            setValues(initialState);
        }
    }, [initialState]);

    const reset = () => {
        setValues(initialState)
    }

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [values, handleInputChange, reset]
}