import { OK_STATUS } from '../../constants'
import { addMultipleUrlDetailedService } from '../../services/urls/addMultipleUrlDetailed'

export const handleCreateMultipleDetailedUrl = async (
  urls,
  handleReset,
  setCurrentIdInput,
  initialData,
  setToastAppProperties
) => {
  const { data, message, status } = await addMultipleUrlDetailedService(urls)
  if (status === OK_STATUS) {
    setCurrentIdInput(1)
    handleReset({ newIdInput: 1, newInput: initialData })
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
