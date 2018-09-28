<template>
  <div>
    <panel title="Equipos">
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
      </v-card-title>

        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          item-key="CodBarras"
          >

        <template slot="headers" slot-scope="props">
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.text"
              >
              <strong> {{ header.text }} </strong>
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.CodBarras }}</td>
            <td>{{ props.item.Nombre }}</td>
          </tr>
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
import MainTableService from '@/services/MainTableService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      data: [],
      items: [],
      search: '',
      headers: [
        { text: 'Código de Barras', value: 'CodBarras' },
        { text: 'Nombre', value: 'Nombre' }
      ]
    }
  },
  async mounted () {
    const data = (await MainTableService.mainTable()).data
    for (let i = 0; i < data.mainTableInfo.length; i++) {
      this.items.push(data.mainTableInfo[i])
    }
  },
  components: {
    Panel
  }
}

</script>

<style scoped>

</style>
