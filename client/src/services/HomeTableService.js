import Api from '@/services/Api'

export default {
  indexHome () {
    return Api().get('indexHome')
  },
  indexDetails (Carnet) {
    return Api().post('indexDetails', Carnet)
  }
}
