<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-around>
        <panel title="Adicionar Equipos">
          <v-form ref="adition">
            <v-card>
              <v-card-title>
                <v-btn
                  color="orange lighten-1"
                  dark
                  class="font-weight-bold"
                  @click="addEquip">
                  Adicionar Equipo
                </v-btn>
                <v-btn
                  color="green darken-1"
                  dark
                  class="font-weight-bold"
                  @click="updateEquip">
                  Confirmar
                </v-btn>
              </v-card-title>

              <v-data-table
                hide-actions
                :items="rows">

                <template slot="headers" slot-scope="props">
                  <tr>
                    <th><strong>Equipo</strong></th>
                    <th><strong>Código de barras</strong></th>
                    <th><strong>Cantidad</strong></th>
                    <th><strong>Acción</strong></th>
                  </tr>
                </template>

                <template slot="items" slot-scope="props">
                  <tr>
                    <td>
                      <v-autocomplete
                        type="text"
                        placeholder="Equipo"
                        :items="equipo"
                        v-model="props.item.nombre">
                      </v-autocomplete>
                    </td>
                    <td>
                      <v-text-field
                        type="number"
                        placeholder="Código de barras"
                        v-model="props.item.codBarras">
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
                          tooltip="Eliminar">
                          delete
                        </i>
                        <span>Eliminar</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </template>

              </v-data-table>
            </v-card>
          </v-form>
        </panel>
        <panel title="Añadir Módulo">
          <v-form ref="modulo">
            <div class="pt-4 pb-4 pl-4 pr-4">
              <v-text-field
                v-model="mod.salon"
                placeholder="Salon"
                type="number"
                min="0">
              </v-text-field>
              <v-text-field
                v-model="mod.numero"
                placeholder="Modulo"
                type="number"
                min="0">
              </v-text-field>
              <v-btn
                @click="updateModule"
                color="green darken-1"
                dark
                class="font-weight-bold">
                Confirmar
              </v-btn>
            </div>
          </v-form>
        </panel>
      </v-layout>
    </v-container>
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
import RequestService from '@/services/RequestService'
import EquipmentService from '@/services/EquipmentService'

export default {
  data () {
    return {
      snackbar: false,
      timeout: 3000,
      snackbarText: '',
      rows: [],
      equipo: [],
      request: {
        id: '',
        equipo: []
      },
      mod: {
        id: '',
        salon: '',
        numero: ''
      }
    }
  },
  components: {
    Panel
  },
  methods: {
    addEquip () {
      this.rows.push({
        nombre: '',
        codBarras: '',
        cantidad: ''
      })
    },
    async updateModule () {
      this.mod.reference = this.$store.state.route.params.reference
      const goodToGo = this.checkMod()
      if (goodToGo) {
        try {
          await RequestService.updateModule(this.mod)
          this.popUpSnackbar('Actualización realizada')
          this.mod.salon = ''
          this.mod.numero = ''
        } catch (err) {
          this.popUpSnackbar('Ha ocurrido un error. Intente de nuevo')
        }
      } else {
        this.popUpSnackbar('Por favor llenar todos los campos del modulo')
      }
    },
    async updateEquip () {
      this.request.equipo = []
      this.request.reference = this.$store.state.route.params.reference
      if (this.rows.length >= 1) {
        for (let i = 0; i < this.rows.length; i++) {
          if (this.checkEquip(this.rows[i])) {
            this.request.equipo.push(this.rows[i])
          } else {
            this.popUpSnackbar('Por favor llene todos los campos de los equipos')
            return
          }
        }
        try {
          await RequestService.updateRequest(this.request)
          this.popUpSnackbar('Actualización realizada')
          this.request.equipo = []
          this.rows = []
        } catch (err) {
          this.popUpSnackbar('Ha ocurrido un error. Intente de nuevo')
        }
      } else {
        this.popUpSnackbar('Ingrese al menos un equipo')
      }
    },
    removeElement (item) {
      const index = this.rows.indexOf(item)
      confirm('¿Seguro que desea eliminar el equipo?') && this.rows.splice(index, 1)
    },
    checkEquip (row) {
      if (row.nombre === '' || (typeof row.nombre === 'undefined')) {
        return false
      }
      if (row.codBarras === '' || (typeof row.codBarras === 'undefined')) {
        return false
      }
      if (row.cantidad === '' || (typeof row.cantidad === 'undefined')) {
        return false
      }
      return true
    },
    checkMod () {
      if (this.mod.numero === '') {
        return false
      }
      if (this.mod.salon === '') {
        return false
      }
      return true
    },
    popUpSnackbar (text) {
      this.snackbar = true
      this.snackbarText = text
    }
  },
  async mounted () {
    const equipData = (await EquipmentService.indexEquip()).data
    for (let i = 0; i < equipData.index.length; i++) {
      this.equipo.push(equipData.index[i].nombre)
    }
  }
}
</script>

<style scoped>

</style>
