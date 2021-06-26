<template>
  <div class="bg-gray-200 w-full overflow-y-auto items-center">
    <p v-if="loading">LOADING...</p>
    <div v-if="hunts" class="p-5">
      <div class="flex">
        <h1 class="font-bold text-3xl">Hunts ({{ huntsCount }})</h1>
      </div>
      <similar-hunts-tabs v-if="hunts" :data="hunts" @filter="setSpecies" class="my-3" />
      <div class="">
        <div v-for="hunt in hunts" :key="hunt.id" :hunt="hunt">
          <router-link :to="{ name: 'HuntDetails', params: { id: hunt.id }}">
            <div class= "my-5 p-5 bg-gray-50 hover:bg-gray-300 text-black rounded-md shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1">
              <div class="flex text-xs text-gray-500">
                <span class="">
                  Western Region
                </span>
              </div>
              <h2 class="text-xl font-bold capitalize">
                {{ hunt.display_name }}
              </h2>
              <div class="font-medium capitalize">
                <span>{{ hunt.draw_type }}</span>
                <span class="mx-1">&ndash;</span>
                <span>{{ hunt.weapon }}</span>
              </div>
              <span
                :class="[ speciesColors[hunt.species] ]"
                class="flex-shrink-0 inline-block my-2 mr-2 px-2 py-0.5 text-xs font-medium rounded-full"
              >
                {{ hunt.species }}
              </span>
              <span
                :class="[ classColors[hunt.class] ]"
                class="flex-shrink-0 inline-block my-2 mx-2 px-2 py-0.5 text-xs font-medium rounded-full"
              >
                {{ hunt.class }}
              </span>
              <span
                :class="[ weaponColors[hunt.weapon] ]"
                class="flex-shrink-0 inline-block my-2 mx-2 px-2 py-0.5 text-xs font-medium rounded-full"
              >
                {{ hunt.weapon }}
              </span>
              <div class="lg:flex font-light">
                <div class="flex items-center pr-5 py-1 text-sm text-gray-500">
                  <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span class="capitalize">Season Dates: {{ hunt.season_dates }}</span>
                </div>
                <div class="flex items-center pr-5 py-1 text-sm text-gray-500">
                  <ClockIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span class="capitalize">Days: 31</span>
                </div>
                <div class="flex items-center pr-5 py-1 text-sm text-gray-500">
                  <TagIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span class="capitalize">Quota: {{ hunt.quota }}</span>
                </div>
                <div class="flex items-center pr-5 py-1 text-sm text-gray-500">
                  <ChartBarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span class="capitalize">Draw Odds: {{ hunt.quota }}%</span>
                </div>
                <div class="flex items-center pr-5 py-1 text-sm text-gray-500">
                  <ViewGridIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span class="capitalize">Unit Group: {{ hunt.unit_group }}</span>
                </div>
                <div class="flex items-center pr-5 py-1 text-sm text-gray-500">
                  <ChartPieIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span class="capitalize">Public Land: 50%</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimilarHuntsTabs from '@/components/similar-hunts-tabs.vue'

import { CalendarIcon, ViewGridIcon, TagIcon, ChartPieIcon, ChartBarIcon, ClockIcon } from '@heroicons/vue/outline'

import { getHunts } from '@/services/hunt-services.js'

export default {
  name: 'Hunts',
  components: {
    SimilarHuntsTabs,
    CalendarIcon,
    ViewGridIcon,
    TagIcon,
    ChartPieIcon,
    ChartBarIcon,
    ClockIcon
  },
  data () {
    return {
      loading: false,
      hunts: null,
      species: null,
      filtered: null,
      speciesColors: {
        elk: 'bg-green-300 text-green-800',
        antelope: 'bg-yellow-300 text-yellow-800',
        'mule deer': 'bg-indigo-300 text-indigo-800',
        'nelson (desert) bighorn sheep': 'bg-blue-300 text-blue-800',
        'california bighorn sheep': 'bg-saffron-300 text-saffron-800',
        'rocky mountain bighorn sheep': 'bg-purple-300 text-purple-800',
        'mountain goat': 'bg-olive-300 text-olive-800'
      },
      classColors: {
        antlered: 'bg-oxford-200 text-oxford-800',
        antlerless: 'bg-red-200 text-red-800',
        'antlered or antlerless': 'bg-yellow-200 text-yellow-800',
        'depredation antlerless': 'bg-blue-200 text-blue-800',
        spike: 'bg-green-200 text-green-800',
        'horns longer than ears': 'bg-purple-200 text-purple-800',
        'horns shorter than ears': 'bg-pink-200 text-pink-800',
        'any ram': 'bg-oxford-200 text-oxford-800',
        'any ewe': 'bg-yellow-200 text-yellow-800',
        'any goat': 'bg-yellow-300 text-yellow-800'
      },
      weaponColors: {
        'any legal weapon': 'bg-green-100 text-green-800',
        archery: 'bg-yellow-100 text-yellow-800',
        'shotgun or bow only': 'bg-purple-100 text-purple-800',
        muzzleloader: 'bg-blue-100 text-blue-800'
      }
    }
  },
  computed: {
    huntsCount () {
      const count = this.hunts.length
      return count
    }
  },
  methods: {
    setSpecies (filterSpecies) {
      this.species = filterSpecies
      console.log(this.species)
      const similarHunts = this.hunts
      this.hunts = similarHunts.filter(similarHunts => (similarHunts.species === this.species))
    }
  },
  async created () {
    this.loading = true
    const { data } = await getHunts()
    this.hunts = data
    this.loading = false
  }
}
</script>
