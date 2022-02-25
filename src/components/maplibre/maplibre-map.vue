<script setup>
import { ref, onMounted, nextTick } from 'vue'
import MapMenuButton from './map-menu-button.vue'
import MapLayerPanel from './map-layer-panel.vue'
import { renderMaplibre } from '../../lib/maplibre.js'
import {
  basemaps as styles,
  layers as overlays
} from '../../lib/maplibre-layers.js'

defineProps({
  portalSlider: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['map:ready', 'map:moveend'])

const root = ref(null)
const map = ref(null)
const ready = ref(false)
const basemaps = ref(styles)
const layers = ref(overlays)

defineExpose({ map, layers })

onMounted(() => {
  const options = {
    container: root.value,
    center: [-116.6554, 38.55],
    zoom: 5.75
  }
  map.value = renderMaplibre(options, layers.value)
  ready.value = true

  nextTick(() => {
    emit('map:ready')

    map.value.on('moveend', () => {
      const center = map.value.getCenter()
      const zoom = map.value.getZoom()
      const bounds = map.value.getBounds()
      emit('map:moveend', { z: zoom, x: center.lng, y: center.lat, bounds })
    })
  })
})

// map menu function
// map layer slider panel
const sliderOpen = ref(false)
const toggleSlider = () => {
  sliderOpen.value = !sliderOpen.value
}

const setBasemap = (payload) => {
  map.value.setStyle(payload.style)
  basemaps.value.forEach(
    (basemap) => (basemap.active = payload.name === basemap.name)
  )
}

const toggleLayer = (payload) => {
  layers.value.forEach((def) => {
    if (def.name === payload.name) {
      def.active = !def.active
      const layerIds = def.layers.map((layer) => layer.id)
      layerIds.forEach((id, i) => {
        const visibility = def.active ? 'visible' : 'none'
        map.value.setLayoutProperty(id, 'visibility', visibility)
        def.layers[i].layout.visibility = visibility
      })
    }
  })
}
</script>

<template>
  <div id="maplibre-map" ref="root" class="relative w-full h-full">
    <map-menu-button @click:layers="toggleSlider" />
  </div>
  <map-layer-panel
    :open="sliderOpen"
    :portal-slider="portalSlider"
    :basemaps="basemaps"
    :layers="layers"
    @panel:close="toggleSlider"
    @layers:switch-basemap="setBasemap"
    @layers:toggle-layer="toggleLayer"
  />
</template>
