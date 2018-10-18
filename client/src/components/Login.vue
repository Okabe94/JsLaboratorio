<template>
  <div>
    <panel title='Ingreso de Usuarios'>

      <div class="pl-4 pr-4 pt-2 pb-2">
        <v-text-field
          required
          :rules="[required]"
          label="Carnet"
          v-model="carnet"
          autofocus
          type="Number"
          min="0"
        ></v-text-field>
        <br>
        <v-text-field
          required
          :rules="[required]"
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

    </panel>
  <v-alert
   :value="error"
   type="error"
   transition="scale-transition"
   time=0.2>
    {{ error }}
  </v-alert>
  </div>
</template>

<script>
import MonitorService from '@/services/MonitorService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      carnet: '',
      password: '',
      error: null,
      required: (value) => !!value || 'Requerido.'
    }
  },
  methods: {
    async login () {
      try {
        const response = await MonitorService.login({
          carnet: this.carnet,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setIdentity', {
          nombre: response.data.monitor.nombre,
          carnet: response.data.monitor.carnet
        })
        this.$store.dispatch('setRango', response.data.monitor.rango)
        this.error = null
        this.$router.push({ name: 'home' })
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
