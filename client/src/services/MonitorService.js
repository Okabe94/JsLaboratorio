import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().post('login', credentials)
  },
  registerMonitor (credentials) {
    return Api().post('registerMonitor', credentials)
  },
  indexMonitor () {
    return Api().get('indexMonitor')
  },
  deleteMonitor (credentials) {
    return Api().post('deleteMonitor', credentials)
  }
}
