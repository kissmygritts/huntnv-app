<template>
  <div class='bg-gray-100'>STUFF</div>
  {{ hunts }}
</template>

<script>
// import api services
import HuntService from '../services/HuntService.js'

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      hunts: null
    }
  },
  created () {
    HuntService.getHunts().then((response) => {
      this.hunts = response.data
    })
  }
}
</script>
