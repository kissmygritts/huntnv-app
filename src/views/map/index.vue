<template>
  <div class="flex-1 flex xl:overflow-hidden">
    <!-- map area -->
    <section
      id="map"
      aria-labelledby="primary-heading"
      class="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last bg-olive-200"
    >
      <h1 id="primary-heading" class="sr-only">Map</h1>
      map
    </section>

    <!-- hunt cards and filters (hidden on smaller screens) -->
    <aside class="hidden lg:block lg:flex-shrink-0 lg:order-first">
      <div class="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-200 overflow-y-scroll overflow-x-hidden">
        <p v-if="loading">LOADING...</p>
        <div v-else>
          <label>
              Species
          </label>
          <select v-model="displayName" @change="filterSpecies">
             <option v-for="i in this.displayNameList" :key="i">
              {{ i }}
            </option>
          </select>
          <div v-if="show" class="">
            <label>
                Draw Type
            </label>
            <select v-model="drawType" @change="filterDrawType">
              <option v-for="i in this.drawTypeList" :key="i">
                {{ i }}
              </option>
            </select>
          </div>
          {{ this.hunts}}
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

export default {
  data () {
    return {
      hunts: null,
      loading: true,
      huntGeojson: null,
      show: false,
      displayName: null,
      displayNameList: null,
      drawType: null,
      drawTypeList: null
    }
  },

  async created () {
    this.loading = true
    const { data } = await getHunts()
    this.hunts = data
    this.setLists()
    this.loading = false
  },

  mounted () {
    this.renderMap()
  },

  methods: {
    setLists () {
      const hunts = this.hunts

      const uniqueDisplayName = [...new Set(hunts.map(data => data.display_name))]
      this.displayNameList = uniqueDisplayName
    },
    filterSpecies () {
      const name = this.hunts.filter(data => (data.display_name === this.displayName))
      this.hunts = name
      const uniqueDrawType = [...new Set(this.hunts.map(data => data.draw_type))]
      this.drawTypeList = uniqueDrawType
      this.show = true
    },
    filterDrawType () {
      const drawType = this.hunts.filter(data => (data.draw_type === this.drawType))
      this.hunts = drawType
    },
    renderMap () {
      const map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/topo/style.json?key=BJ5Us337tUIPtCCZeKV8',
        center: [-116.6554, 39.3564],
        zoom: 6.5
      })

      map.on('load', async () => {
        await this.loadGeometry()

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
            'line-opacity': 0.6,
            'line-color': '#f29645',
            'line-width': 2
          }
        })

        map.addSource('huntgeoms', {
          type: 'geojson',
          data: this.huntGeojson
        })

        map.addLayer({
          id: 'hunt-units-fill',
          type: 'fill',
          source: 'huntgeoms',
          layout: {},
          paint: {
            'fill-color': '#2e598a',
            'fill-opacity': 0.7
          }
        })
      })
    },

    async loadGeometry () {
      const geom = await axios.get(
        'https://huntnv-api-mkvuv.ondigitalocean.app/features/hunts_with_geom/317.geobuf',
        {
          responseType: 'arraybuffer'
        })
      const geojson = geobuf.decode(new Pbf(geom.data))
      this.huntGeojson = geojson
    }
  }
}
</script>
