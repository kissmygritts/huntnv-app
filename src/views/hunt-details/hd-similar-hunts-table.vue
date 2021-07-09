<template>
  <div class="bg-gray-50 p-4">
    <h3 class="font-medium text-xl tracking-wider text-gray-800 uppercase">
      Similar Hunts
    </h3>
    <hd-similar-hunts-tabs
      :data="hunt"
      @filter="setSpecies"
    />
    <div
      v-for="similarHunt in data"
      :key="similarHunt.hunt_id"
      class="lg:hidden capitalize"
    >
      <router-link :to="{ name: 'HuntDetails', params: { id: similarHunt.hunt_id }}">
        <div class= "my-5 p-5 bg-white hover:bg-gray-300 text-black rounded-md shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1">
          <h3 class="capitalize text-lg font-monospaced text-olive-800">
            {{ similarHunt.display_name }}
          </h3>
          <div class="text-gray-700 font-light capitalize">
            <div>
              <span>{{ similarHunt.weapon }}</span>
              <span class="mx-1 font-medium text-gray-600">&bull;</span>
              <span>{{ similarHunt.draw_type }}</span>
            </div>
            <div class="capitalize">
              <span class="font-normal">
                Season Dates:
              </span>
              {{ similarHunt.season_dates }}
            </div>
            <div>
              <span class="font-normal">
                Hunt Units:
              </span>
              {{ similarHunt.unit_group }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="hidden lg:block rounded-md overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
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
            <th scope="col" class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              link
            </th>
          </tr>
        </thead>
        <tbody
          v-if="hunt"
          class="bg-white divide-y divide-gray-200 capitalize"
        >
          <tr
            v-for="similarHunt in data"
            :key="similarHunt.hunt_id"
          >
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800">
              {{ similarHunt.display_name }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800">
              {{ similarHunt.draw_type }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800">
              {{ similarHunt.weapon }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800">
              {{ similarHunt.season_dates }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800">
              {{ similarHunt.unit_group }}
            </td>
            <router-link
              tag="td"
              :to="{ name: 'HuntDetails', params: { id: similarHunt.hunt_id } }"
              class="inline-block px-2 py-4 whitespace-nowrap text-olive-700 hover:text-olive-400"
            >
              <!-- <router-link :to="{ name: 'HuntDetails', params: { id: i.hunt_id } }"> -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <!-- </router-link> -->
            </router-link>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import HdSimilarHuntsTabs from '@/views/hunt-details/hd-similar-hunts-tabs.vue'
export default ({
  name: 'similar-hunts-table',
  props: ['hunt'],
  components: {
    HdSimilarHuntsTabs
  },
  data () {
    return {
      data: null,
      species: null,
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
      const similarHunts = this.hunt.similar_hunts
      const uniqueSpecies = [...new Set(similarHunts.map(data => data.species))]
      this.speciesList = uniqueSpecies
    },
    setSpecies (filterSpecies) {
      this.species = filterSpecies
      const similarHunts = this.hunt.similar_hunts
      this.data = similarHunts.filter(similarHunts => (similarHunts.species === this.species))
    }
  }
})
</script>
