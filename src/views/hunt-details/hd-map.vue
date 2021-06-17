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
import { getHunts } from '@/services/hunt-services.js'

export default {
  data () {
    return {
      hunts: null,
      loading: true
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
        style: 'https://api.maptiler.com/maps/topo/style.json?key=BJ5Us337tUIPtCCZeKV8',
        center: [-117, 39],
        zoom: 4
      })

      this.map = map
    }
  }
}
</script>
