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
                <v-tooltip bottom>
                  <i
                    slot="activator"
                    class="material-icons"
                    v-on:click="addEquip(props.item)"
                    style="cursor: pointer">
                    add_box
                  </i>
                  <span>Añadir</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <i
                    slot="activator"
                    class="material-icons"
                    style="cursor: pointer">
                    notes
                  </i>
                  <span>Comentario: {{ props.item.observacion }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <i
                    slot="activator"
                    class="material-icons"
                    v-on:click="returnRequest(props.item, props.index)"
                    style="cursor: pointer">
                    assignment_returned
                  </i>
                  <span>Entregar Préstamo</span>
                </v-tooltip>
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
                  <td v-if="$store.state.isLoggedIn">
                    <v-tooltip bottom>
                      <i
                        slot="activator"
                        class="material-icons"
                        v-on:click="returnItem(props.item, props.index)"
                        style="cursor: pointer">
                        assignment_returned
                      </i>
                      <span>Entregar</span>
                    </v-tooltip>
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
      {{ snackbarText }}
      <v-btn flat color="pink" @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Panel from '@/components/reusable/Panel'
import HomeService from '@/services/HomeService'
import RequestService from '@/services/RequestService'

export default {
  data () {
    return {
      globalId: '',
      timeout: 3000,
      snackbar: false,
      snackbarText: 'Entrega realizada',
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
      detailItems: [],
      monitorNombre: this.$store.state.nombre,
      monitorCarnet: this.$store.state.carnet
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
          this.globalId = id
          return this.items[i].equipo
        }
      } return []
    },
    addEquip (item) {
      this.navigateTo({ name: 'addItem', params: { reference: item.reference, nombre: item.nombre } })
    },
    async returnRequest (item, index) {
      if (confirm('Confirmar entrega de préstamo')) {
        const returnCredentials = {
          id: item._id,
          nombre: this.monitorNombre,
          carnet: this.monitorCarnet,
          reference: item.reference
        }
        try {
          await RequestService.deleteRequest(returnCredentials)
          this.popUpSnackbar('Entrega realizada')
          this.items.splice(index, 1)
        } catch (err) {
          this.popUpSnackbar('Ha sucedido un error. Intente de nuevo')
        }
      } else {
        this.popUpSnackbar('Proceso cancelado')
      }
    },
    async returnItem (item, index) {
      if (confirm('Confirmar entrega de equipo')) {
        this.snackbar = true
        const requestId = this.globalId
        const cred = { requestId: requestId, equipId: item._id }
        try {
          this.returnItemMaster(item)
          this.detailItems.splice(index, 1)
          await RequestService.deleteItem(cred)
          this.popUpSnackbar('Entrega realizada')
        } catch (err) {
          this.popUpSnackbar('Ha sucedido un error. Intente de nuevo')
        }
      } else {
        this.popUpSnackbar('Proceso cancelado')
      }
    },
    returnItemMaster (item) {
      for (let i = 0; i < this.items.length; i++) {
        let equipo = this.items[i].equipo
        for (let j = 0; j < equipo.length; j++) {
          if (item._id === equipo[j]._id) {
            equipo.splice(j, 1)
            break
          }
        }
      }
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
