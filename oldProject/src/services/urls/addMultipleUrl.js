// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_URLS, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'
import { Url } from '../../models/Url'

export const addMultipleUrlService = async (urls) => {
  const resp = await axios
    .post(API_URL_BASE + API_URL_URLS + 'multiple/', {
      urls
    })
    .then((response) => {
      const { data, message, status } = response.data

      const datosClass = data.map((cadena, index) => {
        return new Url(
          cadena._id,
          index + 1,
          cadena.url,
          cadena.titles,
          cadena.audi_createdDate,
          cadena.resets
        )
      })

      if (status === OK_STATUS) {
        return new ServiceResponse({
          status,
          message,
          data: datosClass
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

  return resp
}
