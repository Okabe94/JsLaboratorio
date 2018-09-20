<template>
  <div>
    <v-layout align-center column fill-height >
      <v-flex>
        <v-toolbar flat dense dark class="green darken-1">
          <v-toolbar-title>Creación de Monitores</v-toolbar-title>
        </v-toolbar>
        <div class="white elevation-4">

          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="Nombre"
              v-model="Nombre"
              autofocus
            ></v-text-field>
            <br>
            <v-text-field
              label="Carnet"
              v-model="Carnet"
              type="number"
              min="0"
              autofocus
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
              @click="register">
              Registrar
            </v-btn>
          </div>

        </div>
      </v-flex>
      <div class="error" margin="auto" v-html="error" />
    </v-layout>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      Nombre: '',
      Carnet: '',
      Pass: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        this.Nombre = this.Nombre.trim()
        const response = await AuthenticationService.register({
          Nombre: this.Nombre,
          Carnet: this.Carnet,
          Pass: this.Pass
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setCarnet', response.data.carnet)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
