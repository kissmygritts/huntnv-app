<template>
  <hd-header v-bind:hunt="hunt"/>
  <landowner-table v-bind:hunt="hunt"/>
</template>

<script>
// import vue components
import HdHeader from '@/views/hunt-details/hd-header.vue'
import LandownerTable from '@/components/landowner-table.vue'

// import api services
import { getHunt } from '@/services/hunt-services.js'

export default {
  components: {
    // vue components
    HdHeader,
    LandownerTable
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
