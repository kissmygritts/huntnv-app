<template>
<div class="bg-white p-6 rounded-lg shadow-lg">
  <h3 class="font-bold text-xl text-black uppercase">Similar Hunts</h3>
  <div class="p-2 my-5 flex bg-gray-500 rounded-lg shadow-lg">
    <div class="">
      <label class="text-white font-medium">
        Species:
      </label>
      <select name="species"  v-model="species" @change="setSpecies" class="capitalize">
        <option v-for="i in this.speciesList" :key="i">
          {{ i }}
        </option>
      </select>
    </div>
    <div class="pl-1">
      <label class="text-white font-medium">
        Draw Type:
      </label>
      <select name="resident" v-model="drawType" @change="setDrawType">
        <option value="non-resident">Non-Resident</option>
        <option value="resident">Resident</option>
      </select>
    </div>
    <div class="pl-1">
      <label class="text-white font-medium">
        Weapon:
      </label>
      <select name="weapon" v-model="weapon" @change="setWeapon">
        <option value="any legal weapon">Any Legal Weapon</option>
        <option value="archery">Archery</option>
        <option value="muzzleloader">Muzzleloader</option>
        <option value="rifle">Rifle</option>
      </select>
    </div>
  </div>
  <div class="bg-white rounded-lg shadow-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hunt
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Draw Type
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Weapon
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Season Dates
          </th>
        </tr>
      </thead>
      <tbody v-if="hunt" class="bg-white divide-y divide-gray-200 capitalize">
        <tr v-for="i in data" :key="i.hunt_id">
          <td class="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
            {{ i.display_name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
            {{ i.draw_type }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
            {{ i.weapon }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
            {{ i.season_dates }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default ({
  name: 'similar-hunts-table',
  props: ['hunt'],
  data () {
    return {
      data: null,
      species: this.hunt.species,
      drawType: null,
      weapon: null,
      speciesList: null
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
      console.log(this.hunt.similar_hunts)
      const similarHunts = this.hunt.similar_hunts
      const unique = [...new Set(similarHunts.map(data => data.species))]
      console.log(unique)
      this.speciesList = unique
    },
    setSpecies () {
      const similarHunts = this.hunt.similar_hunts
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
