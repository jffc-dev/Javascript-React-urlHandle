import { OK_STATUS } from '../../constants'
import { addTitleToUrl } from '../../services/urls/addTitleToUrl'
import { getUrlsRandom } from '../../services/urls/getUrlsRandom'
import { abrirUrlEspecifica, updateArrayObject } from '../url'

export const OpenAdvancedGoogleSearch = (cadena) => {
  const urlSearch = cadena.currentTitle || cadena.currentUrl
  const urlGoogle = `https://www.google.com.pe/search?tbm=vid&hl=es-419&as_q=${encodeURI(
    urlSearch.replace('&', '')
  )}&as_epq=&as_oq=&as_eq=&lr=&as_qdr=all&as_sitesearch=&safe=images&tbs=dur%3Al`
  abrirUrlEspecifica(urlGoogle)
}

export const openCurrentLink = (cadenas, currentLink, setCurrentLink) => {
  abrirUrlEspecifica(cadenas.at(currentLink).currentUrl)
  setCurrentLink(currentLink + 1)
}

export const handleGetUrlsRandom = async (
  nroResultados,
  setCadenas,
  setLinkCount,
  setCurrentLink,
  setmodalConfirmationRandomShow,
  setToastAppProperties
) => {
  const { data, message, status } = await getUrlsRandom(nroResultados)

  if (status === OK_STATUS) {
    setCadenas(data)
    setLinkCount(data.length)
    setCurrentLink(0)

    setmodalConfirmationRandomShow(false)
  } else {
    setToastAppProperties({
      title: 'ERROR',
      message,
      type: 'danger',
      date: new Date()
    })
  }
}

export const PressOkModalLoadTitle = async (
  cadena,
  cadenaIndex,
  cadenas,
  setCadenas,
  tFormTitle,
  tFormReset,
  setToastAppProperties,
  setmodalLoadTitleShow
) => {
  const { data, message, status } = await addTitleToUrl(cadena._id, tFormTitle, cadenaIndex)
  if (status === OK_STATUS) {
    const urlOld = cadena
    updateArrayObject(cadenas, setCadenas, urlOld, data)
    tFormReset()
    setmodalLoadTitleShow(false)
  } else {
    setToastAppProperties({
      title: 'ERROR',
      message,
      type: 'danger',
      date: new Date()
    })
  }
}
