<template>
  <div
    v-if="huntUnit"
    class="p-8 overflow-y-auto "
  >
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-3 md:flex">
        <h1 class="font-bold text-4xl text-saffron-500 mr-4">
          Unit {{ huntUnit.display_name }}
        </h1>
        <div
          v-for="species in this.speciesList"
          :key="species"
          class="p-2"
        >
          <a href="#">
            <span
              :class="[ speciesColors[species] ]"
              class="flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full shadow-md"
            >
              {{ species }}
            </span>
          </a>
        </div>
      </div>
      <hu-stats
        :huntUnit="huntUnit"
        class="col-span-3"
      />
      <hu-main-card class="col-span-3 lg:col-span-1" />
      <hd-map
        :hunt_units_geojson="huntGeojson"
        class="h-96 lg:h-full col-span-3 lg:col-span-2"
      />
      <hu-small-card class="col-span-3" />
      <hu-hunts-table
        :huntUnit="huntUnit"
        class="col-span-3"
      />
    </div>
  </div>
</template>

<script>
// import vue components
import HuMainCard from '@/views/hunt-units/hu-main-card.vue'
import HuSmallCard from '@/views/hunt-units/hu-small-cards.vue'
import HuStats from '@/views/hunt-units/hu-stats.vue'
import HdMap from '@/views/hunt-details/hd-map.vue'
import HuHuntsTable from '@/views/hunt-units/hu-hunts-table.vue'

// import api services
import { getHuntUnit, getHuntUnitFeatures } from '@/services/hunt-services.js'

export default {
  name: 'HuntUnits',
  props: ['id'],
  components: {
    // vue components
    HuMainCard,
    HuSmallCard,
    HuStats,
    HdMap,
    HuHuntsTable
  },
  data () {
    return {
      huntUnit: null,
      huntGeojson: null,
      speciesList: null,
      speciesColors: {
        elk: 'bg-green-300 text-green-800',
        antelope: 'bg-yellow-300 text-yellow-800',
        'mule deer': 'bg-indigo-300 text-indigo-800',
        'nelson (desert) bighorn sheep': 'bg-blue-300 text-blue-800',
        'california bighorn sheep': 'bg-saffron-300 text-saffron-800',
        'rocky mountain bighorn sheep': 'bg-purple-300 text-purple-800',
        'mountain goat': 'bg-olive-300 text-olive-800'
      }
    }
  },
  async created () {
    await getHuntUnit(this.id).then((response) => {
      this.huntUnit = response.data
    })

    this.setSpeciesList()

    await getHuntUnitFeatures(this.id).then((response) => {
      this.huntGeojson = response.data
    })
  },
  methods: {
    setSpeciesList () {
      const similarHunts = this.huntUnit.hunts
      const uniqueSpecies = [...new Set(similarHunts.map(data => data.species))]
      this.speciesList = uniqueSpecies
      console.log(this.speciesList)
    }
  }
}
</script>
