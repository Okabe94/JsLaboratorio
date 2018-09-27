<template>
  <div>
    <panel title='Registrar Estudiante'>
      <v-form ref="student">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            required
            :rules="[required]"
            label="Nombre"
            v-model="estudiante.Nombre"
            autofocus
          ></v-text-field>
          <br>
          <v-text-field
            required
            :rules="[required]"
            label="Carnet"
            v-model="estudiante.Carnet"
            type="number"
            min="0"
          ></v-text-field>
          <br>
          <v-text-field
            required
            :rules="[required]"
            label="Plan Academico"
            v-model="estudiante.Pass"
          ></v-text-field>
          <br>
          <v-btn
            class="green darken-1"
            dark
            @click="registerStudent">
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
import StudentRegisterService from '@/services/StudentRegisterService'

export default {
  data () {
    return {
      estudiante: {
        Nombre: '',
        Carnet: '',
        Plan: ''
      },
      error: null,
      success: null,
      required: (value) => !!value || 'Requerido.'
    }
  },
  methods: {
    async registerStudent () {
      if (!this.checkFields(this.estudiante)) {
        return
      }
      this.estudiante.Nombre = this.estudiante.Nombre.trim()
      this.estudiante.Plan = this.estudiante.Plan.trim()

      try {
        const resp = await StudentRegisterService.registerUser(this.estudiante)
        this.error = null
        if (resp.data.register) {
          this.success = 'Estudiante creado exitosamente'
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
