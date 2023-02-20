export const TemplateParser = (data, type) => {
  if (type === 'date') {
    const date = new Date(data)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit'
    })
  } else if (type === 'string') {
    return data
  }
}
