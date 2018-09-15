import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().post('/login', credentials)
  },
  create (credentials) {
    return Api().post('register', credentials)
  }
}
