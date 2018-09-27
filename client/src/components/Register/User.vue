<template>
  <div>
    <panel title='Registrar Monitor'>
      <v-form ref="user">
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
import AuthenticationService from '@/services/AuthenticationService'

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
    async registerUser () {
      if (!this.checkFields(this.monitor)) {
        return
      }
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
        const resp = await AuthenticationService.registerUser(this.monitor)
        this.error = null
        if (resp.data.register) {
          this.success = 'Usuario creado exitosamente'
          this.$refs.user.reset()
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
