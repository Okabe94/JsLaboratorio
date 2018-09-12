<template>
  <div>
      <v-layout align-center column fill-height >
        <v-flex>
            <v-toolbar flat dense dark class="green darken-1">
              <v-toolbar-title>Ingreso de monitores</v-toolbar-title>
            </v-toolbar>
            <div class="white elevation-4">

              <div class="pl-4 pr-4 pt-2 pb-2">
                <v-text-field
                  label="Usuario"
                  v-model="user"
                  autofocus
                ></v-text-field>
                <br>
                <v-text-field
                  label="Contraseña"
                  v-model="password"
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
      user: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const response = await AuthenticationServices.login({
        user: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<style scoped>

</style>
