import Api from '@/services/Api'

export default {
  register (details) {
    return Api().post('equip', details)
  }
}
