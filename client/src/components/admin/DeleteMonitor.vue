<template>
  <div>
    <panel title="Eliminar Monitor" v-if="$store.state.isAdmin">
      <v-card>
        <v-card-text>
          <v-autocomplete
            :items="carnets"
            v-model="selection"
            label="Carnet">
          </v-autocomplete>
          <v-text-field
            v-model="nombre"
            label="Nombre"
            readonly>
          </v-text-field>
          <v-text-field
            v-model="carnet"
            label="Carnet"
            readonly>
          </v-text-field>
          <v-text-field
            v-model="cargo"
            label="Cargo"
            readonly>
          </v-text-field>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="green darken-1"
            flat
            @click="confirm">
            Confirmar
          </v-btn>
          <v-btn
            flat
            @click="clean">
            Cancelar
          </v-btn>
        </v-card-actions>

      </v-card>
    </panel>
    <no-auth v-else></no-auth>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000">
      {{ snackbarText }}
      <v-btn flat color="pink" @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import MonitorService from '@/services/MonitorService'
import Panel from '@/components/reusable/Panel'
import noAuth from '@/components/reusable/Auth'
export default {
  data () {
    return {
      snackbar: false,
      snackbarText: '',
      selection: '',
      monitorToDelete: '',
      nombre: '',
      carnet: '',
      cargo: '',
      carnets: [],
      monitors: []
    }
  },
  methods: {
    getMonitor () {
      for (let i = 0; i < this.monitors.length; i++) {
        if (this.monitors[i].carnet === this.selection) {
          return this.monitors[i]
        }
      }
      return false
    },
    fillData () {
      const monitor = this.getMonitor()
      if (monitor) {
        this.monitorToDelete = monitor
        this.nombre = monitor.nombre
        this.carnet = monitor.carnet
        this.cargo = monitor.cargo
      } else {
        this.clean()
      }
    },
    async confirm () {
      const monitor = this.monitorToDelete
      if (monitor) {
        if (monitor.carnet !== this.$store.state.carnet) {
          try {
            await MonitorService.deleteMonitor(monitor)
            this.popUpSnackBar('Se ha eliminado el monitor con exito')
          } catch (err) {
            this.popUpSnackBar('Ha ocurrido un error. Intente de nuevo')
          }
        } else {
          this.popUpSnackBar('No se puede eliminar un monitor en uso')
          this.clean()
        }
      } else {
        this.popUpSnackBar('Seleccione un monitor para eliminar')
      }
    },
    clean () {
      this.nombre = ''
      this.carnet = ''
      this.cargo = ''
      this.selection = ''
      this.monitorToDelete = ''
    },
    popUpSnackBar (text) {
      this.snackbar = true
      this.snackbarText = text
    }
  },
  watch: {
    selection: function () {
      this.fillData()
    }
  },
  async mounted () {
    const data = (await MonitorService.indexMonitor()).data
    this.monitors = data.index
    for (let i = 0; i < data.index.length; i++) {
      this.carnets.push(data.index[i].carnet)
    }
  },
  components: {
    Panel,
    noAuth
  }
}

</script>

<style scoped>

</style>
