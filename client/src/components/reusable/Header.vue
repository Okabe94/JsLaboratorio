<template>
  <div>
    <v-toolbar color="orange lighten-1" dark>
      <v-toolbar-items>
        <v-btn flat class="title"
        @click="navigateTo({name: 'home'})">
          Laboratorio IUE
        </v-btn>
      </v-toolbar-items>
      <v-divider class="mx-3" inset vertical></v-divider>
      <span class="subheading">{{ $store.state.nombre }}</span>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat
        v-if="$store.state.isLoggedIn"
        @click="navigateTo({name: 'home'})">
          Préstamos
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat
        v-if="$store.state.isLoggedIn"
        @click="navigateTo({name: 'stock'})">
          Listado
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat
        @click="snackbar = true">
          Horarios
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat
        v-if="$store.state.isLoggedIn"
        @click="navigateTo({name: 'register'})">
          Registrar
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat
        v-if="!$store.state.isLoggedIn"
        @click="navigateTo({name: 'login'})">
          Ingresar
        </v-btn>
        <v-divider vertical></v-divider>
      </v-toolbar-items>

      <v-menu
        offset-y
        origin="center center"
        transition="scale-transition">
        <v-toolbar-side-icon
          slot="activator">
        </v-toolbar-side-icon>
        <v-list light v-if="$store.state.isAdmin">
          <v-list-tile
            v-for="(item, index) in adminItems"
            :key="index"
            @click="menu(item)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list light v-else-if="$store.state.isLoggedIn">
          <v-list-tile
            v-for="(item, index) in monitorItems"
            :key="index"
            @click="menu(item)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000">
      Página en desarrollo
      <v-btn flat color="pink" @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      snackbar: false,
      adminItems: [
        { title: 'Historial de Préstamos', value: { name: 'history' } },
        { title: 'Cambiar de Usuario', value: { name: 'login' } },
        { title: 'Eliminar Monitor', value: { name: 'deleteMonitor' } },
        { title: 'Cerrar Sesión', value: { name: 'home' } }
      ],
      monitorItems: [
        { title: 'Cambiar de Usuario', value: { name: 'login' } },
        { title: 'Cerrar Sesión', value: { name: 'home' } }
      ]
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logOut (route) {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setIdentity', 'Visitante', null)
      this.$store.dispatch('setRango', null)
      this.$router.push(route)
    },
    menu (item) {
      switch (item.title) {
        case 'Cerrar Sesión':
          this.logOut(item.value)
          break
        default:
          this.navigateTo(item.value)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
