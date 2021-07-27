<template>
  <div
    class="block w-full p-2 my-2 bg-gray-50 text-gray-800 cursor-pointer hover:bg-olive-100 rounded-md shadow-md"
  >
    <h3 class="capitalize text-lg font-monospaced text-olive-800">{{ hunt.display_name }}</h3>
    <div class="text-gray-700 font-light capitalize">
      <!-- <div>
        <span>{{ hunt.weapon }}</span>
        <span class="mx-1 font-medium text-gray-600">&bull;</span>
        <span>{{ hunt.draw_type }}</span>
      </div>
      <div class="capitalize"><span class="font-normal">Season Dates:</span> {{ hunt.season_dates }}</div> -->
      <div><span class="font-normal">Hunt Units:</span> {{ hunt.hunt_units_arr.toString() }}</div>
      <div><span class="font-normal">Hunts:</span> {{ hunt.hunts.length }}</div>
      <mvHuntCardList
        v-for="hunt in hunt.hunts"
        :key="hunt.hunt_geometry_id"
        :hunt="hunt"
      />
    </div>
  </div>
</template>

<script>
import mvHuntCardList from './mv-hunt-card-list.vue'

export default {
  name: 'mv-hunt-card',
  components: { mvHuntCardList },
  props: {
    hunt: {
      type: Object,
      required: true
    }
  }
}
</script>
