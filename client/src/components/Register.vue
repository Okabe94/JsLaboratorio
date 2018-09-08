<template>
  <div>
    <v-container fluid grid-list-xl text-xs-center>
      <v-layout column>
        <v-flex xs10 offset-xs1>

          <div>
            <v-toolbar flat dense dark class="green darken-1">
              <v-toolbar-title>Ingreso de monitores</v-toolbar-title>
            </v-toolbar>
              <div dense class="pl-4 pr-4 pt-2 pb-2">
                <v-text-field
                  label="Usuario"
                  v-model="user"
                  autofocus
                ></v-text-field>
                <br>
                <v-text-field
                  label="Contraseña"
                  v-model="password"
                ></v-text-field>
                <br>
                <v-btn
                  @click="register">
                  Acceder
                </v-btn>
              </div>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
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
    async register () {
      const response = await AuthenticationServices.register({
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
