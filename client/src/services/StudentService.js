import Api from '@/services/Api'

export default {
  registerStudent (credentials) {
    return Api().post('register-Student', credentials)
  },
  indexStudent () {
    return Api().get('indexStudent')
  }
}
