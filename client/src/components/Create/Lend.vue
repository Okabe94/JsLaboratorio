<template>
  <div>
    <panel title="Nuevo Préstamo">
      <v-form ref="Resumen">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-autocomplete
            required
            label="Estudiante"
            v-model='resumen.Estudiante'
          ></v-autocomplete>
          <v-text-field
            readonly
            label="Monitor"
            v-model='resumen.Monitor'
          ></v-text-field>
          <v-autocomplete
            required
            label="Equipo"
            v-model='resumen.Equipo'
          ></v-autocomplete>
          <v-text-field
            required
            label="Cantidad"
            type="number"
            min="0"
            v-model='resumen.Cantidad'
          ></v-text-field>
        </div>.
      </v-form>
    </panel>
  </div>
</template>
<script>
import Panel from '@/components/Panel'
import store from '@/store/store'

export default {
  data () {
    return {
      resumen: {
        Estudiante: '',
        Monitor: store.state.nombre,
        Equipo: [],
        Cantidad: 0
      }

    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
