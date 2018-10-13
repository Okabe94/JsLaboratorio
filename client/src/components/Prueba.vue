<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-around>
        <panel title="Estudiante">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-autocomplete
              v-model="select"
              :hint="`${select.Nombre}, ${select.Carnet}`"
              :items="items"
              item-text="Carnet"
              item-value="Nombre"
              label="Estudiante"
              return-object
              single-line
              persistent-hint
            ></v-autocomplete>
            <v-text-field
              label="Nombre"
            ></v-text-field>
            <v-text-field
              label="Nombre"
            ></v-text-field>
          </div>
        </panel>
        <panel title="Equipos">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="Nombre"
            ></v-text-field>
            <v-text-field
              label="Nombre"
            ></v-text-field>
            <v-text-field
              label="Nombre"
            ></v-text-field>
          </div>
        </panel>
      </v-layout>
    </v-container>
    <v-btn
      @click="add">
      Añadir
    </v-btn>
    <tr>
      <td><strong>Equipo</strong></td>
      <td><strong>Cantidad</strong></td>
      <td></td>
    </tr>
      <tr
        v-for="(row, index) in rows"
        :key="index">
        <td><v-text-field type="text" v-model="row.equipo" /></td>
        <td><v-text-field type="number" min="0" v-model="row.cantidad" /></td>
        <td>
          <v-btn
            v-on:click="removeElement(index)" style="cursor: pointer"
            >Eliminar
          </v-btn>
        </td>
      </tr>
  </div>
</template>

<script>
import PruebaService from '@/services/PruebaService'
import StudentService from '@/services/StudentService'

import Panel from '@/components/Panel'

export default {
  data () {
    return {
      equipo: [],
      rows: [],
      select: { Nombre: '', Carnet: '' },
      items: []
    }
  },
  methods: {
    add () {
      document.createElement('tr')
      this.rows.push({
        equipo: 'hey',
        cantidad: 0
      })
    },
    removeElement (index) {
      this.rows.splice(index, 1)
    }
  },
  async mounted () {
    const PruebaPrestamos = (await PruebaService.indexPrueba()).data
    for (let i = 0; i < PruebaPrestamos.prestamo.length; i++) {
      this.equipo.push(PruebaPrestamos.prestamo[i].Comentario)
    }
    const PruebaEstudiantes = (await StudentService.indexStudent()).data
    for (let i = 0; i < PruebaEstudiantes.studentInfo.length; i++) {
      let { Nombre, Carnet } = PruebaEstudiantes.studentInfo[i]
      this.items.push({ Nombre, Carnet })
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
