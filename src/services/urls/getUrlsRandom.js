//Thirds
import axios from 'axios';

//Owns
import Constants from '../../constants';
import { UrlRandom } from '../../models/Url';

export const getUrlsRandom = async(nroResultados) => {

    const cadenasClase = [];

    await axios.get(Constants.urlBackend+'/api/urls-random/'+nroResultados)
    .then(res => {
        const datos = res.data.urls;
        
        datos.map((cadena, index)=>{
            let maxReset = null;

            if(cadena.resets){
                let idReset = Math.max(...cadena.resets.map(reset => reset._id))
                maxReset = cadena.resets.find(reset => {
                    return reset._id === idReset;
                });
            }

            cadenasClase.push(new UrlRandom(cadena._id, index+1, cadena.resets ? maxReset.url : cadena.url, '', cadena.resets));
            return null;
            
        })
    });

    return cadenasClase;

}