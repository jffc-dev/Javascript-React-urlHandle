// Thirds
import axios from 'axios'

// Owns
import CONSTANTS from '../../constants'
import { Url } from '../../models/Url'

export const getUrlsRandom = async (nroResultados) => {
  const cadenasClase = []

  await axios.get(CONSTANTS.urlBackend + '/api/url/random/' + nroResultados).then((res) => {
    const datos = res.data.urls

    datos.map((cadena, index) => {
      cadenasClase.push(
        new Url(
          cadena._id,
          index + 1,
          cadena.url,
          cadena.titles,
          cadena.audi_createdDate,
          cadena.resets
        )
      )
      return null
    })
  })

  return cadenasClase
}
