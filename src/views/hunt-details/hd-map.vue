<template>
  <section
    id="map"
    aria-labelledby="primary-heading"
    class=" bg-olive-200 rounded-md shadow-md"
  >
    <h1
      id="primary-heading"
      class="sr-only"
    >
      Map
    </h1>
    map
  </section>
</template>

<script>
import maplibregl from 'maplibre-gl'
const TILE_URL = process.env.VUE_APP_API_URL
const MAPTILER_KEY = process.env.VUE_APP_MAPTILER_KEY

export default {
  name: 'hd-map',
  props: ['huntUnitsArr', 'bounds'],
  data () {
    return {
      huntUnits: []
    }
  },
  mounted () {
    this.renderMap()
  },
  methods: {
    renderMap () {
      const map = new maplibregl.Map({
        container: 'map',
        style: `https://api.maptiler.com/maps/voyager/style.json?key=${MAPTILER_KEY}`,
        center: [-117, 39],
        zoom: 6
      })

      this.map = map
      map.addControl(new maplibregl.FullscreenControl())

      map.on('load', () => {
        // public landownership layers
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
          filter: ['==', 'surface_mgmt_agency', 'Bureau of Land Management']
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
          filter: ['==', 'surface_mgmt_agency', 'Bureau of Land Management']
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

        // add hunt units as vector tile layer
        // unit boundaries
        map.addSource('units', {
          type: 'vector',
          tiles: [`${TILE_URL}/features/hunt_units_open_full/{z}/{x}/{y}.pbf`]
        })

        // hunt unit filled and colored
        map.addLayer({
          id: 'units-fill',
          type: 'fill',
          source: 'units',
          'source-layer': 'hunt_units_open_full',
          paint: {
            'fill-color': '#2e598a',
            'fill-opacity': 0.25
          },
          filter: ['in', 'display_name', ...this.huntUnitsArr]
        })

        // boundary
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

        // unit labels
        map.addSource('unit-labels', {
          type: 'vector',
          tiles: [`${TILE_URL}/features/hunt_unit_labels/{z}/{x}/{y}.pbf`]
        })
        map.addLayer({
          id: 'unit-labels',
          type: 'symbol',
          source: 'unit-labels',
          'source-layer': 'hunt_unit_labels',
          layout: {
            'text-font': ['Open Sans Regular'],
            'text-field': ['get', 'display_name'],
            'text-size': 16
          },
          paint: {
            'text-color': '#db6f0f',
            'text-halo-color': 'white',
            'text-halo-width': 1,
            'text-halo-blur': 1
          }
        })

        // zoom to bounds of geometry
        if (this.bounds) {
          const bounds = new maplibregl.LngLatBounds(this.bounds.sw, this.bounds.ne)
          map.fitBounds(bounds, { padding: 20 })
        }
      })
    }
  }
}
</script>
