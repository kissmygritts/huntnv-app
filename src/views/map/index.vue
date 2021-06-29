<template>
  <div class="flex-1 flex xl:overflow-hidden bg-gray-200">
    <!-- map area -->
    <section
      id="map"
      aria-labelledby="primary-heading"
      class="
        min-w-0
        flex-1
        h-full
        flex flex-col
        overflow-hidden
        lg:order-last
      "
    >
      <h1 id="primary-heading" class="sr-only">Map</h1>
      <div v-if="isDev" class="absolute z-50 top-0 right-0 w-96 h-1/2 bg-white opacity-75 overflow-auto">
        <pre><code>{{ mapDetails }}</code></pre>
      </div>
    </section>

    <!-- hunt cards and filters (hidden on smaller screens) -->
    <aside class="hidden lg:block lg:flex-shrink-0 lg:order-first">
      <div
        class="
          h-full
          relative
          flex flex-col
          w-96
          border-r border-gray-200
          bg-gray-200
          overflow-y-scroll overflow-x-hidden
        "
      >
        <p v-if="loading">LOADING...</p>
        <div v-else>
          <div class="w-full px-2 py-4 space-y-2">
            <hnv-select-species v-model="species" @update:model-value="setHuntFilters" />
            <hnv-select-weapon v-model="weapon" @update:model-value="setHuntFilters" />
            <hnv-select-residency v-model="residency" @update:model-value="setHuntFilters" />

            <button
              type="button"
              class="ml-1 text-sm text-saffron-700 cursor-pointer hover:underline"
              @click="resetHuntFilters">
                Reset Filters
              </button>
          </div>

          <div class="w-full p-2">
            <div>
              <h2 class="ml-1 text-2xl text-gray-800">
                {{ activeHunts.length }} Hunts
              </h2>
            </div>
            <mv-hunt-list class="mt-1" :hunts="activeHunts" @hunt-card:hover="handleHunCardHover" />
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import { getHunts } from '@/services/hunt-services.js'
import mvHuntList from './mv-hunt-list.vue'
import hnvSelectSpecies from '@/components/form-inputs/hnv-select-species.vue'
import hnvSelectWeapon from '@/components/form-inputs/hnv-select-weapon.vue'
import hnvSelectResidency from '@/components/form-inputs/hnv-select-residency.vue'

const TILE_URL = process.env.VUE_APP_API_URL

const filterArray = (arr, filters) => {
  const filterKeys = Object.keys(filters)

  return arr.filter(item => {
    return filterKeys.every(key => {
      if (!filters[key].toString().length) return true
      return filters[key] === item[key]
    })
  })
}

