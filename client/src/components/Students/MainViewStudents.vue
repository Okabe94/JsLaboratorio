<template>
  <div>
    <div v-if="$store.state.isLoggedIn">
      <v-container fluid grid-list-xl>
        <v-layout row justify-space-around>
            <student class="ml-2 mr-2" />
        </v-layout>
      </v-container>
    </div>
    <div v-else>
      <no-auth />
    </div>
  </div>
</template>
<script>
import Student from '@/components/Students/student'
import noAuth from '@/components/reusable/Auth'

export default {
  components: {
    Student,
    noAuth
  }
}

</script>

<style scoped>

</style>
