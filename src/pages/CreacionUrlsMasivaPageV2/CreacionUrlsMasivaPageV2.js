import { faTrash, faFileCirclePlus, faSave } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import ButtonGeneralComponent from '../../components/General/ButtonGeneralComponent/ButtonGeneralComponent'
import { GeneralTableButton } from '../../components/General/TableButton/TableButton'
import { useFormMultipleInput } from '../../hooks/useFormMultipleInput'
import { AppContext } from '../../utils/AppContext'
import { handleCreateMultipleDetailedUrl } from '../../utils/pages/CreacionUrlsMasivaPageV2'
import './CreacionUrlsMasivaPageV2.css'

const CreacionUrlsMasivaPageV2 = () => {
  const { setToastAppProperties } = useContext(AppContext)
  const newInput = { linkText: '', titleText: '' }
  const addNewInput = () => {
    handleAddInput({ newIdInput: currentIdInput + 1, newInput })
    setCurrentIdInput(currentIdInput + 1)
  }
  const saveInput = () => {
    const inputsAdd = Object.entries(inputsValues).map(([, data]) => {
      return {
        url: data.linkText,
        title: data.titleText
      }
    })

    handleCreateMultipleDetailedUrl(
      inputsAdd,
      handleReset,
      setCurrentIdInput,
      newInput,
      setToastAppProperties
    )
  }
  const handleChange = (e) => {
    handleInputChange({ target: e.target })
  }
  const deleteInput = (idInput) => {
    if (Object.entries(inputsValues).length > 1) {
      handleDeleteInput({ idInput })
    }
  }
  const [inputsValues, handleInputChange, handleAddInput, handleDeleteInput, handleReset] =
    useFormMultipleInput({
      1: { ...newInput }
    })
  const [currentIdInput, setCurrentIdInput] = useState(1)

  return (
    <Container style={{ paddingTop: '80px', height: '95%' }}>
      <div className="row">
        <div className="col-sm-5">
          <p>URL</p>
        </div>
        <div className="col-sm-6">
          <p>Title</p>
        </div>
      </div>
      {Object.entries(inputsValues).map(([inputId, InputData]) => {
        return (
          <div key={inputId}>
            <div className="row">
              <div className="col-sm-5">
                <input
                  className="form-control"
                  name={`linkText_${inputId}`}
                  onChange={handleChange}
                  value={InputData.linkText}
                  autoComplete="off"
                />
              </div>
              <div className="col-sm-6">
                <input
                  className="form-control"
                  name={`titleText_${inputId}`}
                  onChange={handleChange}
                  value={InputData.titleText}
                  autoComplete="off"
                />
              </div>
              <div className="col-sm-1">
                <GeneralTableButton
                  faIcon={faTrash}
                  msgTooltip={'Delete'}
                  color="red"
                  action={(_) => {
                    deleteInput(inputId)
                  }}></GeneralTableButton>
              </div>
            </div>
            <hr></hr>
          </div>
        )
      })}
      <div className="button__container">
        <ButtonGeneralComponent
          text={'New'}
          faIcon={faFileCirclePlus}
          action={addNewInput}></ButtonGeneralComponent>
        <ButtonGeneralComponent
          text={'Save'}
          faIcon={faSave}
          action={saveInput}></ButtonGeneralComponent>
      </div>
    </Container>
  )
}

export default CreacionUrlsMasivaPageV2
