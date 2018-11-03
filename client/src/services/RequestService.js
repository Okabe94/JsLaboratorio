import Api from '@/services/Api'

export default {
  registerRequest (credentials) {
    return Api().post('request', credentials)
  },
  updateRequest (data) {
    return Api().post('update', data)
  }
}
