<template>
  <div
    class="block w-full p-2 my-4 bg-white text-gray-700 hover:bg-olive-100 rounded-md shadow-md"
  >
    <h3 class="capitalize text-xl text-olive-700">{{ hunt.display_name }}</h3>

    <dl class="mt-2 pl-2 flex flex-wrap">
      <div class="mt-2 w-full flex flex-col order-last">
        <dt class="order-2 text-sm font-light text-gray-500">
          Hunt Units
        </dt>
        <dd class="order-1 text-olive-600 font-bold tracking-wide text-lg">
          {{ formatHuntUnitArr }}
        </dd>
      </div>
      <div class="w-1/2 flex flex-col sm:mt-0">
        <dt class="order-2 text-sm font-light text-gray-500">
          Total Hunts
        </dt>
        <dd class="order-1 text-olive-600 font-bold tracking-wide text-lg">
          {{ hunt.total_hunts }}
        </dd>
      </div>
      <div class="w-1/2 flex flex-col sm:mt-0">
        <dt class="order-2 text-sm font-light text-gray-500">
          Public Land
        </dt>
        <dd class="order-1 text-olive-600 font-bold tracking-wide text-lg">
          {{ (hunt.public_land_pct * 100).toFixed(2) }}%
        </dd>
      </div>
    </dl>

    <div class="mt-4 divide-y-2 divide-olive-200 overflow-hidden rounded-md">
      <mv-hunt-card-hunts-list
        v-for="hunt in hunt.hunts"
        :key="hunt.id"
        :hunt="hunt"
      />
    </div>
  </div>
</template>

<script>
import mvHuntCardHuntsList from './mv-hunt-card-hunts-list.vue'

export default {
  name: 'mv-hunts-container-card',
  components: { mvHuntCardHuntsList },
  props: {
    hunt: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatHuntUnitArr () {
      const formattedUnits = this.hunt.hunt_units_arr.join(', ')
      return formattedUnits
    }
  }
}
</script>
