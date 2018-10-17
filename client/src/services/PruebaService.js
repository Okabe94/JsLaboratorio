import Api from '@/services/Api'

export default {
  indexPrueba (credentials) {
    return Api().get('prueba')
  }
}
