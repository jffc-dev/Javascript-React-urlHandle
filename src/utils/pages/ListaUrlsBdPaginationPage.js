import { OK_STATUS } from '../../constants'
import { deleteUrlById } from '../../services/urls/deleteUrlById'
import { abrirUrlEspecifica } from '../url'

export const handleGoAction = (cadena) => {
  abrirUrlEspecifica(cadena.currentUrl)
}

export const handleLoadAction = (cadena) => {
  abrirUrlEspecifica(cadena)
}

export const handleResetAction = (cadena) => {
  abrirUrlEspecifica(cadena)
}

export const handleDeleteAction = async (linkToDelete, links, setLinks, setToastAppProperties) => {
  const { _id: idUrl } = linkToDelete
  const cadenasTemp = links
  const { data, message, status } = await deleteUrlById(idUrl)
  const index = cadenasTemp.findIndex((object) => {
    return object._id === data
  })
  if (status === OK_STATUS) {
    if (index !== -1) {
      cadenasTemp.splice(index, 1)
      setLinks([])
      setLinks(cadenasTemp)
      setToastAppProperties({
        title: 'SUCCESS',
        message: `${message}`,
        type: 'success',
        date: new Date()
      })
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
