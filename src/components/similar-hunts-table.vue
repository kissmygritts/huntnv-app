<template>
<div class="bg-white p-6 rounded-lg shadow-lg">
  <h3 class="font-bold text-xl text-black uppercase">Similar Hunts</h3>
  <similar-hunts-tabs :hunt="hunt" @filter="setSpecies" />
  <!-- <div class="my-2 p-2 lg:flex bg-gray-50 rounded-sm uppercase">
    <div class="ml-2 text-xs font-medium text-gray-500 uppercase">
      <label class="mr-2">
        Filter Draw Type
      </label>
      <select name="resident" v-model="drawType" @change="setDrawType">
        <option value="non-resident">Non-Resident</option>
        <option value="resident">Resident</option>
      </select>
    </div>
    <div class="ml-2 text-xs font-medium text-gray-500 uppercase">
      <label class="mr-2">
        Filter Weapon
      </label>
      <select name="weapon" v-model="weapon" @change="setWeapon" class="capitalize">
        <option v-for="i in this.weaponList" :key="i">
          {{ i }}
        </option>
      </select>
    </div>
  </div> -->
  <div class="rounded-sm">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Species
          </th>
          <th scope="col" class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Draw Type
          </th>
          <th scope="col" class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Weapon
          </th>
          <th scope="col" class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Season Dates
          </th>
          <th scope="col" class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Units
          </th>
        </tr>
      </thead>
      <tbody v-if="hunt" class="bg-white divide-y divide-gray-200 capitalize">
          <tr v-for="i in data" :key="i.hunt_id">
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
              {{ i.species }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
              {{ i.draw_type }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
              {{ i.weapon }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
              {{ i.season_dates }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
              {{ i.unit_group }}
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import SimilarHuntsTabs from '@/components/similar-hunts-tabs.vue'
export default ({
  name: 'similar-hunts-table',
  props: ['hunt'],
  components: {
    SimilarHuntsTabs
  },
  data () {
    return {
      data: null,
      species: null,
      drawType: null,
      weapon: null,
      speciesList: null,
      weaponList: null
    }
  },
  created () {
    this.setHunt()
    this.setSpeciesList()
  },
  methods: {
    setHunt () {
      const similarHunts = this.hunt.similar_hunts
      this.data = similarHunts.filter(similarHunts => (similarHunts.species === this.hunt.species))
    },
    setSpeciesList () {
      const similarHunts = this.hunt.similar_hunts
      const uniqueSpecies = [...new Set(similarHunts.map(data => data.species))]
      const uniqueWeapon = [...new Set(similarHunts.map(data => data.weapon))]
      this.speciesList = uniqueSpecies
      this.weaponList = uniqueWeapon
    },
    // sets the species displayed in table, take a parameter filterSpecies passed by @filter listerner
    setSpecies (filterSpecies) {
      // sets the species from the @click function in the simalar-hunts-tabs component
      this.species = filterSpecies
      console.log(this.species)
      // set similar hunts to constant
      const similarHunts = this.hunt.similar_hunts
      // filter similar hunts by species that match the filterSpecies
      this.data = similarHunts.filter(similarHunts => (similarHunts.species === this.species))
    },
    setDrawType () {
      const similarHunts = this.data
      this.data = similarHunts.filter(similarHunts => (similarHunts.draw_type === this.drawType))
    },
    setWeapon () {
      const similarHunts = this.data
      this.data = similarHunts.filter(similarHunts => (similarHunts.weapon === this.weapon))
    }
  }
})
</script>
