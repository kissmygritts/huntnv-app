<template>
  <div class="flex-1 flex flex-col">
    <map-header />
    <filter-panel-mobile />

    <div class="flex-1 flex overflow-hidden">
      <!-- map -->
      <section
        v-show="layout === 'both' || layout === 'map'"
        id="map"
        class="block min-w-0 flex-1 lg:order-last bg-hero-topo"
      >
        <maplibre-map ref="maplibre" :portal-slider="true" />
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
            <hf-list-container
              :hunt-feed="data.hunt_feed"
              @hunt-card:hover="hoverHunt"
            />
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'

import { useHuntFeedStore } from '../../stores/hunt-feed.js'
import useMobileMenu from '../../composables/use-mobile-menu.js'

import MapHeader from './map-header.vue'
import HfListContainer from './hf-list-container.vue'
import FilterPanelMobile from './filter-panel-mobile.vue'
import MaplibreMap from '../../components/maplibre/maplibre-map.vue'

const { layout } = useMobileMenu()

const huntFeed = useHuntFeedStore()
const { data, loading, getFeedFilters, activeHuntGeomIds } =
  storeToRefs(huntFeed)

watchEffect(() => huntFeed.getHuntFeed(getFeedFilters.value), { flush: 'pre' })

// map interactions
const maplibre = ref(null)

// show hunt geoms on filter
watch(
  activeHuntGeomIds,
  (ids) => {
    const layerFilter = ['in', '$id', ...ids]
    nextTick(() => {
      maplibre.value.layers[2].layers[0].filter = layerFilter
      maplibre.value.layers[2].layers[1].filter = layerFilter
      maplibre.value.map.setFilter('hunt-geometry-fill', layerFilter)
      maplibre.value.map.setFilter('hunt-geometry-outline', layerFilter)
    })
  },
  { flush: 'post' }
)

// show hovered hunt geom
const hoverHunt = ({ hunt, hover }) => {
  if (hover) {
    maplibre.value.map.setFilter('hovered-hunt-geometry', ['==', '$id', hunt])
  } else {
    maplibre.value.map.setFilter('hovered-hunt-geometry', ['==', '$id', 0])
  }
}
</script>
