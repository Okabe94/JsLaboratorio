<template>
  <div>
    <!-- <div v-if="$store.state.isAdmin"> -->
      <panel title='Registrar Equipos'>

        <v-form ref="form">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              required
              :rules="[required]"
              label="Nombre"
              v-model="equipo.Nombre"
            ></v-text-field>
            <br>
            <v-text-field
              required
              :rules="[required]"
              label="Código de Barras"
              v-model="equipo.CodBarras"
              type="number"
              min="0"
            ></v-text-field>
            <br>
            <v-btn
              class="green darken-1"
              dark
              @click="register">
              Registrar
            </v-btn>
          </div>
        </v-form>
      </panel>
    <!-- </div> -->
    <!-- <div v-else>
      <noAuth/>
    </div> -->
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import noAuth from '@/components/Auth'
import EquipRegisterService from '@/services/EquipRegisterService'

export default {
  data () {
    return {
      equipo: {
        Nombre: '',
        CodBarras: ''
      },
      error: null,
      success: null,
      required: (value) => !!value || 'Requerido.'
    }
  },
  methods: {
    async register () {
      const allFieldsDone = Object
        .keys(this.equipo)
        .every(key => !!this.equipo[key])
      if (!allFieldsDone) {
        this.error = 'Por favor llenar todos los campos'
        return
      }
      this.equipo.Nombre = this.equipo.Nombre.trim()
      try {
        const resp = await EquipRegisterService.register(this.equipo)
        this.error = null
        if (resp.data.register) {
          this.success = 'Registro creado exitosamente'
          this.$refs.form.reset()
        }
      } catch (error) {
        this.error = error.response.data.error
        this.success = null
      }
    }
  },
  components: {
    Panel,
    noAuth
  }
}
</script>

<style scoped>
</style>
