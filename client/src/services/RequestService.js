import Api from '@/services/Api'

export default {
  registerRequest (credentials) {
    return Api().post('request', credentials)
  },
  updateRequest (credentials) {
    return Api().post('updateRequest', credentials)
  },
  updateModule (credentials) {
    return Api().post('updateMod', credentials)
  },
  deleteItem (credentials) {
    return Api().post('deleteItem', credentials)
  },
  deleteRequest (credentials) {
    return Api().post('deleteRequest', credentials)
  }
}
