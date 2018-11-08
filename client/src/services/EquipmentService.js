import Api from '@/services/Api'

export default {
  registerEquip (details) {
    return Api().post('registerEquip', details)
  },
  indexEquip () {
    return Api().get('indexEquip')
  }
}
