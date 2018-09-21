<template>
  <div>
    <panel title='Ingreso de Usuarios'>

      <div class="pl-4 pr-4 pt-2 pb-2">
        <v-text-field
          required
          :rules="[required]"
          label="Carnet"
          v-model="Carnet"
          autofocus
          type="Number"
          min="0"
        ></v-text-field>
        <br>
        <v-text-field
          required
          :rules="[required]"
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

    </panel>
  <v-alert :value="error" type="error" dismissible transition="scale-transition" time=0.2>
    {{ error }}
  </v-alert>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      Carnet: '',
      Pass: '',
      error: null,
      required: (value) => !!value || 'Requerido.'
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationServices.login({
          Carnet: this.Carnet,
          Pass: this.Pass
        })
        console.log(response)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setCarnet', response.data.monitor.Carnet)
        this.$store.dispatch('setRango', response.data.monitor.FKRango)
        this.error = null
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
