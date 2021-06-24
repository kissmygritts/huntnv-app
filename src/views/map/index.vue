<template>
  <div class="flex-1 flex xl:overflow-hidden">
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
        bg-olive-200
      "
    >
      <h1 id="primary-heading" class="sr-only">Map</h1>
      map
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
          <div class="w-full p-4">
            <hnv-select-species v-model="species" @update:model-value="setHuntFilters" />

            <select class="w-full mt-2" name="residency" id="residency" v-model="residency" @change="setHuntFilters">
              <option v-for="residency in residencyOptions" :key="residency" :value="residency">
                {{ residency }}
              </option>
            </select>

            <select class="w-full mt-2" name="weapon" id="weapon" v-model="weapon" @change="setHuntFilters">
              <option v-for="weapon in weaponOptions" :key="weapon" :value="weapon">
                {{ weapon }}
              </option>
            </select>

            <button type="button" class="bg-white p-2 mt-2" @click="resetHuntFilters">Reset Filters</button>
          </div>

          <!-- <pre><code>{{ activeHunts[0] }}</code></pre> -->

          <div class="w-full p-2">
            <mv-hunt-list :hunts="activeHunts" />
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import axios from 'axios'
import geobuf from 'geobuf'
import Pbf from 'pbf'
import maplibregl from 'maplibre-gl'
import { getHunts } from '@/services/hunt-services.js'
import mvHuntList from './mv-hunt-list.vue'
import hnvSelectSpecies from '@/components/form-inputs/hnv-select-species.vue'

const filterArray = (arr, filters) => {
  const filterKeys = Object.keys(filters)

  return arr.filter(item => {
    return filterKeys.every(key => {
      if (!filters[key].toString().length) return true
      return filters[key] === item[key]
    })
  })
}

const residencyOptions = ['', 'resident', 'non-resident']
const weaponOptions = ['', 'archery', 'muzzleloader', 'any legal weapon']

export default {
  name: 'map-view',

  components: { mvHuntList, hnvSelectSpecies },

  data () {
    return {
      hunts: null,
      loading: true,
      huntGeojson: null,
      species: {},
      residencyOptions,
      residency: '',
      weaponOptions,
      weapon: '',
      map: null
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

    activeHuntIds () {
      return this.activeHunts.map(item => item.id)
    },

    huntMvtFilter () {
      if (!Object.keys(this.activeFilters).length) {
        return ['==', '$id', 0]
      }
      return ['in', '$id', ...this.activeHuntIds]
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
        center: [-116.6554, 39.3564],
        zoom: 6.5
      })

      map.on('load', () => {
        // await this.loadGeometry()

        map.addSource('units', {
          type: 'vector',
          tiles: ['https://huntnv-api-mkvuv.ondigitalocean.app/features/hunt_units_open_full/{z}/{x}/{y}.pbf']
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

        map.addSource('huntgeoms', {
          type: 'vector',
          tiles: ['https://huntnv-api-mkvuv.ondigitalocean.app/features/hunts_with_geom/{z}/{x}/{y}.pbf']
        })

        map.addLayer({
          id: 'hunts-fill',
          type: 'fill',
          source: 'huntgeoms',
          'source-layer': 'hunts_with_geom',
          layout: {
            visibility: 'visible'
          },
          paint: {
            'fill-color': '#2e598a',
            'fill-opacity': 0.4,
            'fill-outline-color': 'rgba(255, 255, 255, 1)'
          },
          filter: ['==', '$id', 0]
        })
      })

      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point)
        console.log({ features })
      })

      this.map = map
    },

    setHuntFilters () {
      this.map.setFilter('hunts-fill', this.huntMvtFilter)
    },

    resetHuntFilters () {
      this.species = {}
      this.residency = ''
      this.weapon = ''
    },

    async loadGeometry () {
      const geom = await axios.get(
        'https://huntnv-api-mkvuv.ondigitalocean.app/features/hunts_with_geom/317.geobuf',
        {
          responseType: 'arraybuffer'
        }
      )
      const geojson = geobuf.decode(new Pbf(geom.data))
      this.huntGeojson = geojson
    }
  }
}
</script>
