<template>
  <div>
    <h1>Register</h1>

    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="Email"/>
      <br>
    <input
      type="password"
      name="password"
      vmodel="password"
      placeholder="Password"/>
      <br>
    <button
      @click="register">
      Register
    </button>

  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationServices.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<style scoped>

</style>
