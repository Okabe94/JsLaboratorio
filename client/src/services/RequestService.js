import Api from '@/services/Api'

export default {
  post (credentials) {
    return Api().post('prueba', credentials)
  }
}
