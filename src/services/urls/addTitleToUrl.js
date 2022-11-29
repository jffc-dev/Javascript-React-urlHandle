//Thirds
import axios from 'axios';

//Owns
import Constants from '../../constants';

export const addTitleToUrl = async(idUrl, title) => {

    const rpta = await axios.patch(Constants.urlBackend+'/api/urls/add-title/'+idUrl, {
        title: title
    })
    .then((response) => {
        if(response.status === 201){
            return response.data
        }
    })
    .catch((error) => {
        console.log(error);

        return {
            status: 0,
            msg: "Se produjo un error al consultar el servicio.",
            rpta: null
        }
    });
    
    return rpta;

}