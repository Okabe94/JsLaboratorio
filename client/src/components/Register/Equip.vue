<template>
  <div>
    <panel title='Registar Equipo'>
      <v-form ref="equip">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            required
            :rules="[required]"
            label="Nombre"
            v-model="equipo.nombre"
          ></v-text-field>
          <br>
          <v-text-field
            required
            :rules="[required]"
            label="Código de Barras"
            v-model="equipo.codBarras"
            type="number"
            min="0"
          ></v-text-field>
          <v-textarea
            required
            :rules="[required]"
            label="Descripción"
            v-model="equipo.descripcion"
            type="number"
            min="0"
          ></v-textarea>
          <br>
          <v-btn
            class="green darken-1"
            dark
            @click="registerEquip">
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
import EquipmentService from '@/services/EquipmentService'

export default {
  data () {
    return {
      equipo: {
        nombre: '',
        codBarras: '',
        descripcion: '',
        disponible: true
      },
      error: null,
      success: null,
      required: (value) => !!value || 'Requerido.'
    }
  },
  methods: {
    async registerEquip () {
      if (!this.checkFields(this.equipo)) {
        return
      }
      this.equipo.nombre = this.equipo.nombre.trim()
      this.equipo.nombre = this.equipo.nombre.charAt(0).toUpperCase() + this.equipo.nombre.slice(1)
      try {
        await EquipmentService.registerEquip(this.equipo)
        this.error = null
        this.success = 'Equipo creado exitosamente'
        this.$refs.equip.reset()
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
