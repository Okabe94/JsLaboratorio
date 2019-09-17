<template>
  <div>
    <v-dialog max-width="290" v-model="dialog" persistent>
      <v-card>
        <v-card-title class="headline">Editar Equipo</v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre"
            v-model="editNombre"
            type="text">
          </v-text-field>
          <v-text-field
            label="Código de barras"
            v-model="editCodBarras"
            min="0"
            type="number">
          </v-text-field>
          <v-text-field
            label="Descripción"
            v-model="editDescripcion"
            type="text">
          </v-text-field>
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
            v-on:click="updateEquip()">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <panel title="Equipos">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="Buscar"
          append-icon="search"
          single-line
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
              <td>{{ props.item.codBarras }}</td>
              <td>{{ props.item.nombre }}</td>
              <td>{{ props.item.descripcion }}</td>
              <td>{{ props.item.disponible }}</td>
                <td v-if="$store.state.isAdmin">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)">
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
import EquipmentService from '@/services/EquipmentService'
import Panel from '@/components/reusable/Panel'

export default {
  data () {
    return {
      items: [],
      index: 0,
      search: '',
      editNombre: '',
      originalCod: '',
      editCodBarras: '',
      editDescripcion: '',
      dialog: false,
      headers: [
        { text: 'Código de Barras', value: 'codBarras' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Disponible', value: 'disponible' },
        { text: 'Acción', value: 'accion' }
      ]
    }
  },
  async mounted () {
    const data = (await EquipmentService.indexEquip()).data
    for (let i = 0; i < data.index.length; i++) {
      const current = data.index[i]
      if (current.disponible) {
        current.disponible = 'Si'
      } else {
        current.disponible = 'No'
      }
      this.items.push(current)
    }
  },
  methods: {
    async updateEquip () {
      const petition = {
        nombre: this.editNombre,
        codBarras: this.editCodBarras,
        originalCod: this.originalCod,
        descripcion: this.editDescripcion
      }
      await EquipmentService.updateEquip(petition)
      this.clearDialog()
    },
    editItem (item) {
      this.index = this.items.indexOf(item)
      this.editNombre = item.nombre
      this.originalCod = item.codBarras
      this.editCodBarras = item.codBarras
      this.editDescripcion = item.descripcion
      this.dialog = true
    },
    clearDialog () {
      const selected = this.items[this.index]
      selected.nombre = this.editNombre
      selected.codBarras = this.editCodBarras
      selected.descripcion = this.editDescripcion
      this.editNombre = ''
      this.editCodBarras = ''
      this.editDescripcion = ''
      this.dialog = false
    }
  },

  components: {
    Panel
  }
}
</script>
<style scoped>
</style>
