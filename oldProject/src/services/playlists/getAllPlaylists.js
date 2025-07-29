// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_PLAYLIST, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'

export const getPlaylists = async () => {
  const cadenasClase = await axios
    .get(API_URL_BASE + API_URL_PLAYLIST)
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

  return cadenasClase
}
