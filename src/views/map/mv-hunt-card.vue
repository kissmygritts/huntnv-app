<template>
  <router-link
    :to="{ name: 'HuntDetails', params: { id: hunt.id } }"
    class="block w-full p-2 bg-gray-50 text-gray-800 cursor-pointer hover:bg-olive-100"
  >
    <h3 class="capitalize text-lg font-monospaced text-olive-800">{{ hunt.display_name }}</h3>
    <div class="text-gray-700 font-light capitalize">
      <div>
        <span>{{ hunt.weapon }}</span>
        <span class="mx-1 font-medium text-gray-600">&bull;</span>
        <span>{{ hunt.draw_type }}</span>
      </div>
      <div class="capitalize"><span class="font-normal">Season Dates:</span> {{ hunt.season_dates }}</div>
      <div><span class="font-normal">Hunt Units:</span> {{ hunt.unit_group }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'mv-hunt-card',
  props: {
    hunt: {
      type: Object,
      required: true
    }
  }
}
</script>
