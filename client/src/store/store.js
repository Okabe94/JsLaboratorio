import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    carnet: null,
    iscarnetLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setCarnet (state, carnet) {
      state.carnet = carnet
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setCarnet ({ commit }, carnet) {
      commit('setCarnet', carnet)
    }
  }
})
