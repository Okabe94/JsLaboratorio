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
              <td>{{ props.item.disponible }}</td>
            </tr>
          </template>

          <v-alert slot="no-results" :value="true" color="error">
            La busqueda de "{{ search }}" no entregó resultados.
          </v-alert>

        </v-data-table>
      </v-card>
    </panel>
  </div>
</template>
<script>
import EquipmentService from '@/services/EquipmentService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      items: [],
      search: '',
      headers: [
        { text: 'Código de Barras', value: 'codBarras' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Disponible', value: 'disponible' }
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
  components: {
    Panel
  }
}
</script>
<style scoped>
</style>
