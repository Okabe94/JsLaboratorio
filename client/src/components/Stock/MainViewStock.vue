<template>
  <div>
    <div v-if="$store.state.isLoggedIn">
      <v-container fluid grid-list-xl>
        <v-layout row justify-space-around>
            <equipment class="ml-2 mr-2" />
        </v-layout>
      </v-container>
    </div>
    <div v-else>
      <no-auth />
    </div>
  </div>
</template>
<script>
import Equipment from '@/components/stock/Equipment'
import noAuth from '@/components/reusable/Auth'

export default {
  components: {
    Equipment,
    noAuth
  }
}

</script>

<style scoped>

</style>
