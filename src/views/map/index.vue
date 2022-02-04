<template>
  <div class="flex-1 flex flex-col">
    <map-header />
    <div class="flex-1 flex overflow-hidden">
      <section class="block min-w-0 flex-1 lg:order-last bg-hero-topo">
        <pre><code lang="json">{{ { data, error, loading } }}</code></pre>
      </section>

      <!-- side bar -->
      <aside
        class="relative z-10 w-full lg:w-120 lg:order-first overflow-clip overflow-y-scroll shadow px-2"
      >
        <div v-if="!loading">
          <h2 class="p-2 text-2xl text-oxford-600">
            {{ data.total_hunts }} Hunts
          </h2>

          <div>
            <hf-list-container :hunt-feed="data.hunt_feed" />
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import MapHeader from './map-header.vue'
import HfListContainer from './hf-list-container.vue'
import { useHuntFeedStore } from '../../stores/hunt-feed.js'
import { storeToRefs } from 'pinia'

export default {
  name: 'huntnv-map',
  components: { MapHeader, HfListContainer },

  setup() {
    const huntFeed = useHuntFeedStore()
    const { data, error, loading } = storeToRefs(huntFeed)
    huntFeed.getHuntFeed()

    return {
      data,
      error,
      loading
    }
  }
}
</script>
