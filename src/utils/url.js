import axios from 'axios';
import Swal from 'sweetalert2'
import Constants from '../constants.js';

export const abrirUrlEspecifica = (cadena) => {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: cadena.url,
    }).click();
}

export const reestablecerUrl = async(cadena, cadenas, setCadenas) => {

    await Swal.fire({
        title: 'Reestablecer URL',
        html:
            `<span><b>Url actual:</b> <a href='${cadena.url}' target="_blank">Ver</a></span>`+
            `<br/><textarea id="swal-input1" style="width: 100%"></textarea>`,
        focusConfirm: false,
        preConfirm: async() => {
            const url = document.getElementById('swal-input1').value

            await axios.patch(Constants.urlBackend+'/api/urls/add-reset/'+cadena._id, {
                newUrl: url
            })
            .then((response) => {
                if(response.status === 201){

                    const {data} = response;

                    if(data.status === 1){

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Se reestableció correctamente la url',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        
                        updateArray(cadenas, setCadenas, cadena, data.rpta.url);
      
                    }else{
                        Swal.showValidationMessage(
                            `<i class="fa fa-info-circle"></i>${data.msg}`
                        )
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
            
        }
    });
    
}

const updateArray = (cadenas, setCadenas, cadena, url) => {
    let cadenasTemp = cadenas;

    const index = cadenasTemp.findIndex(object => {
        return object._id === cadena._id;
    });
    
    if (index !== -1) {
        cadenasTemp[index].url = url;
        setCadenas([])
        setCadenas(cadenasTemp)
    }
}