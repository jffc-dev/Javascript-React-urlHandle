// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_URLS, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'
import { Url } from '../../models/Url'

export const addResetToUrl = async (idUrl, url, index) => {
  const rpta = await axios
    .patch(API_URL_BASE + API_URL_URLS + '/add-reset/' + idUrl, {
      newUrl: url
    })
    .then((response) => {
      const { data, message, status } = response.data

      if (status === OK_STATUS) {
        const cadena = { ...data }

        return new ServiceResponse({
          status,
          message,
          data: new Url(
            cadena._id,
            index,
            cadena.url,
            cadena.titles,
            cadena.audi_createdDate,
            cadena.resets
          )
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

  return rpta
}
