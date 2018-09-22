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
      </v-card-title>

        <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        item-key="carnet">

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
            <td>{{ props.item.prestamos }}</td>
            <td>{{ props.item.nombre }}</td>
            <td>{{ props.item.carnet }}</td>
            <td>{{ props.item.planAcademico }}</td>
            <td>{{ props.item.bloque }}</td>
            <td>{{ props.item.salon }}</td>
            <td>{{ props.item.modulo }}</td>
            <td>{{ props.item.monitor }}</td>
          </tr>
        </template>

        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-text>Peek-a-boo!</v-card-text>
          </v-card>
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
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Préstamos', value: 'prestamos', align: 'left' },
        { text: 'Estudiante', value: 'nombre' },
        { text: 'Carnet', value: 'carnet' },
        { text: 'Plan Academico', value: 'planAcademico' },
        { text: 'Bloque', value: 'bloque' },
        { text: 'Salon', value: 'salon' },
        { text: 'Modulo', value: 'modulo' },
        { text: 'Monitor', value: 'monitor' }
      ],
      items: [
        {
          value: false,
          prestamos: 13,
          nombre: 'Juan',
          carnet: 201510003010,
          planAcademico: 'Ingeniería de sistemas',
          bloque: 10,
          salon: 101,
          modulo: 1,
          monitor: 'Luis Felipe'
        },
        {
          value: false,
          prestamos: 13,
          nombre: 'Juan',
          carnet: 201510003011,
          planAcademico: 'Ingeniería de sistemas',
          bloque: 10,
          salon: 101,
          modulo: 1,
          monitor: 'Luis Felipe'
        },
        {
          value: false,
          prestamos: 13,
          nombre: 'Juan',
          carnet: 201510003012,
          planAcademico: 'Ingeniería de sistemas',
          bloque: 10,
          salon: 101,
          modulo: 1,
          monitor: 'Luis Felipe'
        },
        {
          value: false,
          prestamos: 13,
          nombre: 'Juan',
          carnet: 201510003014,
          planAcademico: 'Ingeniería de sistemas',
          bloque: 10,
          salon: 101,
          modulo: 1,
          monitor: 'Luis Felipe'
        },
        {
          value: false,
          prestamos: 13,
          nombre: 'Juan',
          carnet: 201510003015,
          planAcademico: 'Ingeniería de sistemas',
          bloque: 10,
          salon: 101,
          modulo: 1,
          monitor: 'Luis Felipe'
        },
        {
          value: false,
          prestamos: 13,
          nombre: 'Juan',
          carnet: 201510003013,
          planAcademico: 'Ingeniería de sistemas',
          bloque: 10,
          salon: 101,
          modulo: 1,
          monitor: 'Luis Felipe'
        }
      ]
    }
  },
  components: {
    Panel
  }
}

</script>

<style scoped>

</style>
