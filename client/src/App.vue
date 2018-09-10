<template>
  <div id="app">
    <v-app>
      <page-header/>
        <main>
          <v-container>
            <router-view></router-view>
          </v-container>
        </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.input-group--text-fiel input{
  border-bottom: 1px solid black;
}
</style>
