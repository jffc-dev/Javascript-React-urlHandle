// Thirds
import axios from 'axios'

// Owns
import CONSTANTS from '../../constants'
import { ServiceResponse } from '../../models/Response'

export const deleteUrlById = async (idUrl) => {
  const urlResult = await axios
    .delete(CONSTANTS.urlBackend + '/api/url/' + idUrl)
    .then((response) => {
      const { data, message, status } = response.data

      if (status === CONSTANTS.OK_STATUS) {
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

  return urlResult
}
