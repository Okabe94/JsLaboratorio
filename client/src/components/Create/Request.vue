<template>
  <div>
    <panel title="Registrar Préstamo">
      <v-form ref="request">
        <v-card>
          <v-card-title>
              <v-autocomplete
                required
                :rules="[required]"
                v-model="estudiante"
                :hint="`${estudiante.nombre}, ${estudiante.carnet}`"
                :items="students"
                item-text="carnet"
                item-value="nombre"
                label="Estudiante"
                return-object
                single-line
                persistent-hint
                class="ml-2 mr-2">
              </v-autocomplete>
              <v-text-field
                type="number"
                v-model="request.modulo.salon"
                placeholder="Salon"
                min="0"
                class="ml-2 mr-2">
              </v-text-field>
              <v-text-field
                type="number"
                v-model="request.modulo.numero"
                placeholder="Modulo"
                min="0"
                class="ml-2 mr-2">
              </v-text-field>
              <v-btn
                color="orange lighten-1"
                dark
                class="font-weight-bold"
                @click="addEquip">
                Adicionar Equipo
              </v-btn>
              <v-btn
                color="green darken-1"
                dark
                class="font-weight-bold"
                @click="register">
                Confirmar
              </v-btn>
          </v-card-title>

          <v-data-table
          hide-actions
          :items="rows">

            <template slot="headers" slot-scope="props">
              <tr>
                <th><strong>Equipo</strong></th>
                <th><strong>Código de barras</strong></th>
                <th><strong>Cantidad</strong></th>
                <th><strong>Acción</strong></th>
              </tr>
            </template>

            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  <v-autocomplete
                    type="text"
                    placeholder="Equipo"
                    :items="equipo"
                    v-model="props.item.nombre">
                  </v-autocomplete>
                </td>
                <td>
                  <v-text-field
                    type="number"
                    placeholder="Código de barras"
                    v-model="props.item.codBarras">
                  </v-text-field>
                </td>
                <td>
                  <v-text-field
                    type="number"
                    min="0"
                    placeholder="Cantidad"
                    v-model="props.item.cantidad">
                  </v-text-field>
                </td>
                <td>
                  <v-tooltip bottom>
                    <i
                      slot="activator"
                      class="material-icons"
                      v-on:click="removeElement(props.item)"
                      style="cursor: pointer"
                      tooltip="Eliminar">
                      delete
                    </i>
                    <span>Eliminar</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <v-textarea
          v-model="request.observacion"
          outline
          placeholder="Observación"
          rows="1">
        </v-textarea>
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
import EquipmentService from '@/services/EquipmentService'
import StudentService from '@/services/StudentService'
import RequestService from '@/services/RequestService'
import Panel from '@/components/reusable/Panel'

export default {
  data () {
    return {
      required: (value) => !!value || 'Requerido.',
      request: {
        estudiante: {
          nombre: '',
          carnet: ''
        },
        equipo: [],
        modulo: {
          salon: '',
          numero: ''
        },
        monitorEntrega: {
          nombre: this.$store.state.nombre,
          carnet: this.$store.state.carnet
        },
        observacion: ''
      },
      equipo: [],
      rows: [],
      students: [],
      estudiante: { nombre: 'nombre', carnet: 'carnet' },
      error: '',
      success: ''
    }
  },
  methods: {
    addEquip () {
      this.rows.push({
        nombre: '',
        codBarras: '',
        cantidad: ''
      })
    },
    removeElement (item) {
      const index = this.rows.indexOf(item)
      confirm('¿Seguro que desea eliminar el equipo?') && this.rows.splice(index, 1)
    },
    async register () {
      this.request.estudiante = this.estudiante
      this.request.equipo = []
      for (let i = 0; i < this.rows.length; i++) {
        this.request.equipo.push(this.rows[i])
      }
      if (!this.checkFields(this.request)) {
        return
      }
      try {
        await RequestService.registerRequest(this.request)
        this.setSuccess('Equipo creado exitosamente')
        this.clearFields()
      } catch (error) {
        this.setError(error.response.data.error)
      }
    },
    checkFields (request) {
      // Validar si el estudiante esta en el form
      const studentGoodToGo = request.estudiante.nombre !== 'nombre'

      // Validar si se tiene un equipo
      if (request.equipo.length >= 1) {
        // Validar que estén los campos llenos
        var equipGoodToGo = this.checkEquip(request)
      } else {
        equipGoodToGo = false
      }
      // Validar si se tiene un modulo con salon
      const moduloGoodToGo = (request.modulo.numero !== '' && request.modulo.salon !== '')

      if (!studentGoodToGo) {
        this.setError('Por favor ingrese el carnet del estudiante')
        return false
      }

      // Debe existir o un equipo o un modulo para ser válido
      if (!(equipGoodToGo || moduloGoodToGo)) {
        this.setError('Ingrese valores para un módulo o un equipo a prestar')
        return false
      }

      // Si se cumple lo todo lo anterior, se procede
      return true
    },
    checkEquip (request) {
      for (let i = 0; i < request.equipo.length; i++) {
        if (request.equipo[i].nombre === '') {
          return false
        }
        if (request.equipo[i].codBarras === '') {
          return false
        }
        if (request.equipo[i].cantidad === '') {
          return false
        }
      }
      return true
    },
    clearFields () {
      this.estudiante = { nombre: 'nombre', carnet: 'carnet' }
      this.rows = []
      this.request.modulo.salon = ''
      this.request.modulo.numero = ''
      this.request.observacion = ''
    },
    setError (text) {
      this.error = text
      this.success = null
    },
    setSuccess (text) {
      this.success = text
      this.error = null
    }
  },
  async mounted () {
    const equipData = (await EquipmentService.indexEquip()).data
    for (let i = 0; i < equipData.index.length; i++) {
      this.equipo.push(equipData.index[i].nombre)
    }
    const PruebaEstudiantes = (await StudentService.indexStudent()).data
    for (let i = 0; i < PruebaEstudiantes.index.length; i++) {
      let { nombre, carnet } = PruebaEstudiantes.index[i]
      this.students.push({ nombre, carnet })
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
