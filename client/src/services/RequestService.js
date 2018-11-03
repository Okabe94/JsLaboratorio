import Api from '@/services/Api'

export default {
  registerRequest (credentials) {
    return Api().post('request', credentials)
  },
  updateRequest (credentials) {
    return Api().post('updateEquip', credentials)
  },
  updateModule (credentials) {
    return Api().post('updateMod', credentials)
  }
}
