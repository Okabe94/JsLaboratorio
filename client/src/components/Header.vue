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
      <span class="subheading">Préstamos</span>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat
        @click="navigateTo({name: 'lend'})">
          Préstamos
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat
        @click="navigateTo({name: 'returns'})">
          Entregas
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat
        @click="navigateTo({name: 'schedule'})">
          Horarios
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat
        @click="navigateTo({name: 'login'})">
          Ingresar
        </v-btn>
        <v-divider vertical></v-divider>
      </v-toolbar-items>
      <v-toolbar-side-icon></v-toolbar-side-icon>
    </v-toolbar>
  </div>
</template>

<script>
export default{
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
