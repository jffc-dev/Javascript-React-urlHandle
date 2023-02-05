// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_URLS, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'
import { Url } from '../../models/Url'

export const addTitleToUrl = async (cadenaId, title, cadenaIndex) => {
  const rpta = await axios
    .patch(API_URL_BASE + API_URL_URLS + 'add-title/' + cadenaId, {
      title
    })
    .then((response) => {
      const { data, message, status } = response.data
      if (status === OK_STATUS) {
        const urlClass = new Url(
          data._id,
          cadenaIndex,
          data.url,
          data.titles,
          data.audi_createdDate,
          data.resets
        )
        return new ServiceResponse({
          status,
          message,
          data: urlClass
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
