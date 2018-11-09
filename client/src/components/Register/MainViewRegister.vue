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
import Equip from '@/components/register/Equip'
import Monitor from '@/components/register/Monitor'
import Student from '@/components/register/Student'
import noAuth from '@/components/reusable/Auth'

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
