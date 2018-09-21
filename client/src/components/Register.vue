<template>
  <div>
    <panel title='Registrar Usuarios'>

      <div class="pl-4 pr-4 pt-2 pb-2">
        <v-text-field
          required
          :rules="[required]"
          label="Nombre"
          v-model="monitor.Nombre"
          autofocus
        ></v-text-field>
        <br>
        <v-text-field
          required
          :rules="[required]"
          label="Carnet"
          v-model="monitor.Carnet"
          type="number"
          min="0"
        ></v-text-field>
        <br>
        <v-text-field
          required
          :rules="[required]"
          label="Contraseña"
          v-model="monitor.Pass"
          type="password"
        ></v-text-field>
        <br>
        <v-select
          v-model="monitor.FKRango"
          :items="items"
          label="Cargo"
        ></v-select>
        <br>
        <v-btn
          class="green darken-1"
          dark
          @click="register">
          Registrar
        </v-btn>
      </div>

    </panel>
  <v-alert
    :value="error"
    type="error"
    dismissible
    transition="scale-transition"
    time=0.2
  >{{ error }}</v-alert>
  <v-alert
    :value="success"
    type="success"
    dismissible
    transition="scale-transition"
    time=0.5
  >{{ success }}</v-alert>
  <!-- <div v-if="error" class="danger-red">
    {{ error }}
  </div> -->
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      monitor: {
        Nombre: '',
        Carnet: '',
        Pass: '',
        FKRango: ''
      },
      error: null,
      success: null,
      items: ['Monitor', 'Administrador'],
      required: (value) => !!value || 'Requerido.'
    }
  },
  methods: {
    async register () {
      this.monitor.Nombre = this.monitor.Nombre.trim()
      switch (this.monitor.FKRango) {
        case 'Monitor':
          this.monitor.FKRango = 2
          break
        case 'Administrador':
          this.monitor.FKRango = 1
          break
        default:
          this.monitor.FKRango = 2
      }
      try {
        await AuthenticationService.register(this.monitor)
        this.error = null
        this.success = 'Registro creado exitosamente'
      } catch (error) {
        this.error = error.response.data.error
        this.success = null
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
