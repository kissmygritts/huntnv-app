<template>
  <router-link
      :to="{ name: 'HuntDetails', params: { id: hunt.id } }"
    >
    <div class="my-2 p-2 bg-oxford-200 bg-opacity-25 hover:bg-opacity-100 rounded-md">
      <div class="font-medium color-gray-400">
        {{ this.hunt.draw_type }} - {{ this.hunt.weapon }}
      </div>
      <div class="">
        {{this.hunt.season_dates}}
      </div>
      <div class="">
        Tags: {{ this.hunt.quota }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'mv-hunt-card-list',
  props: {
    hunt: {
      type: Array,
      required: true
    }
  }
}
</script>
