import Api from '@/services/Api'

export default {
  mainTable () {
    return Api().get('mainTable')
  }
}
