<template>
  <div>
      <v-layout align-center column fill-height >
        <v-flex>
            <v-toolbar flat dense dark class="green darken-1">
              <v-toolbar-title>Ingreso de Monitores</v-toolbar-title>
            </v-toolbar>
            <div class="white elevation-4">

              <div class="pl-4 pr-4 pt-2 pb-2">
                <v-text-field
                  label="Carnet"
                  v-model="Carnet"
                  autofocus
                  type="Number"
                  min="0"
                ></v-text-field>
                <br>
                <v-text-field
                  label="Contraseña"
                  v-model="Pass"
                  type="password"
                ></v-text-field>
                <br>
                <v-btn
                  class="green darken-1"
                  dark
                  @click="login">
                  Acceder
                </v-btn>
              </div>

            </div>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
export default {
  data () {
    return {
      Carnet: '',
      Pass: ''
    }
  },
  methods: {
    async login () {
      const response = await AuthenticationServices.login({
        Carnet: this.Carnet,
        Pass: this.Pass
      })
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setMonitor', response.data.monitor)
    }
  }
}
</script>

<style scoped>

</style>
