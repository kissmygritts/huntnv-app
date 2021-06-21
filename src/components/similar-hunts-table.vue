<template>
<div class="bg-white p-6 rounded-lg shadow-lg">
  <h1>Similar Hunts</h1>
  <div class="flex m-10">
    <div class="pr-5">
      <label>
        Species
      </label>
      <select name="species" v-model="species" @change="setSpecies">
        <option value="antelopte">Antelope</option>
        <option value="bighorn sheep">Bighorn Sheep</option>
        <option value="elk">Elk</option>
        <option value="mule deer">Mule Deer</option>
      </select>
    </div>
    <div class="pr-5">
      <label>
        Draw Type
      </label>
      <select name="resident" v-model="drawType" @change="setDrawType">
        <option value="non-resident">Non-Resident</option>
        <option value="resident">Resident</option>
      </select>
    </div>
    <div class="pr-5">
      <label>
        Weapon
      </label>
      <select name="weapon" v-model="weapon" @change="setWeapon">
        <option value="any legal weapon">Any Legal Weapon</option>
        <option value="archery">Archery</option>
        <option value="muzzleloader">Muzzleloader</option>
        <option value="rifle">Rifle</option>
      </select>
    </div>
  </div>
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
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ i.display_name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ i.draw_type }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ i.weapon }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ i.season_dates }}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default ({
  name: 'similar-hunts-table',
  props: ['hunt'],
  data () {
    return {
      data: null,
      species: null,
      drawType: null,
      weapon: null
    }
  },
  created () {
    this.setHunt()
  },
  methods: {
    setHunt () {
      const similarHunts = this.hunt.similar_hunts
      this.data = similarHunts.filter(similarHunts => (similarHunts.species === this.hunt.species))
      console.log(this.data)
    },
    setSpecies () {
      const similarHunts = this.hunt.similar_hunts
      this.data = similarHunts.filter(similarHunts => (similarHunts.species === this.species))
      this.show = true
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
