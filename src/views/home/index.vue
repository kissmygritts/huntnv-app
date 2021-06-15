<template>
  <div class='bg-gray-100'>STUFF</div>
  {{ hunts }}
</template>

<script>
// import api services
import { getHunts } from '@/services/hunt-services.js'

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      hunts: null
    }
  },
  created () {
    getHunts().then((response) => {
      this.hunts = response.data
    })
  }
}
</script>
