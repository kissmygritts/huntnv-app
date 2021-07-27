<template>
  <div
    v-if="hunt_units_geojson"
    class="w-full p-8 overflow-y-auto"
  >
    <div class="grid grid-cols-3 gap-4">
      <hd-header
        :hunt="hunt"
        class="col-span-3 shadow-md rounded-md"
      />
      <hd-map
        :geojson="geojson"
        :hunt_units_geojson="hunt_units_geojson"
        class="h-96 lg:h-144 col-span-3 lg:col-span-2 shadow-md rounded-md"
      />
      <landowner-tabs
        :landownership="hunt.landownership"
        class="col-span-3 lg:col-span-1 shadow-md rounded-md"
      />
      <hd-similar-hunts-table
        :hunt="hunt"
        class="col-span-3 shadow-md rounded-md"
      />
    </div>
  </div>
</template>

<script>
// import vue view components
import HdHeader from '@/views/hunt-details/hd-header.vue'
import HdMap from '@/views/hunt-details/hd-map.vue'

// // import vue components
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
      units: null,
      hunt_units_geojson: null
    }
  },
  async created () {
    // fetch hunt (by id)
    await getHunt(this.id).then((response) => {
      this.hunt = response.data
    })
    await this.setHuntUnits()
    // fetch hunt geometry geojson (by hunt_geometry_id)
    await getHuntFeature(this.hunt.hunt_geometry_id).then((response) => {
      this.geojson = response.data
    })
    // fetch hunt units
    await getHuntUnitFeatures(this.units).then((response) => {
      this.hunt_units_geojson = response.data
    })
  },
  methods: {
    setHuntUnits () {
      const initialUnits = this.hunt.hunt_units_arr
      this.units = initialUnits.toString()
      return this.units
    }
  }
}
</script>
