<template>
  <div class="block w-full p-2 my-4 bg-white rounded-lg">
    <h3 class="capitalize text-xl text-gray-600">{{ hunt.display_name }}</h3>

    <dl class="mt-2 pl-2 flex flex-wrap">
      <div class="w-1/2 flex flex-col sm:mt-0">
        <dt class="order-2 text-sm font-light text-gray-500">Public Land</dt>
        <dd class="order-1 text-gray-600 font-bold tracking-wide text-lg">
          {{ hunt.percent_public_land.toFixed(2) }}%
        </dd>
      </div>
      <div class="mt-2 w-full flex flex-col order-last">
        <dt class="order-2 text-sm font-light text-gray-500">Hunt Units</dt>
        <dd class="order-1 text-gray-600 font-bold tracking-wide text-lg">
          {{ hunt.hunt_units_arr.join(', ') }}
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

<script>
import HfHuntCardHuntList from './hf-hunt-card-hunt-list.vue'

export default {
  name: 'hunt-feed-hunt-card',
  components: {
    HfHuntCardHuntList
  },
  props: {
    hunt: {
      type: Object,
      required: true
    }
  }
}
</script>
