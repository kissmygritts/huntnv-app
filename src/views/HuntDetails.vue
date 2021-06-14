<template>
  <HuntDetailsSideBar v-bind:hunt="hunt"/>
</template>

<script>
// import vue components
import HuntDetailsSideBar from '../components/hunt-details/SideBar.vue'

// import api services
import HuntService from '../services/HuntService.js'

export default {
  components: {
    // vue components
    HuntDetailsSideBar
  },
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
