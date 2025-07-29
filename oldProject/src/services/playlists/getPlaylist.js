// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_PLAYLIST, OK_STATUS } from '../../constants'
import { Url } from '../../models/Url'
import { ServiceResponse } from '../../models/Response'

export const getPlaylistById = async (idPlaylist) => {
  const urlResult = await axios
    .get(API_URL_BASE + API_URL_PLAYLIST + idPlaylist)
    .then((response) => {
      const { data, message, status } = response.data
      const { links, ...rest } = data
      if (status === OK_STATUS) {
        const urls = links.map((cadena, index) => {
          return new Url(
            cadena._id,
            index + 1,
            cadena.url,
            cadena.titles,
            cadena.audi_createdDate,
            cadena.resets
          )
        })

        const datosClass = { ...rest, urls }
        console.log(datosClass)

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

  return urlResult
}
