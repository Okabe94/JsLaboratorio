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
          Inventario
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat
        @click="navigateTo({name: 'schedule'})">
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
        <v-list light>
          <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            @click="menu(item)"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
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
      if (item.title === 'Cerrar Sesión') {
        this.logOut(item.value)
      } else {
        this.navigateTo(item.value)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
