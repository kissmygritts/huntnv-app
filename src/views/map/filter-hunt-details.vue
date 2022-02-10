<template>
  <div class="text-gray-600 space-y-6">
    <div>
      <h2 class="text-lg text-gray-800">Filter Hunt Choices</h2>
      <p class="font-light text-sm">
        Narrow your hunt choices by selecting a species, weapon and residency.
      </p>
    </div>

    <select-species v-model="store.feedFilters.species" />
    <radio-residency v-model="store.feedFilters.residency" />
    <radio-weapon v-model="store.feedFilters.weapon" />
    <slider-public-land v-model.number="store.feedFilters.publicLand" />

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
import SelectSpecies from '../../components/form-inputs/select-species.vue'
import RadioResidency from '../../components/form-inputs/radio-residency.vue'
import RadioWeapon from '../../components/form-inputs/radio-weapon.vue'
import SliderPublicLand from '../../components/form-inputs/slider-public-land.vue'
import { useHuntFeedStore } from '../../stores/hunt-feed.js'

const store = useHuntFeedStore()
</script>
