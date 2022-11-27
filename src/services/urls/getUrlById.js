//Thirds
import axios from 'axios';

//Owns
import Constants from '../../constants';
import { Url } from '../../models/Url';

export const getUrlById = async(idUrl) => {

    let urlResult = null;

    await axios.get(Constants.urlBackend+'/api/urls/'+idUrl)
    .then(res => {
        console.log(res);
        const cadena = res.data.url;
        urlResult = new Url(cadena._id, 1, cadena.url, cadena.titles,cadena.audi_createdDate ,cadena.resets);
    });

    return urlResult;

}