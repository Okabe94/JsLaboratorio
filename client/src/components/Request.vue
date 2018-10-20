<template>
  <div>
    <panel title="Registrar Préstamo">
      <v-card>
        <v-card-title>
          <v-autocomplete
          v-model="select"
          :hint="`${select.nombre}, ${select.carnet}`"
          :items="students"
          item-text="carnet"
          item-value="nombre"
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
              <th><strong>Código de barras</strong></th>
              <th><strong>Equipo</strong></th>
              <th><strong>Cantidad</strong></th>
              <th><strong>Acción</strong></th>
            </tr>
          </template>

          <template slot="items" slot-scope="props">
            <tr>
                <td>
                <v-autocomplete
                type="number"
                placeholder="Código de barras"
                :items="equipo"
                v-model="props.item.codBarras">
                </v-autocomplete>
              </td>
              <td>
                <v-text-field
                type="text"
                placeholder="Equipo"
                :items="equipo"
                v-model="props.item.nombre">
                </v-text-field>
              </td>
              <td>
                <v-text-field
                type="number"
                min="0"
                placeholder="Cantidad"
                v-model="props.item.cantidad">
                </v-text-field>
              </td>
              <td>
                <v-tooltip bottom>
                  <i
                  slot="activator"
                  class="material-icons"
                  v-on:click="removeElement(props.item)"
                  style="cursor: pointer"
                  tooltip="Eliminar"
                  >delete
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
        { nombre: '', codBarras: 0, cantidad: 0 }
      ],
      students: [],
      select: { nombre: 'nombre', carnet: 'carnet' }
    }
  },
  methods: {
    addEquip () {
      this.rows.push({
        nombre: '',
        codBarras: 0,
        cantidad: 0
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
    for (let i = 0; i < equipData.index.length; i++) {
      console.log(equipData)
      this.equipo.push(equipData.index[i].codBarras)
    }
    const PruebaEstudiantes = (await StudentService.indexStudent()).data
    for (let i = 0; i < PruebaEstudiantes.index.length; i++) {
      let { nombre, carnet } = PruebaEstudiantes.index[i]
      this.students.push({ nombre, carnet })
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
