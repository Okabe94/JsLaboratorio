<template>
  <div>
    <panel title="Préstamos Activos">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn
            v-if="$store.state.isLoggedIn"
            @click="navigateTo({ name: 'request' })"
            dark
            class="green darken-5 font-weight-bold">
            Nuevo Préstamo
          </v-btn>
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
              <td v-if="$store.state.isLoggedIn">
                <i
                  slot="activator"
                  class="material-icons"
                  v-on:click="returnRequest(props.item)"
                  style="cursor: pointer">
                  check
                </i>
              </td>
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
                  <td>
                    <i
                      slot="activator"
                      class="material-icons"
                      v-on:click="returnItem(props.item)"
                      style="cursor: pointer">
                      check
                    </i>
                  </td>
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
      Entrega realizada
      <v-btn flat color="pink" @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>

    <v-dialog
      v-model="dialogAdd"
      max-width="290"
      persistent
      return-value>
      <v-card>
        <v-card-title class="headline">¿Qué se Añadirá?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialogAddModule = true">
            Modulo
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialogAddEquip = true">
            Equipo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogAddModule"
      max-width="290"
      persistent>
      <v-card>
        <v-card-title class="headline">Llene los Campos</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialogAddModule = false">
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="updateModule(props.item._id)">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogAddEquip"
      max-width="290"
      persistent>
      <v-card>
        <v-card-title class="headline">Llene los Campos</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialogAddEquip = false">
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="updateEquip(props.item_id)">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import HomeService from '@/services/HomeService'

export default {
  data () {
    return {
      dialogAdd: false,
      dialogReturn: false,
      dialogReturnItem: false,
      dialogAddEquip: false,
      dialogAddModule: false,
      timeout: 3000,
      snackbar: false,
      search: '',
      headers: [
        { text: 'Estudiante', value: 'estudiante.nombre' },
        { text: 'Carnet', value: 'estudiante.carnet' },
        { text: 'Salon', value: 'modulo.salon' },
        { text: 'Modulo', value: 'modulo.numero' },
        { text: 'Monitor', value: 'monitorEntrega.nombre' },
        { text: 'Fecha', value: 'fechaPrestamo' },
        { text: 'Acción', value: 'accion' }
      ],
      detailHeaders: [
        { text: 'Equipo', value: 'equipo' },
        { text: 'Código de barras', value: 'codBarras' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Acción', value: 'accion' }
      ],
      items: [],
      detailItems: []
    }
  },
  components: {
    Panel
  },
  async mounted () {
    const data = (await HomeService.indexHome()).data
    for (let i = 0; i < data.index.length; i++) {
      this.items.push(data.index[i])
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
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
    returnRequest (item) {
      const index = this.items.indexOf(item)
      confirm('Confirmar entrega de préstamo') && this.items.splice(index, 1)
      this.snackbar = true
      // añadir a copy, modificar el monitor y fecha, eliminar de request
    },
    returnItem (item) {
      const index = this.detailItems.indexOf(item)
      confirm('Confirmar entrega de equipo') && this.detailItems.splice(index, 1)
      this.snackbar = true
    },
    updateModule (id) {
      console.log('updateModule')
    },
    updateEquip (id) {
      console.log('updateEquip')
    }
  }
}

</script>

<style scoped>

</style>
