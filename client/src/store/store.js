import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    carnet: null,
    rango: null,
    isAdmin: false,
    isLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isLoggedIn = true
      } else {
        state.isLoggedIn = false
      }
    },
    setCarnet (state, carnet) {
      state.carnet = carnet
    },
    setRango (state, rango) {
      state.rango = rango
      if (rango === 1) {
        state.isAdmin = true
      } else {
        state.isAdmin = false
      }
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setCarnet ({ commit }, carnet) {
      commit('setCarnet', carnet)
    },
    setRango ({ commit }, rango) {
      commit('setRango', rango)
    }
  }
})
