<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-around>
        <student v-if="$store.state.isLoggedIn">
        </student>
        <user v-if="$store.state.isAdmin">
        </user>
        <equip v-if="$store.state.isAdmin">
        </equip>
      </v-layout>
    </v-container>
    <noAuth v-if="!$store.state.isLoggedIn"/>
  </div>
</template>

<script>
import Equip from '@/components/Register/Equip'
import User from '@/components/Register/User'
import Student from '@/components/Register/Student'
import noAuth from '@/components/Auth'

export default {
  components: {
    noAuth,
    Equip,
    User,
    Student
  }
}
</script>

<style scoped>
</style>

  <!-- <div>
    <div v-if="$store.state.isAdmin">
      <v-container fluid grid-list-xl>
        <v-layout row justify-space-around>
          <user>
          </user>
          <equip>
          </equip>
        </v-layout>
      </v-container>
    </div>

    <div v-else>
      <noAuth/>
    </div>
  </div> -->
