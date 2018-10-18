<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-around>
        <student v-if="$store.state.isLoggedIn" />
        <monitor v-if="$store.state.isAdmin" />
        <equip v-if="$store.state.isAdmin" />
      </v-layout>
    </v-container>
    <noAuth v-if="!$store.state.isLoggedIn"/>
  </div>
</template>

<script>
import Equip from '@/components/Register/Equip'
import Monitor from '@/components/Register/Monitor'
import Student from '@/components/Register/Student'
import noAuth from '@/components/Auth'

export default {
  components: {
    noAuth,
    Equip,
    Monitor,
    Student
  }
}
</script>

<style scoped>
</style>
