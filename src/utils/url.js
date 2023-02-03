import { OK_STATUS } from '../constants.js'
import { deleteUrlById } from '../services/urls/deleteUrlById.js'
import { addMultipleUrlService } from '../services/urls/addMultipleUrl.js'

export const abrirUrlEspecifica = (cadena) => {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    href: cadena.url
  }).click()
}

export const updateArrayObject = (cadenas, setCadenas, urlOld, urlNew) => {
  const cadenasTemp = cadenas
  const index = cadenasTemp.findIndex((object) => {
    return object._id === urlOld._id
  })

  if (index !== -1) {
    cadenasTemp[index] = urlNew
    setCadenas([])
    setCadenas(cadenasTemp)
  }
}

export const hanldeDeleteUrl = async (url, cadenas, setCadenas, setToastAppProperties) => {
  const { _id: idUrl } = url
  const cadenasTemp = cadenas
  const { data, message, status } = await deleteUrlById(idUrl)

  const index = cadenasTemp.findIndex((object) => {
    return object._id === data
  })

  if (status === OK_STATUS) {
    if (index !== -1) {
      cadenasTemp.splice(index, 1)
      setCadenas([])
      setCadenas(cadenasTemp)
    }
  } else {
    setToastAppProperties({
      title: 'ERROR',
      message,
      type: 'danger',
      date: new Date()
    })
  }
}

export const handleCreateMultipleUrl = async (urls, setUrls, setToastAppProperties) => {
  const { data, message, status } = await addMultipleUrlService(urls)
  if (status === OK_STATUS) {
    setUrls('')
    setToastAppProperties({
      title: 'SUCCESS',
      message: `${message} ${data.length} urls were created.`,
      type: 'success',
      date: new Date()
    })
  } else {
    setToastAppProperties({
      title: 'ERROR',
      message,
      type: 'danger',
      date: new Date()
    })
  }
}
