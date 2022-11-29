import { faClipboard, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '../../../../hooks/useForm';
import { addTitleToUrl } from '../../../../services/urls/addTitleToUrl';
import GeneralTableButton from '../../../General/TableButton/TableButton';
import FormButtonComponent from '../../../General/FormButtonComponent/FormButtonComponent';

const AleatorioUrlsBdModalTabTitle = ({titles, setTitles, cadenaId}) => {

    // Title form
    const [{tFormTitle}, tFormHandleInputChange, tFormReset] = useForm({
        tFormTitle: '',
        initial: true
    });

    const handleTitleFormSubmit = async(e) => {

        e.preventDefault();
        
        const rpta = await addTitleToUrl(cadenaId, tFormTitle);

        if(rpta.status === 1){
            const {rpta:inserted} = rpta;
            let titlesNew = [...titles,inserted];
            tFormReset();
            setTitles(titlesNew);
        }
        
    }

    return(
        <div>
            <form onSubmit={handleTitleFormSubmit}>
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Título</label>
                    <div className="col-sm-10">
                        <div className='inputModal__container'>
                            <input type="text" className="form-control" value={tFormTitle} onChange={tFormHandleInputChange} autoComplete="off" name="tFormTitle"/>
                        </div>
                    </div>
                </div>
                <div className="form-group col-12 inputModal__containerButtons">
                    <FormButtonComponent text={"Agregar"} faIcon={faSquarePlus}></FormButtonComponent>
                </div>
            </form>
            
            <div className="col-12">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th style={{width: '20%'}}>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {titles.length ? titles.map((title, index)=>
                        (
                            <tr key={index}>
                                <td className='url'>
                                    {title.title}
                                </td>
                                <td style={{width: '10%'}}>
                                    <GeneralTableButton faIcon={faClipboard} msgTooltip={"Ver"} 
                                        action={()=>{navigator.clipboard.writeText(title.title)}}
                                    ></GeneralTableButton>
                                </td>
                            </tr>
                        )) : 
                        <tr><td colSpan={2} style={{textAlign: 'center'}}>No se cargaron registros</td></tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AleatorioUrlsBdModalTabTitle;