<template>
  <section
    id="map"
    aria-labelledby="primary-heading"
    class="min-w-0 flex-1 h-3/6 flex flex-col overflow-hidden lg:order-last bg-olive-200"
  >
    <h1 id="primary-heading" class="sr-only">Map</h1>
    map
  </section>
</template>

<script>
import maplibregl from 'maplibre-gl'

export default {
  name: 'hd-map',
  props: ['geojson'],
  mounted () {
    this.renderMap()
  },
  methods: {
    renderMap () {
      const map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/topo/style.json?key=BJ5Us337tUIPtCCZeKV8',
        center: [-117, 39],
        zoom: 5
      })

      this.map = map

      map.on('load', () => {
        // Set the data source to the geojson passed in by props
        map.addSource('hunt', {
          type: 'geojson',
          data: this.geojson
        })
        // Add hunt geometry to map
        map.addLayer({
          id: 'huntLayer',
          type: 'fill',
          source: 'hunt',
          layout: {},
          paint: {
            'fill-color': '#088',
            'fill-opacity': 0.8
          }
        })
        // On click create popup at cursor location
        map.on('click', 'huntLayer', function (e) {
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.unit_group)
            .addTo(map)
        })
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'huntLayer', function () {
          map.getCanvas().style.cursor = 'pointer'
        })
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'huntLayer', function () {
          map.getCanvas().style.cursor = ''
        })
      })
    }
  }
}
</script>
