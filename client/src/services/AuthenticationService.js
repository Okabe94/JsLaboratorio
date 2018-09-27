import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().post('login', credentials)
  },
  registerUser (credentials) {
    return Api().post('register-User', credentials)
  }
}
