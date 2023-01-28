//Thirds
import axios from 'axios';

//Owns
import Constants from '../../constants';
import { ServiceResponse } from '../../models/Response';
import { UrlRandom } from '../../models/Url';

export const getNewUrlService = async(urls, size, indexOld) => {
    
    const cadenasClase = [];

    const porceso = await axios.post(Constants.urlBackend+'/api/urls/get-new-url/', {
        urls: urls,
        size: size
    })
    .then(apiResponse => {
        const {data: apiResponseFormat} = apiResponse
        const {data: urls, ...resp1} = apiResponseFormat;
        
        urls.map((cadena)=>{
            let maxReset = null;

            if(cadena.resets){
                let idReset = Math.max(...cadena.resets.map(reset => reset._id))
                maxReset = cadena.resets.find(reset => {
                    return reset._id === idReset;
                });
            }

            cadenasClase.push(new UrlRandom(cadena._id, indexOld, cadena.resets ? maxReset.url : cadena.url, '', cadena.resets));
            return null;
        })
        
        return new ServiceResponse({
            ...resp1, data: cadenasClase
        })

    })
    .catch((error) => {
        return new ServiceResponse({
            status: 0,
            message: "Se produjo un error al consultar el servicio." + error,
            data: null
        })
    });

    return porceso;
}