<template>
  <div class="h-full w-full overflow-y-auto">
    <hd-header v-bind:hunt="hunt" class="mb-5 mx-5" />
    <hd-map v-bind:geojson="geojson" v-bind:hunt_units="hunt_units" v-bind:hunt="hunt" class="h-3/6 shadow-lg rounded-lg mb-5 mx-5"/>
    <landowner-tabs v-bind:hunt="hunt" v-bind:results="results" class="mb-5 "/>
    <!-- <landowner-bar-graph v-bind:results="results" />
    <similar-hunts-table v-bind:hunt="hunt"/> -->
  </div>
</template>

<script>
// import vue view components
import HdHeader from '@/views/hunt-details/hd-header.vue'
import HdMap from '@/views/hunt-details/hd-map.vue'

// import vue components
// import SimilarHuntsTable from '@/components/similar-hunts-table.vue'
import LandownerTabs from '@/components/landownership/landowner-tabs.vue'
// import LandownerBarGraph from '@/components/landowner-bar-graph.vue'

// import api services
import { getHunt, getHuntFeature, getHuntUnitFeatures } from '@/services/hunt-services.js'

export default {
  components: {
    // vue components
    LandownerTabs,
    // LandownerBarGraph,
    // SimilarHuntsTable,
    HdMap,
    HdHeader
  },
  props: ['id'],
  data () {
    return {
      hunt: null,
      geojson: null,
      owners: [],
      results: {},
      hunt_units: null,
      units: null
    }
  },
  async created () {
    // fetch hunt (by id) and set local data
    await getHunt(this.id).then((response) => {
      this.hunt = response.data
    })
    await this.setHuntUnits()
    // fetch hunt geometry (by id) and set local data
    await getHuntFeature(this.id).then((response) => {
      this.geojson = response.data
    })
    // fetch hunt units
    await getHuntUnitFeatures(this.units).then((response) => {
      this.hunt_units = response.data
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
  },
  methods: {
    setHuntUnits () {
      const initialUnits = this.hunt.units
      this.units = initialUnits.toString()
      console.log(typeof this.units)
      console.log(this.units)
      return this.units
    }
  }
}
</script>
