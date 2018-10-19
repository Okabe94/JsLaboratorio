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
          item-key="Carnet">

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
          <tr @click="details (props, props.item.Carnet)">
            <td>{{ props.item.items }}</td>
            <td>{{ props.item.estudiante }}</td>
            <td>{{ props.item.carnet }}</td>
            <td>{{ props.item.salon }}</td>
            <td>{{ props.item.modulo }}</td>
            <td>{{ props.item.monitor }}</td>
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
                <td>{{ props.item.Equipo }}</td>
                <td>{{ props.item.Cantidad }}</td>
              </tr>
            </template>

          </v-data-table>
        </template>

        <v-alert slot="no-results" :value="true" color="error">
          La busqueda de "{{ search }}" no entregó resultados.
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
import HomeTableService from '@/services/HomeTableService'

export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Préstamos', value: 'items', align: 'left' },
        { text: 'Estudiante', value: 'estudiante' },
        { text: 'Carnet', value: 'carnet' },
        { text: 'Salon', value: 'salon' },
        { text: 'Modulo', value: 'modulo' },
        { text: 'Monitor', value: 'monitor' }
      ],
      detailHeaders: [
        { text: 'Equipo', value: 'equipo' },
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
    const data = (await HomeTableService.indexHome()).data
    console.log(data)
    for (let i = 0; i < data.index.length; i++) {
      this.items.push(data.index[i])
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async details (props, carnet) {
      if (!props.expanded) {
        const detail = (await HomeTableService.indexDetails({ Carnet: carnet })).data
        this.detailItems = []
        for (let i = 0; i < detail.homeInfoDetail.length; i++) {
          this.detailItems.push(detail.homeInfoDetail[i])
        }
      }
      props.expanded = !props.expanded
    }
  }
}

</script>

<style scoped>

</style>
