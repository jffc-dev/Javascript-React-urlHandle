// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_URLS, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'

export const loadTitleOfUrlService = async (idUrl) => {
  const resp = await axios
    .post(API_URL_BASE + API_URL_URLS + 'load/', {
      id: idUrl
    })
    .then((response) => {
      const { data, message, status } = response.data

      if (status === OK_STATUS) {
        return new ServiceResponse({
          status,
          message,
          data
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