export default {
  name: 'map-view',

  components: { mvHuntList, hnvSelectSpecies, hnvSelectWeapon, hnvSelectResidency },

  data () {
    return {
      hunts: null,
      loading: true,
      huntGeojson: null,
      species: {},
      residency: '',
      weapon: '',
      map: null,
      mapDetails: {
        zoom: null,
        center: null,
        bounds: null,
        mousePosition: null,
        features: null
      }
    }
  },

  computed: {
    activeFilters () {
      const filters = {}

      if (this.species?.id) Object.assign(filters, { species_id: this.species.id })
      if (this.residency) Object.assign(filters, { draw_type: this.residency })
      if (this.weapon) Object.assign(filters, { weapon: this.weapon })

      return filters
    },

    activeHunts () {
      if (!Object.keys(this.activeFilters).length) return this.hunts
      return filterArray(this.hunts, this.activeFilters)
    },

    activeHuntGeomIds () {
      return [...new Set(this.activeHunts.map(item => item.hunt_geometry_id))]
    },

    huntMvtFilter () {
      if (!Object.keys(this.activeFilters).length) {
        return ['==', '$id', 0]
      }
      return ['in', '$id', ...this.activeHuntGeomIds]
    },

    isDev () {
      return process.env.NODE_ENV === 'development'
    }
  },

  async created () {
    this.loading = true
    const { data } = await getHunts()
    this.hunts = data
    this.loading = false
  },

  mounted () {
    this.renderMap()
  },

  methods: {
    renderMap () {
      const map = new maplibregl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/topo/style.json?key=BJ5Us337tUIPtCCZeKV8',
        center: [-116.6554, 39.1564],
        zoom: 6
      })

      map.on('load', () => {
        // public landownership
        map.addSource('landownership', {
          type: 'vector',
          tiles: [`${TILE_URL}/features/public_landownership/{z}/{x}/{y}.pbf`],
          minzoom: 8,
          maxzoom: 14
        })

        // usfs
        map.addLayer({
          id: 'landownership-usfs-fill',
          type: 'fill',
          source: 'landownership',
          'source-layer': 'public_landownership',
          paint: {
            'fill-opacity': 0.25,
            'fill-color': '#60C99E'
          },
          filter: ['==', 'surface_mgmt_agency', 'US Forest Service']
        })
        map.addLayer({
          id: 'landownership-usfs-outline',
          type: 'line',
          source: 'landownership',
          'source-layer': 'public_landownership',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#60C99E',
            'line-width': 1
          },
          filter: ['==', 'surface_mgmt_agency', 'US Forest Service']
        })

        // blm
        map.addLayer({
          id: 'landownership-blm-fill',
          type: 'fill',
          source: 'landownership',
          'source-layer': 'public_landownership',
          paint: {
            'fill-opacity': 0.25,
            'fill-color': '#FED17E'
          },
          filter: ['==', 'surface_mgmt_agency', 'Bureau of Land Mangement']
        })
        map.addLayer({
          id: 'landownership-blm-outline',
          type: 'line',
          source: 'landownership',
          'source-layer': 'public_landownership',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#FED17E',
            'line-width': 1
          },
          filter: ['==', 'surface_mgmt_agency', 'Bureau of Land Mangement']
        })

        // usfws
        map.addLayer({
          id: 'landownership-usfws-fill',
          type: 'fill',
          source: 'landownership',
          'source-layer': 'public_landownership',
          paint: {
            'fill-opacity': 0.25,
            'fill-color': '#AE9BCE'
          },
          filter: ['==', 'surface_mgmt_agency', 'US Fish and Wildlife Service']
        })
        map.addLayer({
          id: 'landownership-usfws-outline',
          type: 'line',
          source: 'landownership',
          'source-layer': 'public_landownership',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#AE9BCE',
            'line-width': 1
          },
          filter: ['==', 'surface_mgmt_agency', 'US Fish and Wildlife Service']
        })

        // bia
        map.addLayer({
          id: 'landownership-bia-fill',
          type: 'fill',
          source: 'landownership',
          'source-layer': 'public_landownership',
          paint: {
            'fill-opacity': 0.25,
            'fill-color': '#FEA955'
          },
          filter: ['==', 'surface_mgmt_agency', 'Bureau of Indian Affairs']
        })
        map.addLayer({
          id: 'landownership-bia-outline',
          type: 'line',
          source: 'landownership',
          'source-layer': 'public_landownership',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#EDC4A5',
            'line-width': 1
          },
          filter: ['==', 'surface_mgmt_agency', 'Bureau of Indian Affairs']
        })

        // other federal
        map.addLayer({
          id: 'landownership-other-fill',
          type: 'fill',
          source: 'landownership',
          'source-layer': 'public_landownership',
          paint: {
            'fill-opacity': 0.25,
            'fill-color': '#EDC4A5'
          },
          filter: ['==', 'surface_mgmt_agency', 'Federal (other)']
        })
        map.addLayer({
          id: 'landownership-other-outline',
          type: 'line',
          source: 'landownership',
          'source-layer': 'public_landownership',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#FEA955',
            'line-width': 1
          },
          filter: ['==', 'surface_mgmt_agency', 'Federal (other)']
        })

        // state & local
        map.addLayer({
          id: 'landownership-local-fill',
          type: 'fill',
          source: 'landownership',
          'source-layer': 'public_landownership',
          paint: {
            'fill-opacity': 0.25,
            'fill-color': '#96CDDF'
          },
          filter: [
            'any',
            ['==', 'surface_mgmt_agency', 'Local'],
            ['==', 'surface_mgmt_agency', 'State']
          ]
        })
        map.addLayer({
          id: 'landownership-local-outline',
          type: 'line',
          source: 'landownership',
          'source-layer': 'public_landownership',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#96CDDF',
            'line-width': 1
          },
          filter: [
            'any',
            ['==', 'surface_mgmt_agency', 'Local'],
            ['==', 'surface_mgmt_agency', 'State']
          ]
        })

        // hunt units
        map.addSource('units', {
          type: 'vector',
          tiles: [`${TILE_URL}/features/hunt_units_open_full/{z}/{x}/{y}.pbf`]
        })
        map.addLayer({
          id: 'units',
          type: 'line',
          source: 'units',
          'source-layer': 'hunt_units_open_full',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#f29645',
            'line-width': 2
          }
        })

        // hunt geometries
        map.addSource('huntgeoms', {
          type: 'vector',
          tiles: [`${TILE_URL}/features/hunt_geometries/{z}/{x}/{y}.pbf`]
        })
        map.addLayer({
          id: 'hunts-fill',
          type: 'fill',
          source: 'huntgeoms',
          'source-layer': 'hunt_geometries',
          layout: {
            visibility: 'visible'
          },
          paint: {
            'fill-color': '#2e598a',
            'fill-opacity': 0.25
          },
          filter: ['==', '$id', 0]
        })
        map.addLayer({
          id: 'hunts-outline',
          type: 'line',
          source: 'huntgeoms',
          'source-layer': 'hunt_geometries',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#1f355b',
            'line-width': 1
          },
          filter: ['==', '$id', 0]
        })

        // hovered geometries
        map.addLayer({
          id: 'hovered-hunt-fill',
          type: 'fill',
          source: 'huntgeoms',
          'source-layer': 'hunt_geometries',
          layout: {
            visibility: 'visible'
          },
          paint: {
            'fill-color': '#2de2e6',
            'fill-opacity': 0.75
          },
          filter: ['==', '$id', 0]
        })
        map.addLayer({
          id: 'hovered-hunt-outline',
          type: 'line',
          source: 'huntgeoms',
          'source-layer': 'hunt_geometries',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#2de2e6',
            'line-width': 2
          },
          filter: ['==', '$id', 0]
        })
      })

      // map details, dev only
      if (this.isDev) {
        map.on('click', (e) => {
          const features = map.queryRenderedFeatures(e.point)
          this.mapDetails.features = features.map(feature => {
            const { geometry, _geometry, _vectorTileFeature, ...rest } = feature
            return rest
          })
        })

        map.on('zoom', () => {
          this.mapDetails.zoom = this.map.getZoom()
          this.mapDetails.center = this.map.getCenter()
          this.mapDetails.bounds = this.map.getBounds()
        })

        map.on('drag', () => {
          this.mapDetails.center = this.map.getCenter()
          this.mapDetails.bounds = this.map.getBounds()
        })

        map.on('mousemove', (e) => {
          this.mapDetails.mousePosition = e.lngLat.wrap()
        })
      }

      this.map = map
    },

    setHuntFilters () {
      this.map.setFilter('hunts-fill', this.huntMvtFilter)
      this.map.setFilter('hunts-outline', this.huntMvtFilter)
    },

    resetHuntFilters () {
      this.species = {}
      this.residency = ''
      this.weapon = ''
    },

    handleHunCardHover ({ hunt, hover }) {
      if (hover) {
        const huntGeomId = hunt.hunt_geometry_id
        this.map.setFilter('hovered-hunt-fill', ['==', '$id', huntGeomId])
        this.map.setFilter('hovered-hunt-outline', ['==', '$id', huntGeomId])
      } else {
        this.map.setFilter('hovered-hunt-fill', ['==', '$id', 0])
        this.map.setFilter('hovered-hunt-outline', ['==', '$id', 0])
      }
    }
  }
}
</script>
