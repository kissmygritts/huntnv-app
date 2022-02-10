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

    <slider-harvest-rate v-model.number="store.feedFilters.harvestRate" />
    <slider-maturity-rate v-model.number="store.feedFilters.maturityRate" />

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
import SliderHarvestRate from '../../components/form-inputs/slider-harvest-rate.vue'
import SliderMaturityRate from '../../components/form-inputs/slider-maturity-rate.vue'
import { useHuntFeedStore } from '../../stores/hunt-feed.js'

const store = useHuntFeedStore()
</script>
