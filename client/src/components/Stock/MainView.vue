<template>
  <div>
    <div v-if="$store.state.isLoggedIn">
      <equipment>
      </equipment>
    </div>
    <div v-else>
      <no-auth />
    </div>
  </div>
</template>
<script>
import Equipment from '@/components/Stock/Equipment'
import noAuth from '@/components/Auth'

export default {
  components: {
    Equipment,
    noAuth
  }
}

</script>

<style scoped>

</style>
