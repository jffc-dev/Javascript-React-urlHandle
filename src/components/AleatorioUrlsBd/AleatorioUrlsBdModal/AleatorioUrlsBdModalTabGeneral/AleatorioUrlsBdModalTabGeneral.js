import { useForm } from "../../../../hooks/useForm";
import './AleatorioUrlsBdModalTabGeneral.css';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AleatorioUrlsBdModalTabGeneral = ({cadena}) => {

    const [{url, dateCreated}, handleInputChange] = useForm(cadena || {
        url: '',
        dateCreated: '',
        initial: true
    });

    return(
        <div>
            <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">URL original</label>
                <div className="col-sm-10">
                    <div className='inputModal__container'>
                        <input type="text" className="form-control" value={url} onChange={handleInputChange} name="url" readOnly/>
                        <button className='inputModal__button' onClick={() =>  navigator.clipboard.writeText(url)}><FontAwesomeIcon className='faIcon' icon={faClipboard} inverse/></button>
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Fecha de creación</label>
                <div className="col-sm-9">
                    <input type="datetime-local" className="form-control" value={dateCreated ? new Date(dateCreated).toISOString().slice(0,16) : ''} onChange={handleInputChange} name="dateCreated" readOnly/>
                </div>
            </div>
        </div>
    )
}

export default AleatorioUrlsBdModalTabGeneral;