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
          @click="navigateTo({ name: 'lend' })"
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
              <td>{{ props.item.monitor.nombre }}</td>
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
            Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>

        </v-data-table>
      </v-card>
    </panel>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import HomeService from '@/services/HomeService'

export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Estudiante', value: 'estudiante' },
        { text: 'Carnet', value: 'carnet' },
        { text: 'Salon', value: 'salon' },
        { text: 'Modulo', value: 'modulo' },
        { text: 'Monitor', value: 'monitor' }
      ],
      detailHeaders: [
        { text: 'Equipo', value: 'equipo' },
        { text: 'Código de barras', value: 'codBarras' },
        { text: 'Cantidad', value: 'cantidad' }
      ],
      items: []
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
    }
  }
}

</script>

<style scoped>

</style>
