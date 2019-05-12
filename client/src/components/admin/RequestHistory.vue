<template>
  <div>
    <panel title="Historial de Préstamos">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          item-key="_id">

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
            <tr @click="details(props, props.item._id)">
              <td>{{ props.item.estudiante.nombre }}</td>
              <td>{{ props.item.estudiante.carnet }}</td>
              <td>{{ props.item.modulo.salon }}</td>
              <td>{{ props.item.modulo.numero }}</td>
              <td>{{ props.item.monitorEntrega.nombre }}</td>
              <td>{{ props.item.fechaPrestamo }}</td>
              <td>{{ props.item.monitorRecibe.nombre }}</td>
              <td>{{ props.item.fechaEntrega }}</td>
            </tr>
          </template>

          <template slot="expand" slot-scope="props">
            <v-data-table
              hide-actions
              :headers="detailHeaders"
              :items="detailItems">

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
                  <td>{{ props.item.codBarras }}</td>
                  <td>{{ props.item.cantidad }}</td>
                </tr>
              </template>

            </v-data-table>
          </template>

          <v-alert slot="no-results" :value="true" color="error">
            La busqueda "{{ search }}" no entregó resultados.
          </v-alert>

          <template slot="pageText" slot-scope="props">
            Mostrando {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>

        </v-data-table>
      </v-card>
    </panel>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout">
      {{ snackbarText }}
      <v-btn flat color="pink" @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Panel from '@/components/reusable/Panel'
import CopyService from '@/services/CopyService'
export default {
  data () {
    return {
      timeout: 3000,
      snackbar: false,
      snackbarText: 'Entrega realizada',
      search: '',
      headers: [
        { text: 'Estudiante', value: 'estudiante.nombre' },
        { text: 'Carnet', value: 'estudiante.carnet' },
        { text: 'Salon', value: 'modulo.salon' },
        { text: 'Modulo', value: 'modulo.numero' },
        { text: 'Monitor Entrega', value: 'monitorEntrega.nombre' },
        { text: 'Fecha Préstamo', value: 'fechaPrestamo' },
        { text: 'Monitor Recibe', value: 'monitorRecibe.nombre' },
        { text: 'Fecha Recibe', value: 'fechaRecibe' }
      ],
      detailHeaders: [
        { text: 'Equipo', value: 'equipo' },
        { text: 'Código de barras', value: 'codBarras' },
        { text: 'Cantidad', value: 'cantidad' }
      ],
      items: [],
      detailItems: []
    }
  },
  components: {
    Panel
  },
  async mounted () {
    const data = (await CopyService.index()).data
    for (let i = 0; i < data.index.length; i++) {
      this.items.push(data.index[i])
    }
  },
  methods: {
    details (props, id) {
      if (!props.expanded) {
        this.detailItems = []
        const detail = this.find(id)
        for (let i = 0; i < detail.length; i++) {
          this.detailItems.push(detail[i])
        }
      }
      props.expanded = !props.expanded
    },
    find (id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i]._id === id) {
          return this.items[i].equipo
        }
      } return []
    },
    equipIdFinder (item) {
      for (let i = 0; i < this.items.length; i++) {
        var equipos = this.items[i].equipo
        for (let j = 0; j < equipos.length; j++) {
          if (equipos[j]._id === item._id) {
            return this.items[i]._id
          }
        }
      }
      return null
    },
    popUpSnackbar (text) {
      this.snackbarText = text
      this.snackbar = true
    }
  }
}

</script>

<style scoped>

</style>
