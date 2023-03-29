// Thirds
import axios from '../../utils/AxiosCustom.js'

// Owns
import { API_URL_BASE, API_URL_URLS, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'

export const addMultipleUrlDetailedService = async (urls) => {
  const resp = await axios
    .post(API_URL_BASE + API_URL_URLS + 'multiple-detailed/', {
      urls
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
      console.log(error)
      return new ServiceResponse({
        status: 0,
        message: 'An error occurred reading the service response. ' + error,
        data: null
      })
    })

  return resp
}
