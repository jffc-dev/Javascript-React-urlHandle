// Thirds
import axios from 'axios'

// Owns
import CONSTANTS from '../../constants'
import { ServiceResponse } from '../../models/Response'
import { Url } from '../../models/Url'

export const getNewUrlService = async (urls, size, indexOld) => {
  const cadenasClase = []

  const porceso = await axios
    .post(CONSTANTS.urlBackend + '/api/url/get-new-url/', {
      urls,
      size
    })
    .then((apiResponse) => {
      const { data: apiResponseFormat } = apiResponse
      const { data: urls, ...resp1 } = apiResponseFormat
      let index = indexOld

      urls.map((cadena) => {
        cadenasClase.push(
          new Url(
            cadena._id,
            index + 1,
            cadena.url,
            cadena.titles,
            cadena.audi_createdDate,
            cadena.resets
          )
        )
        index++
        return null
      })

      return new ServiceResponse({
        ...resp1,
        data: cadenasClase
      })
    })
    .catch((error) => {
      return new ServiceResponse({
        status: 0,
        message: 'Se produjo un error al consultar el servicio.' + error,
        data: null
      })
    })

  return porceso
}
