<template>
  {{ hunt }}
</template>

<script>
// import api services
import HuntService from '../services/HuntService.js'

export default {
  components: {},
  props: ['id'],
  data () {
    return {
      hunt: null
    }
  },
  created () {
    // fetch hunt (by id) and set local data
    HuntService.getHunt(this.id).then((response) => {
      this.hunt = response.data
    })
  }
}
</script>
