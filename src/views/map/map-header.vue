<template>
  <div class="flex-shrink-0 flex h-16 bg-white shadow px-2 z-40">
    <div class="flex flex-1 items-center h-full space-x-2">
      <!-- Menu button, mobile only -->
      <div class="flex-none flex items-center lg:hidden">
        <button
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-saffron-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-saffron-600"
          @click="open"
        >
          <span class="sr-only">Open mobile navigation menu</span>
          <menu-alt4-icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <!-- Search bar -->
      <div class="flex-1">
        <div>
          <div class="pr-2">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
              >
                <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                class="block w-full bg-white border border-gray-300 rounded py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-2 focus:ring-saffron-600"
                placeholder="Find hunt units..."
                type="search"
                v-model="searchTerm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Filter popovers -->
      <div class="flex-1 items-center space-x-3 hidden lg:flex">
        <ui-popover>
          <template #label>Hunt Details</template>
          <template #content>
            <filter-hunt-details />
          </template>
        </ui-popover>

        <ui-popover>
          <template #label>Harvest Stats</template>
          <template #content>
            <filter-harvest-stats />
          </template>
        </ui-popover>

        <ui-popover>
          <template #label>Draw Stats</template>
          <template #content>
            <filter-draw-stats />
          </template>
        </ui-popover>
      </div>

      <!-- mobile page buttons -->
      <div class="flex-none space-x-1 lg:hidden">
        <button
          type="button"
          class="relative flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-saffron-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-saffron-500"
          @click="transitionLayout('openFilters')"
        >
          <span class="sr-only">Open filters panel</span>
          <adjustments-icon class="h-6 w-6" aria-hidden="true" />
          <span
            class="absolute inline-flex items-center justify-center bg-saffron-600 h-2 w-2 text-xxs font-bold rounded-full shadow top-1 right-1"
          />
        </button>

        <button
          v-if="
            layout === 'list' ||
            (layout === 'filters' && previousLayout === 'list')
          "
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-saffron-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-saffron-500"
          @click="transitionLayout('toggle')"
        >
          <span class="sr-only">Open map panel</span>
          <map-icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          v-if="
            layout === 'map' ||
            (layout === 'filters' && previousLayout === 'map')
          "
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-saffron-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-saffron-500"
          @click="transitionLayout('toggle')"
        >
          <span class="sr-only">Open list panel</span>
          <view-grid-icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SearchIcon,
  MenuAlt4Icon,
  AdjustmentsIcon,
  MapIcon,
  ViewGridIcon
} from '@heroicons/vue/outline'
import useMobileMenu from '../../composables/use-mobile-menu.js'
import UiPopover from '../../components/ui/ui-popover.vue'
import FilterHuntDetails from './filter-hunt-details.vue'
import FilterHarvestStats from './filter-harvest-stats.vue'
import FilterDrawStats from './filter-draw-stats.vue'

export default {
  name: 'ndow-map-header',
  components: {
    SearchIcon,
    MenuAlt4Icon,
    AdjustmentsIcon,
    MapIcon,
    ViewGridIcon,
    UiPopover,
    FilterHuntDetails,
    FilterHarvestStats,
    FilterDrawStats
  },
  setup() {
    const { open, layout, previousLayout, transitionLayout } = useMobileMenu()

    return {
      open,
      layout,
      previousLayout,
      transitionLayout
    }
  }
}
</script>
