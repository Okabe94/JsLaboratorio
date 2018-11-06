<template>
  <div>
    <panel title='Registrar Monitor'>
      <v-form ref="monitor">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            required
            :rules="[required]"
            label="Nombre"
            v-model="monitor.nombre"
          ></v-text-field>
          <br>
          <v-text-field
            required
            :rules="[required]"
            label="Carnet"
            v-model="monitor.carnet"
            type="number"
            min="0"
          ></v-text-field>
          <br>
          <v-text-field
            required
            :rules="[required]"
            label="Contraseña"
            v-model="monitor.password"
            type="password"
          ></v-text-field>
          <br>
          <v-select
            v-model="monitor.rango"
            :items="items"
            label="Cargo"
          ></v-select>
          <br>
          <v-btn
            class="green darken-1"
            dark
            @click="registerUser">
            Registrar
          </v-btn>
        </div>
      </v-form>
    </panel>
    <v-alert
      :value="error"
      type="error"
      transition="scale-transition"
      time=0.2>
        {{ error }}
    </v-alert>
    <v-alert
      :value="success"
      type="success"
      transition="scale-transition"
      time=0.2>
        {{ success }}
  </v-alert>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import MonitorService from '@/services/MonitorService'

export default {
  data () {
    return {
      monitor: {
        nombre: '',
        carnet: '',
        password: '',
        rango: 0,
        cargo: ''
      },
      error: null,
      success: null,
      items: [
        { text: 'Monitor', value: 2 },
        { text: 'Administrador', value: 1 }],
      required: (value) => !!value || 'Requerido.'
    }
  },
  methods: {
    async registerUser () {
      if (this.monitor.rango === 1) {
        this.monitor.cargo = 'Administrador'
      } else {
        this.monitor.cargo = 'Monitor'
      }
      if (!this.checkFields(this.monitor)) {
        return
      }
      this.monitor.nombre = this.monitor.nombre.trim()
      this.monitor.nombre = this.monitor.nombre.charAt(0).toUpperCase() + this.monitor.nombre.slice(1)
      try {
        const resp = await MonitorService.registerMonitor(this.monitor)
        this.error = null
        if (resp.data.register) {
          this.success = 'Usuario creado exitosamente'
          this.$refs.monitor.reset()
        }
      } catch (error) {
        this.error = error.response.data.error
        this.success = null
      }
    },
    checkFields (jsonObject) {
      const allFieldsDone = Object.keys(jsonObject).every(key => !!jsonObject[key])
      if (!allFieldsDone) {
        this.error = 'Por favor llenar todos los campos'
        return false
      }
      return true
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
