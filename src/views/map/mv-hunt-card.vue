<template>
  <div class="w-full p-2 bg-gray-50 text-gray-800 cursor-pointer hover:bg-olive-100">
    <h2 class="capitalize">{{ hunt.display_name }}</h2>
    <div class="flex text-gray-700 font-light capitalize">
      <span>{{ hunt.draw_type }}</span>
      <span class="mx-1">&ndash;</span>
      <span>{{ hunt.weapon }}</span>
    </div>
    <div class="capitalize">Season Dates: {{ hunt.season_dates }}</div>
    <div>Hunt Units: {{ hunt.unit_group }}</div>
  </div>
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
