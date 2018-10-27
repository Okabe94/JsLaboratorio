import Api from '@/services/Api'

export default {
  registerRequest (credentials) {
    return Api().post('request', credentials)
  }
}
