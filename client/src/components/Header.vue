<template>
  <div>
    <v-toolbar
      fixed
      color="orange lighten-1"
      dark
      ><v-toolbar-title>Laboratorio IUE</v-toolbar-title>
      <v-divider
        class="mx-3"
        inset
        vertical
      ></v-divider>
      <span class="subheading">Préstamos</span>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          Préstamos
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat>
          Entregas
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat>
          Horarios
        </v-btn>
        <v-divider vertical></v-divider>
      </v-toolbar-items>
      <v-toolbar-side-icon></v-toolbar-side-icon>
    </v-toolbar>
  </div>
</template>

<script>
export default{
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
