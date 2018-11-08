<template>
  <div>
    <v-layout align-center column fill-height >
      <v-flex>
          <v-toolbar flat dense dark class="green darken-1">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
          </v-toolbar>
          <div class="white elevation-4">

            <slot>
            </slot>

          </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>

</style>
