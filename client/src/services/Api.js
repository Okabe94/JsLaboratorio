import axios from 'axios'
var ip = require('ip')

export default () => {
  return axios.create({
    baseURL: 'http://' + ip.address() + ':8081/'
  })
}
