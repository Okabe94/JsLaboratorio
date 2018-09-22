<template>
  <div>
    <v-layout align-center column fill-height >
      <v-flex>
          <v-toolbar flat dense dark class="green darken-1">
            <v-toolbar-title>No tienes autorización para ver la página</v-toolbar-title>
          </v-toolbar>
          <div class="white elevation-4">
            <v-btn @click="navigateTo({name: 'home'})">
              Regresar
            </v-btn>
          </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>

</style>
