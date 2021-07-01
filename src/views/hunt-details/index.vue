<template>
  <div
    v-if="hunt"
    class="h-full w-full overflow-y-auto p-8"
  >
    <hd-header
      v-bind:hunt="hunt"
      class="shadow-md rounded-md"
    />
    <hd-map
      :geojson="geojson"
      :hunt_units="hunt_units"
      :hunt="hunt"
      class="h-4/6 shadow-md rounded-md mt-8"
    />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <landowner-tabs
        :landownership="hunt.landownership"
        class="col-span-1 shadow-md rounded-md"
      />
      <similar-hunts-table
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
import SimilarHuntsTable from '@/components/similar-hunts-table.vue'

// import api services
import { getHunt, getHuntFeature, getHuntUnitFeatures } from '@/services/hunt-services.js'

export default {
  components: {
    // vue components
    LandownerTabs,
    SimilarHuntsTable,
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
