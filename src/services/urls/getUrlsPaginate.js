// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_URLS, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'
import { Url } from '../../models/Url'

export const getUrlsPaginate = async () => {
  const cadenasClase = await axios
    .get(API_URL_BASE + API_URL_URLS + '/v2?page=3&size=10')
    .then((response) => {
      const {
        data: { items, totalItems, totalPages, currentPage },
        message,
        status
      } = response.data

      if (status === OK_STATUS) {
        const datosClass = items.map((cadena, index) => {
          return new Url(
            cadena._id,
            index + 1,
            cadena.url,
            cadena.titles,
            cadena.audi_createdDate,
            cadena.resets
          )
        })

        return new ServiceResponse({
          status,
          message,
          data: { items: datosClass, totalItems, totalPages, currentPage }
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
        message: 'An error occurred reading the service response. ' + error,
        data: null
      })
    })

  return cadenasClase
}
