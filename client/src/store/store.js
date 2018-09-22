import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    nombre: 'Visitante',
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
    setIdentity (state, nombre, carnet) {
      state.carnet = carnet
      state.nombre = nombre
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
    setIdentity ({ commit }, nombre, carnet) {
      commit('setIdentity', nombre, carnet)
    },
    setRango ({ commit }, rango) {
      commit('setRango', rango)
    }
  }
})
