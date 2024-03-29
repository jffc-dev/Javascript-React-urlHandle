// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_URLS, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'
import { Url } from '../../models/Url'

export const getNewUrlService = async (urls, size, indexOld) => {
  const cadenasClaseRsp = await axios
    .post(API_URL_BASE + API_URL_URLS + '/get-new-url/', {
      urls,
      size
    })
    .then((response) => {
      const { data, message, status } = response.data
      let index = indexOld

      // For cases of adding links, the index variable is increased by 1, for cases of replacing a link, the same url is used.
      if (size > 1) {
        index++
      }

      if (status === OK_STATUS) {
        const cadenasClase = data.map((cadena) => {
          const urlClass = new Url(
            cadena._id,
            index,
            cadena.url,
            cadena.titles,
            cadena.audi_createdDate,
            cadena.resets
          )
          index++
          return urlClass
        })

        return new ServiceResponse({
          message,
          status,
          data: cadenasClase
        })
      } else {
        return new ServiceResponse({
          status,
          message: 'Service error. ' + message,
          data: null
        })
      }
    })
    .catch((error) => {
      return new ServiceResponse({
        status: 0,
        message: 'Se produjo un error al consultar el servicio.' + error,
        data: null
      })
    })

  return cadenasClaseRsp
}
