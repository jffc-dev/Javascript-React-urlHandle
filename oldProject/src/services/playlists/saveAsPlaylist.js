// Thirds
import axios from '../../utils/AxiosCustom.js'

// Owns
import { API_URL_BASE, API_URL_PLAYLIST, OK_STATUS } from '../../constants'
import { ServiceResponse } from '../../models/Response'

export const saveAsPlaylist = async (urls) => {
  const links = urls.map((url) => url._id)
  const resp = await axios
    .post(API_URL_BASE + API_URL_PLAYLIST + 'save-list/', {
      links
    })
    .then((response) => {
      const { data, message, status } = response.data

      console.log(response.data)

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
