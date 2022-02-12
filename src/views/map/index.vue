<template>
  <div class="flex-1 flex flex-col">
    <map-header />
    <filter-panel-mobile />

    <div class="flex-1 flex overflow-hidden">
      <!-- map -->
      <section
        v-show="layout === 'both' || layout === 'map'"
        class="block min-w-0 flex-1 lg:order-last bg-hero-topo"
      >
        {{ { layout, previousLayout } }}
      </section>

      <!-- side bar -->
      <aside
        v-show="layout === 'both' || layout === 'list'"
        class="relative z-10 w-full lg:w-120 lg:order-first overflow-clip overflow-y-scroll shadow px-2"
      >
        <div v-if="!loading">
          <h2 class="mt-1 p-2 text-2xl text-oxford-600">
            {{ data.total_hunts ?? 0 }} Hunts
          </h2>

          <div class="mt-2">
            <!-- <hf-list-container :hunt-feed="data.hunt_feed" /> -->
            {{ { layout, previousLayout } }}
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

import { useHuntFeedStore } from '../../stores/hunt-feed.js'
import useMobileMenu from '../../composables/use-mobile-menu.js'

import MapHeader from './map-header.vue'
import HfListContainer from './hf-list-container.vue'
import FilterPanelMobile from './filter-panel-mobile.vue'

export default {
  name: 'huntnv-map',
  components: { MapHeader, HfListContainer, FilterPanelMobile },

  setup() {
    const { layout, previousLayout } = useMobileMenu()

    const huntFeed = useHuntFeedStore()
    const { data, error, loading, feedFilters, getFeedFilters } =
      storeToRefs(huntFeed)

    watchEffect(() => huntFeed.getHuntFeed(getFeedFilters.value), {
      deep: true
    })

    return {
      data,
      error,
      loading,
      feedFilters,
      getFeedFilters,

      layout,
      previousLayout
    }
  }
}
</script>
