import Api from '@/services/Api'

export default {
  indexCarrers () {
    return Api().get('indexCarrers')
  },
  indexTipoDoc () {
    return Api().get('indexTipoDoc')
  },
  indexReusable () {
    return Api().get('indexReusable')
  }
}