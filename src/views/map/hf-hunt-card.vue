<template>
  <div class="block w-full p-2 mb-4 bg-white rounded-lg">
    <h3 class="capitalize text-xl text-gray-600">{{ hunt.display_name }}</h3>

    <dl class="mt-2 pl-2 flex flex-wrap space-y-2">
      <div class="w-full flex flex-col order-first">
        <dt class="order-2 text-sm font-light text-gray-500">Hunt Units</dt>
        <dd class="order-1 text-gray-600 font-bold tracking-wide text-lg">
          {{ hunt.hunt_units_arr.join(', ') }}
        </dd>
      </div>
      <div class="w-1/2 flex flex-col sm:mt-0">
        <dt class="order-2 text-sm font-light text-gray-500">Public Land</dt>
        <dd class="order-1 text-gray-600 font-bold tracking-wide text-lg">
          {{ hunt.percent_public_land.toFixed(1) }}%
        </dd>
      </div>
      <div class="w-1/2 flex flex-col sm:mt-0">
        <dt class="order-2 text-sm font-light text-gray-500">Total Hunts</dt>
        <dd class="order-1 text-gray-600 font-bold tracking-wide text-lg">
          {{ hunt.total_hunts }}
        </dd>
      </div>
    </dl>

    <div class="mt-4 space-y-1.5 overflow-hidden rounded-md">
      <hf-hunt-card-hunt-list
        v-for="hunt in hunt.hunts"
        :key="hunt.id"
        :hunt="hunt"
      />
    </div>
  </div>
</template>

<script setup>
import HfHuntCardHuntList from './hf-hunt-card-hunt-list.vue'
defineProps({
  hunt: { type: Object, required: true }
})
</script>
