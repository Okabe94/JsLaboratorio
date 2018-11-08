<template>
  <div>
    <panel title='Registrar Estudiante'>
      <v-form ref="student">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            required
            :rules="[required]"
            label="Nombre"
            v-model="estudiante.nombre"
          ></v-text-field>
          <br>
          <v-text-field
            required
            :rules="[required]"
            label="Carnet"
            v-model="estudiante.carnet"
            type="number"
            min="0"
          ></v-text-field>
          <br>
          <v-autocomplete
            required
            :rules="[required]"
            :items="items"
            label="Plan Academico"
            v-model="estudiante.planAcademico"
          ></v-autocomplete>
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
import Panel from '@/components/reusable/Panel'
import StudentService from '@/services/StudentService'

export default {
  data () {
    return {
      items: [
        'Ingeniería Electrónica',
        'Ingeniería de Sistemas',
        'Ingeniería Industrial',
        'Tecnología en Desarrollo de Sistemas de Información',
        'Tecnología en Gestión de Redes',
        'Derecho',
        'Seguridad y Salud en el Trabajo',
        'Técnico Profesional en Tránsito, Transporte y Seguridad Vial',
        'Contaduría Pública',
        'Administración de Negocios Internacionales',
        'Administración Financiera',
        'Mercadeo',
        'Psicología'
      ],
      estudiante: {
        nombre: '',
        carnet: '',
        planAcademico: ''
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
      this.estudiante.nombre = this.estudiante.nombre.trim()
      this.estudiante.nombre = this.estudiante.nombre.charAt(0).toUpperCase() + this.estudiante.nombre.slice(1)
      try {
        const resp = await StudentService.registerStudent(this.estudiante)
        this.error = null
        if (resp.data.register) {
          this.success = 'Estudiante creado exitosamente'
          this.$refs.student.reset()
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
