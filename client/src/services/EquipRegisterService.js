import Api from '@/services/Api'

export default {
  registerEquip (details) {
    return Api().post('register-Equip', details)
  }
}
