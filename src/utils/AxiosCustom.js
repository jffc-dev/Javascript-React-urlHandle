import axios from 'axios'

const instance = axios.create({
  timeout: 5000
})

instance.defaults.validateStatus = function (status) {
  const valideStatus = [201, 500]
  return valideStatus.includes(status)
}

export default instance
