<template>
  <div>
    <v-dialog max-width="290" v-model="dialog">
      <v-card>
        <v-card-title class="headline">Editar Estudiante</v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre"
            v-model="editNombre"
            type="text">
          </v-text-field>
          <v-text-field
            label="Carnet"
            v-model="editCarnet"
            min="0"
            type="number">
          </v-text-field>
          <v-text-field
            label="Documento"
            v-model="editDocumento"
            min="0"
            type="number">
          </v-text-field>
          <v-autocomplete
            :items="documentos"
            auto-select-first
            label="Tipo Documento"
            v-model="editTipoDoc"
            type="text">
          </v-autocomplete>
          <v-autocomplete
            :items="carreras"
            label="Plan Académico"
            v-model="editPlanAcademico"
            auto-select-first
            type="text">
          </v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            v-on:click="clearDialog()">
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            v-on:click="updateStudent()">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <panel title="Estudiantes">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="Buscar"
          append-icon="search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-title>

        <v-data-table
          :headers="headers"
          :items="items"
          :search="search">

        <template slot="headers" slot-scope="props">
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.text">
              <strong> {{ header.text }} </strong>
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props">
          <tr>
            <td>{{ props.item.nombre }}</td>
            <td>{{ props.item.carnet }}</td>
            <td>{{ props.item.documento }}</td>
            <td>{{ props.item.planAcademico }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item, props.index)">
                edit
              </v-icon>
            </td>
          </tr>
        </template>

        <v-alert slot="no-results" :value="true" color="error">
          La busqueda de "{{ search }}" no entregó resultados.
        </v-alert>

        <template slot="pageText" slot-scope="props">
          Mostrando {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>

        </v-data-table>
      </v-card>
    </panel>
  </div>
</template>
<script>
import Panel from '@/components/reusable/Panel'
import StudentService from '@/services/StudentService'
import ReusableService from '@/services/ReusableService'
import Dialog from '@/components/reusable/EditStudentDialog'

export default {
  data () {
    return {
      index: 0,
      dialog: false,
      items: [],
      carreras: [],
      documentos: [],
      search: '',
      ogCarnet: '',
      studentId: '',
      editNombre: '',
      editCarnet: '',
      editTipoDoc: '',
      editDocumento: '',
      editPlanAcademico: '',
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Carnet', value: 'carnet' },
        { text: 'Documento', value: 'documento' },
        { text: 'Plan Academico', value: 'planAcademico' },
        { text: 'Acción', value: 'accion' }
      ]
    }
  },
  methods: {
    clearDialog () {
      this.studentId = ''
      this.editCarnet = ''
      this.editNombre = ''
      this.editTipoDoc = ''
      this.editDocumento = ''
      this.editPlanAcademico = ''
      this.dialog = false
    },
    async updateStudent () {
      const selected = this.items[this.index]
      selected.carnet = this.editCarnet
      selected.nombre = this.editNombre
      selected.documento = this.editDocumento
      selected.planAcademico = this.editPlanAcademico
      const update = {
        carnet: this.editCarnet,
        nombre: this.editNombre,
        tipoDoc: this.editTipoDoc,
        documento: this.editDocumento,
        originalCarnet: this.ogCarnet,
        planAcademico: this.editPlanAcademico
      }
      await StudentService.updateStudent(update)
      this.clearDialog()
    },
    editItem (item, index) {
      this.index = index
      this.ogCarnet = item.carnet
      this.editNombre = item.nombre
      this.editCarnet = item.carnet
      this.editTipoDoc = item.tipoDoc
      this.editDocumento = item.documento
      this.editPlanAcademico = item.planAcademico
      this.fillAutocomplete(item.tipoDoc, this.documentos)
      this.fillAutocomplete(item.planAcademico, this.carreras)
      this.dialog = true
    },
    fillAutocomplete (name, array) {
      if (array.indexOf(name) > 0) {
        array.splice(array.indexOf(name), 1)
        array.unshift(name)
      }
    }
  },
  async mounted () {
    const data = (await StudentService.indexStudent()).data
    for (let i = 0; i < data.index.length; i++) {
      this.items.push(data.index[i])
    }
    const reusable = (await ReusableService.indexReusable()).data
    const carrera = reusable[0].carreras
    const tipoDoc = reusable[0].tipo_documento
    for (let i = 0; i < carrera.length; i++) {
      this.carreras.push(carrera[i])
    }
    for (let i = 0; i < tipoDoc.length; i++) {
      this.documentos.push(tipoDoc[i])
    }
  },
  components: {
    Panel,
    Dialog
  }
}

</script>

<style scoped>

</style>
