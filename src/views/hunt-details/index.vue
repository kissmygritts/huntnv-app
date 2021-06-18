<template>
  <div class="h-full w-full overflow-y-auto">
    <hd-header v-bind:hunt="hunt"/>
    <hd-map v-bind:geojson="geojson" class="h-3/6"/>
    <landowner-table v-bind:hunt="hunt"/>
    <landowner-bar-graph v-bind:results="results" />
    <similar-hunts-table v-bind:hunt="hunt"/>
  </div>
</template>

<script>
// import vue view components
import HdHeader from '@/views/hunt-details/hd-header.vue'

// import vue components
import SimilarHuntsTable from '@/components/similar-hunts-table.vue'
import LandownerTable from '@/components/landowner-table.vue'
import LandownerBarGraph from '@/components/landowner-bar-graph.vue'
import HdMap from '@/views/hunt-details/hd-map.vue'

// import api services
import { getHunt, getHuntFeature } from '@/services/hunt-services.js'

export default {
  components: {
    // vue components
    LandownerTable,
    LandownerBarGraph,
    SimilarHuntsTable,
    HdMap,
    HdHeader
  },
  props: ['id'],
  data () {
    return {
      hunt: null,
      geojson: null,
      owners: [],
      results: {}
    }
  },
  async created () {
    // fetch hunt (by id) and set local data
    await getHunt(this.id).then((response) => {
      this.hunt = response.data
    })
    // fetch hunt geometry (by id) and set local data
    await getHuntFeature(this.id).then((response) => {
      this.geojson = response.data
    })
    // create onwers array from hunt landownership array
    await this.hunt.landownership.forEach(data => {
      const { surface_mgmt_agency: SurfaceMgmtAgency, coverage } = data
      this.owners.push({ agency: SurfaceMgmtAgency, coverage })
    })
    // reduce array into object key: surface_mgmt_agency value: coverage for bar chart
    this.results = this.owners.reduce((acc, post) => {
      const { agency, coverage } = post
      return { ...acc, [agency]: (coverage) }
    }, {})
  }
}
</script>
