<script setup>
import UiSliderLeft from '../ui/ui-slider-left.vue'
import MapLayersCard from './map-layer-card.vue'

defineProps({
  open: {
    type: Boolean,
    required: true
  },
  portalSlider: {
    type: Boolean,
    default: false
  },
  basemaps: {
    type: Array,
    required: true
  },
  layers: {
    type: Array,
    required: true
  }
})
const emit = defineEmits([
  'panel:close',
  'layers:switch-basemap',
  'layers:toggle-layer'
])

const close = () => {
  emit('panel:close')
}
const switchBasemap = (payload) => {
  emit('layers:switch-basemap', payload)
}
const toggleLayer = (payload) => {
  emit('layers:toggle-layer', payload)
}
</script>

<template>
  <ui-slider-left :portal="portalSlider" :open="open" @close="close">
    <template #title>
      <h2>Layers and Basemaps</h2>
      <p class="text-sm font-light mt-1">
        Click any of the basemap or layers below to change the layers on the
        map. Only one basemap can be active at a time. Many layers can be added
        at once.
      </p>
    </template>

    <template #content>
      <div class="h-full space-y-8">
        <div>
          <h3 class="pl-1.5 text-lg text-gray-600">Layers</h3>
          <div class="mt-2 flex flex-col w-full space-y-1">
            <map-layers-card
              v-for="(layer, index) in layers"
              :key="index"
              :map-layer="layer"
              @activate="toggleLayer"
            />
          </div>
        </div>

        <div>
          <h3 class="pl-1.5 text-lg text-gray-600">Basemaps</h3>
          <div class="mt-2 flex flex-col w-full space-y-1">
            <map-layers-card
              v-for="(basemap, index) in basemaps"
              :key="index"
              :map-layer="basemap"
              @activate="switchBasemap"
            />
          </div>
        </div>
      </div>
    </template>
  </ui-slider-left>
</template>
