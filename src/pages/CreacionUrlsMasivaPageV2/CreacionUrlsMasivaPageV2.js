import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Container } from 'react-bootstrap'

const CreacionUrlsMasivaPageV2 = () => {
  const newLink = {
    link: '',
    title: ''
  }
  const addNewInput = () => {
    setInputs([...inputs, newLink])
  }
  const deleteInput = () => {}

  const [inputs, setInputs] = useState([newLink])
  return (
    <Container style={{ paddingTop: '80px', height: '95%' }}>
      <div className="row">
        <div className="col-sm-5">
          <p>URL</p>
        </div>
        <div className="col-sm-6">
          <p>Title</p>
        </div>
        <div className="col-sm-1">
          <p>A</p>
        </div>
      </div>
      {inputs.map((input, index) => {
        return (
          <div key={index} className="row">
            <div className="col-sm-5">
              <input className="form-control" name={`link${index}`} />
            </div>
            <div className="col-sm-6">
              <input className="form-control" name={`title${index}`} />
            </div>
            <div className="col-sm-1">
              <button
                onClick={() => {
                  deleteInput()
                }}>
                <FontAwesomeIcon className="faIcon" icon={faTrash} size="1x" inverse />
              </button>
            </div>
          </div>
        )
      })}
      <button onClick={addNewInput}>Agregar</button>
    </Container>
  )
}

export default CreacionUrlsMasivaPageV2
