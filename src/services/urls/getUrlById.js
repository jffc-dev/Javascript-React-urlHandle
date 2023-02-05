// Thirds
import axios from 'axios'

// Owns
import { API_URL_BASE, API_URL_URLS } from '../../constants'
import { Url } from '../../models/Url'

export const getUrlById = async (idUrl) => {
  let urlResult = null

  await axios.get(API_URL_BASE + API_URL_URLS + idUrl).then((res) => {
    const cadena = res.data.url
    urlResult = new Url(
      cadena._id,
      1,
      cadena.url,
      cadena.titles,
      cadena.audi_createdDate,
      cadena.resets
    )
  })

  return urlResult
}
