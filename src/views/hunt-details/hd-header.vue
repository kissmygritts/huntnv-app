<template>
  <div class="bg-gray-50 overflow-hidden">
    <div class="p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex sm:space-x-5">
          <div class="lg:flex lg:items-center lg:justify-between capitalize">
            <div
              class="flex-1 min-w-0"
            >
              <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                {{ hunt.display_name }}
              </h2>
              <div class="pt-2 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <IdentificationIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ hunt.draw_type }}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <img src="@/assets/images/aim.png" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-200" aria-hidden="true"/>
                  Weapon: {{ hunt.weapon }}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Season Dates: {{ hunt.season_dates }}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <ClockIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Days: {{ hunt.season_length }}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <ArrowsExpandIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ areaAsAcres }} Miles<sup>2</sup>
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <ChartPieIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ (hunt.public_land_pct * 100).toFixed(0) }}% Public Land
                </div>
                <div class="py-2 flex items-center text-sm text-gray-500">
                  <TagIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Tags: {{ hunt.quota }}
                </div>
              </div>
              <div class="py-2 flex flex-wrap items-center text-sm text-gray-500">
                <p class="mr-2">Units:</p>
                  <span
                    v-for="unit in huntUnits"
                    :key="unit"
                    class="relative z-0 inline-flex flex-wrap"
                  >
                    <span class="flex items-center px-2 py-2 mr-1 rounded border border-olive-300 bg-white text-sm font-medium text-olive-700 focus:ring-1 focus:ring-olive-500 focus:border-olive-500">
                      {{ unit }}
                    </span>
                    <!-- <router-link
                      :to="{ name: 'HuntUnits', params: { id: unit }}"
                      tag="button"
                      class="flex items-center px-2 py-2 mr-1 rounded border border-olive-300 bg-white text-sm font-medium text-olive-700 hover:bg-olive-200 focus:ring-1 focus:ring-olive-500 focus:border-olive-500"
                    >
                      {{ unit }}
                    </router-link> -->
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CalendarIcon, IdentificationIcon, ArrowsExpandIcon, TagIcon, ClockIcon, ChartPieIcon } from '@heroicons/vue/outline'

export default {
  name: 'hd-header',
  components: {
    CalendarIcon,
    IdentificationIcon,
    ArrowsExpandIcon,
    TagIcon,
    ClockIcon,
    ChartPieIcon
  },
  props: {
    hunt: {
      type: Object,
      required: true
    }
  },
  computed: {
    areaAsAcres () {
      const acres = this.hunt.area / 2590000
      return acres.toFixed(0)
    },
    huntUnits () {
      const huntUnits = this.hunt.hunt_units_arr
      huntUnits.sort((a, b) => a - b)
      return huntUnits
    }
  }
}
</script>
