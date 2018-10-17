<template>
  <div>
    <panel title="Registrar Préstamo">
      <v-card>
        <v-card-title>
          <v-autocomplete
          v-model="select"
          :hint="`${select.Nombre}, ${select.Carnet}`"
          :items="students"
          item-text="Carnet"
          item-value="Nombre"
          label="Estudiante"
          return-object
          single-line
          persistent-hint>
          </v-autocomplete>
          <v-btn
            color="orange lighten-1"
            dark
            class="font-weight-bold"
            @click="addEquip">
            Adicionar
          </v-btn>
          <v-btn
            color="green darken-1"
            dark
            class="font-weight-bold"
            @click="register">
            Registrar
          </v-btn>
        </v-card-title>

        <v-data-table
        hide-actions
        :items="rows">

          <template slot="headers" slot-scope="props">
            <tr>
              <th><strong>Equipo</strong></th>
              <th><strong>Cantidad</strong></th>
              <th><strong>Acción</strong></th>
            </tr>
          </template>

          <template slot="items" slot-scope="props">
            <tr>
              <td><v-autocomplete type="text" placeholder="Equipo" :items="equipo" v-model="props.item.equipo"></v-autocomplete></td>
              <td><v-text-field type="number" min="0" placeholder="Cantidad" v-model="props.item.cantidad"></v-text-field></td>
              <td>
                <v-tooltip bottom>
                  <i
                  slot="activator"
                  class="material-icons"
                  v-on:click="removeElement(props.item)" style="cursor: pointer"
                  tooltip="Eliminar"
                  >close
                  </i>
                  <span>Eliminar</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </panel>
  </div>
</template>

<script>
import EquipmentService from '@/services/EquipmentService'
import StudentService from '@/services/StudentService'

import Panel from '@/components/Panel'

export default {
  data () {
    return {
      equipo: [],
      rows: [
        { equipo: '', cantidad: 0 }
      ],
      students: [],
      select: { Nombre: 'Nombre', Carnet: 'Carnet' }
    }
  },
  methods: {
    addEquip () {
      this.rows.push({
        equipo: '',
        cantidad: ''
      })
    },
    removeElement (item) {
      const index = this.rows.indexOf(item)
      confirm('¿Seguro que desea eliminar el equipo?') && this.rows.splice(index, 1)
    },
    register () {
      console.log('hola')
    }
  },
  async mounted () {
    const equipData = (await EquipmentService.indexEquip()).data
    for (let i = 0; i < equipData.equipInfo.length; i++) {
      this.equipo.push(equipData.equipInfo[i].Nombre)
    }
    const PruebaEstudiantes = (await StudentService.indexStudent()).data
    for (let i = 0; i < PruebaEstudiantes.studentInfo.length; i++) {
      let { Nombre, Carnet } = PruebaEstudiantes.studentInfo[i]
      this.students.push({ Nombre, Carnet })
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
