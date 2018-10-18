<template>
  <div>
    <panel title="Estudiantes">
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
            <td>{{ props.item.nombre }}</td>
            <td>{{ props.item.carnet }}</td>
            <td>{{ props.item.planAcademico }}</td>
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
import StudentService from '@/services/StudentService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      items: [],
      search: '',
      headers: [
        { text: 'Nombre', value: 'Nombre' },
        { text: 'Carnet', value: 'Carnet' },
        { text: 'Plan Academico', value: 'PlanAcademico' }
      ]
    }
  },
  async mounted () {
    const data = (await StudentService.indexStudent()).data
    for (let i = 0; i < data.index.length; i++) {
      this.items.push(data.index[i])
    }
  },
  components: {
    Panel
  }
}

</script>

<style scoped>

</style>
