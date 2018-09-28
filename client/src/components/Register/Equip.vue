<template>
  <div>
    <panel title='Registar Equipo'>
      <v-form ref="equip">
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
    async registerEquip () {
      if (!this.checkFields(this.equipo)) {
        return
      }
      this.equipo.Nombre = this.equipo.Nombre.trim()
      try {
        await EquipRegisterService.registerEquip(this.equipo)
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
