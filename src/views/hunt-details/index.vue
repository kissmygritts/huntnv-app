<template>
  <hd-sidebar v-bind:hunt="hunt"/>
</template>

<script>
// import vue components
import HdSidebar from './hd-sidebar.vue'

// import api services
import { getHunt } from '@/services/hunt-services.js'

export default {
  components: {
    // vue components
    HdSidebar
  },
  props: ['id'],
  data () {
    return {
      hunt: null
    }
  },
  created () {
    // fetch hunt (by id) and set local data
    getHunt(this.id).then((response) => {
      this.hunt = response.data
    })
  }
}
</script>
