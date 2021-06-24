<template>
  <div class="">
    <h1>Hunts</h1>
    {{ hunts }}
  </div>
</template>

<script>
import { getHunts } from '@/services/hunt-services.js'

export default {
  name: 'Hunts',
  data () {
    return {
      loading: false,
      hunts: null
    }
  },
  async created () {
    this.loading = true
    const { data } = await getHunts()
    this.hunts = data
    this.loading = false
  }
}
</script>
