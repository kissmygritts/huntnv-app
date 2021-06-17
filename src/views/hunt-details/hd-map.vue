<template>
  <div class="h-2/5 m-10 p-10 rounded-lg bg-white shadow-lg">
    <!-- map area -->
    <section
      id="map"
      aria-labelledby="primary-heading"
      class="h-full"
    >
      map
    </section>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import { getHuntFeature } from '@/services/hunt-services.js'

export default {
  data () {
    return {
      geojson: {
        type: Object
      },
      loading: true
    }
  },

  async created () {
    this.loading = true
    const { data } = await getHuntFeature()
    this.geojson = data
    this.loading = false
  },

  mounted () {
    this.renderMap()
  },

  methods: {
    renderMap () {
      const map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/topo/style.json?key=BJ5Us337tUIPtCCZeKV8',
        center: [-118, 41.2],
        zoom: 7
      })

      this.map = map

      map.on('load', () => {
        map.addSource('maine', {
          type: 'geojson',
          data: this.geojson
        })
        map.addLayer({
          id: 'maine',
          type: 'fill',
          source: 'maine',
          layout: {},
          paint: {
            'fill-color': '#088',
            'fill-opacity': 0.8
          }
        })

        // When a click event occurs on a feature in the states layer, open a popup at the
        // location of the click, with description HTML from its properties.
        map.on('click', 'maine', function (e) {
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.unit_group)
            .addTo(map)
        })
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'maine', function () {
          map.getCanvas().style.cursor = 'pointer'
        })
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'maine', function () {
          map.getCanvas().style.cursor = ''
        })
      })
    }
  }
}
</script>
