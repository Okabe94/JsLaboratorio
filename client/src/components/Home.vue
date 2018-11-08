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
                    v-on:click="returnRequest(props.item)"
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
                  <td>
                    <v-tooltip bottom>
                      <i
                        slot="activator"
                        class="material-icons"
                        v-on:click="returnItem(props.item)"
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
          return this.items[i].equipo
        }
      } return []
    },
    addEquip (item) {
      this.navigateTo({ name: 'addItem', params: { id: item._id } })
    },
    async returnRequest (item) {
      const index = this.items.indexOf(item)
      if (confirm('Confirmar entrega de préstamo')) {
        const returnCredentials = {
          id: item._id,
          nombre: this.monitorNombre,
          carnet: this.monitorCarnet
        }
        try {
          await RequestService.deleteRequest(returnCredentials)
          this.snackbarText = 'Entrega realizada'
          this.snackbar = true
          this.items.splice(index, 1)
        } catch (err) {
          this.snackbarText = 'Ha sucedido un error. Intente de nuevo'
          this.snackbar = true
        }
      }
    },
    async returnItem (item) {
      const index = this.detailItems.indexOf(item)
      this.snackbar = true
      const requestId = this.equipIdFinder(item)
      if (confirm('Confirmar entrega de equipo')) {
        const cred = { requestId: requestId, equipId: item._id }
        try {
          await RequestService.deleteItem(cred)
          this.snackbarText = 'Entrega realizada'
          this.snackbar = true
          this.detailItems.splice(index, 1)
        } catch (err) {
          this.snackbarText = 'Ha sucedido un error. Intente de nuevo'
          this.snackbar = true
        }
      }
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
    }
  }
}

</script>

<style scoped>

</style>
