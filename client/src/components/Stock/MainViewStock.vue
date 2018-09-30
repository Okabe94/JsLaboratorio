<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-around>
        <div v-if="$store.state.isLoggedIn">
          <equipment />
          <student />
          <equipment />
        </div>
        <div v-else>
          <no-auth />
        </div>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Equipment from '@/components/Stock/Equipment'
import Student from '@/components/Stock/Student'
import noAuth from '@/components/Auth'

export default {
  components: {
    Equipment,
    Student,
    noAuth
  }
}

</script>

<style scoped>

</style>
