import axios from 'axios'

const instance = axios.create({
  timeout: 5000
})

instance.defaults.validateStatus = function (status) {
  const valideStatus = [201, 500, 406]
  return valideStatus.includes(status)
}

export default instance
