<template>
  <div class="text-gray-600 space-y-6">
    <div>
      <h2 class="text-lg text-gray-800">Filter Hunt Choices</h2>
      <p class="font-light text-sm">
        Narrow your hunt choices based on the harvest and maturity rates from
        previous years hunts. Use the sliders below to define a percentage
        greater than or equal to the value.
      </p>
    </div>

    <slider-median-bp v-model.number="store.feedFilters.medianBp" />
    <slider-draw-qtile v-model.number="store.feedFilters.drawDifficulty" />
    <slider-draw-rank v-model.number="store.feedFilters.drawRank" />

    <div class="flex justify-end">
      <button
        type="button"
        class="text-sm font-light text-gray-600 hover:text-red-500 hover:underline"
        @click="store.clearFilters()"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import SliderDrawRank from '../../components/form-inputs/slider-draw-rank.vue'
import SliderDrawQtile from '../../components/form-inputs/slider-draw-qtile.vue'
import SliderMedianBp from '../../components/form-inputs/slider-median-bp.vue'
import { useHuntFeedStore } from '../../stores/hunt-feed.js'

const store = useHuntFeedStore()
</script>
