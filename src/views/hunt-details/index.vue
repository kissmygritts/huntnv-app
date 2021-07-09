<template>
  <div
    v-if="hunt"
    class="w-full p-8 overflow-y-auto"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 space-y-8">
      <hd-header
        v-bind:hunt="hunt"
        class="col-span-1 lg:col-span-3 shadow-md rounded-md"
      />
      <hd-map
        :geojson="geojson"
        :hunt_units="hunt_units"
        :hunt="hunt"
        class="h-96 lg:h-144 col-span-1 lg:col-span-3 shadow-md rounded-md"
      />
      <landowner-tabs
        :landownership="hunt.landownership"
        class="col-span-1 lg:col-span-1 lg:mr-8 shadow-md rounded-md"
      />
      <hd-similar-hunts-table
        :hunt="hunt"
        class="col-span-1 lg:col-span-2 shadow-md rounded-md"
      />
    </div>
  </div>
</template>

<script>
// import vue view components
import HdHeader from '@/views/hunt-details/hd-header.vue'
import HdMap from '@/views/hunt-details/hd-map.vue'

// import vue components
import LandownerTabs from '@/components/landownership/landowner-tabs.vue'
import HdSimilarHuntsTable from '@/views/hunt-details/hd-similar-hunts-table.vue'

// import api services
import { getHunt, getHuntFeature, getHuntUnitFeatures } from '@/services/hunt-services.js'

export default {
  components: {
    // vue components
    LandownerTabs,
    HdSimilarHuntsTable,
    HdMap,
    HdHeader
  },
  props: ['id'],
  data () {
    return {
      hunt: null,
      geojson: null,
      hunt_units: null,
      units: null
    }
  },
  async created () {
    // fetch hunt (by id)
    await getHunt(this.id).then((response) => {
      this.hunt = response.data
    })
    await this.setHuntUnits()
    // fetch hunt geometry (by id)
    await getHuntFeature(this.hunt.hunt_geometry_id).then((response) => {
      this.geojson = response.data
    })
    // fetch hunt units
    await getHuntUnitFeatures(this.units).then((response) => {
      this.hunt_units = response.data
    })
  },
  methods: {
    setHuntUnits () {
      const initialUnits = this.hunt.units
      this.units = initialUnits.toString()
      return this.units
    }
  }
}
</script>
