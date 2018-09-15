import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    monitor: null,
    isMonitorLoggedIn: false
  },
  mutations:{
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isMonitorLoggedIn = true
      } else {
        state.isMonitorLoggedIn = false
      }
    },
    setMonitor (state, monitor) {
      state.monitor = monitor
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setMonitor ({ commit }, monitor) {
      commit('setMonitor', monitor)
    }
  }
})

