<template>
  <div class="flex-1 flex flex-col">
    <map-header />
    <filter-panel-mobile />

    <!-- intro modal -->
    <ui-modal :open="modalVisible" @modal:close="toggleModal">
      <template #modal-title>HuntNV FAQ</template>
      <template #modal-content>
        <div class="text-gray-600">
          <p>
            Before you start planning your next hunt allow us to explain a few
            things about HuntNV. For even more information
            <router-link to="/faq" class="text-blue-700 underline"
              >check out our FAQ page.</router-link
            >
          </p>
          <p class="mt-2 italic">
            This app works on mobile devices but you'll get better performance
            on a computer.
          </p>
          <p class="mt-2">
            If you have question, or problems with the application please email
            <a href="mailto:ndowinfo@ndow.org" class="text-blue-700 underline"
              >ndowinfo@ndow.org</a
            >
          </p>
          <h4 class="mt-3 text-lg leading-6 font-medium text-gray-900">
            Usage
          </h4>
          <ul class="mt-2 list-disc">
            <li>
              Use the map and hunt cards to gather information about hunts.
              Click on a hunt card for more information about a hunt.
            </li>
            <li>
              Filter the list of hunts with the inputs along the top of the
              page.
            </li>
            <li>
              Change map layers with the circle button in the bottom left.
            </li>
          </ul>
          <h4 class="mt-3 text-lg leading-6 font-medium text-gray-900">
            Definitions
          </h4>
          <ul class="mt-2 list-disc">
            <li>
              <strong class="text-gray-900 font-medium">Harvest:</strong> The
              harvest success rate reported from hunter feedback surveys.
            </li>
            <li>
              <strong class="text-gray-900 font-medium">Maturity:</strong> The
              percentage of males taken that meet the following maturity
              guidelines:
              <ul class="list-disc ml-4">
                <li>
                  <span class="text-gray-900 font-medium">Antelope:</span> 15"
                  or greater horn length.
                </li>
                <li>
                  <span class="text-gray-900 font-medium">Bighorn Sheep:</span>
                  7 years or older.
                </li>
                <li>
                  <span class="text-gray-900 font-medium">Elk:</span> 50" or
                  greater main beam length.
                </li>
                <li>
                  <span class="text-gray-900 font-medium">Mule Deer:</span> 4
                  points or greater.
                </li>
              </ul>
            </li>
            <li>
              <strong class="text-gray-900 font-medium">Median BP:</strong>
              The median number of bonus points of successful applicants. Median
              is the middle number in a sorted list of numbers.
            </li>
            <li>
              <strong class="text-gray-900 font-medium"
                >Draw Difficulty:</strong
              >
              This groups hunts into 5 categories based on the draw rate. VH:
              very hard, H: harder, M: moderately difficult, E: easier, VE:
              easiest.
            </li>
            <li>
              <strong class="text-gray-900 font-medium">Draw Rank:</strong>
              The ranking of how difficult a hunt is to draw. 1 is the most
              difficult. The higher the number the easier to draw. The second
              number is the total number of hunts considered in the ranking.
            </li>
          </ul>
        </div>
      </template>
    </ui-modal>

    <!-- page content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- map -->
      <section
        v-show="layout === 'both' || layout === 'map'"
        id="map"
        class="block min-w-0 flex-1 lg:order-last bg-hero-topo"
      >
        <maplibre-map
          ref="maplibre"
          :portal-slider="true"
          @click:faq="toggleModal"
        />
      </section>

      <!-- side bar -->
      <aside
        v-show="layout === 'both' || layout === 'list'"
        class="relative z-10 w-full lg:w-120 lg:order-first shadow px-2 overflow-clip overflow-y-auto"
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
import { ref, watchEffect, watch, nextTick, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useHuntFeedStore } from '../../stores/hunt-feed.js'
import useMobileMenu from '../../composables/use-mobile-menu.js'

import MaplibreMap from '../../components/maplibre/maplibre-map.vue'
import UiModal from '../../components/ui/ui-modal.vue'
import MapHeader from './map-header.vue'
import HfListContainer from './hf-list-container.vue'
import FilterPanelMobile from './filter-panel-mobile.vue'

const { layout } = useMobileMenu()

const modalVisible = ref(false)
const modalLastSeen = ref(null)

const setLastSeen = () => {
  const now = new Date()
  modalLastSeen.value = now
  localStorage.setItem('modalLastSeen', JSON.stringify(now))
}
const getLastSeen = () => {
  const data = localStorage.getItem('modalLastSeen')
  const lastSeen = JSON.parse(data) ?? ''
  modalLastSeen.value = lastSeen
}
const toggleModal = () => {
  modalVisible.value = !modalVisible.value
  setLastSeen()
}

onMounted(() => {
  getLastSeen()

  if (modalLastSeen.value) {
    const now = new Date()
    const prev = new Date(modalLastSeen.value)

    if (now - prev > 86400000) {
      modalVisible.value = true
    }
  } else {
    modalVisible.value = true
  }
})

// hunt feed data and composable
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

// resize map when switching between map and card display
watch(layout, async (newLayout) => {
  await nextTick
  if (newLayout === 'map') {
    maplibre.value.map.resize()
  }
})
</script>
