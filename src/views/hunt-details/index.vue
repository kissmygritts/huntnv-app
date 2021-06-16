<template>
  <hd-header v-bind:hunt="hunt"/>
  <landowner-table v-bind:hunt="hunt"/>
  <landowner-bar-graph v-bind:results="results" />
</template>

<script>
// import vue components
import HdHeader from '@/views/hunt-details/hd-header.vue'
import LandownerTable from '@/components/landowner-table.vue'
import LandownerBarGraph from '@/components/landowner-bar-graph.vue'

// import api services
import { getHunt } from '@/services/hunt-services.js'

export default {
  components: {
    // vue components
    HdHeader,
    LandownerTable,
    LandownerBarGraph
  },
  props: ['id'],
  data () {
    return {
      hunt: null,
      owners: [],
      results: {}
    }
  },
  async created () {
    // fetch hunt (by id) and set local data
    await getHunt(this.id).then((response) => {
      this.hunt = response.data
    })

    await this.hunt.landownership.forEach(data => {
      // linter wants api value to be in camel case, add colon to change name
      // eslint-disable-next-line
      const { surface_mgmt_agency, coverage } = data
      this.owners.push({ agency: surface_mgmt_agency, coverage })
    })

    this.results = this.owners.reduce((acc, post) => {
      const { agency, coverage } = post
      return { ...acc, [agency]: (coverage) }
    }, {})
  }
}
</script>
