<template>
  <router-link
      :to="{ name: 'HuntDetails', params: { id: hunt.id } }"
    >
    <div class="my-2 p-2 bg-oxford-200 bg-opacity-25 hover:bg-opacity-100 rounded-md">
      <div v-if="newHunt" class="text-saffron-600 font-medium">
        New 2021 Hunt
      </div>
      <div class="py-1 font-medium color-gray-400">
        {{ this.hunt.draw_type }} - {{ this.hunt.weapon }}
      </div>
      <div class="text-sm">
        {{ this.hunt.season_dates }}
      </div>
      <div class="text-sm">
        Tags: {{ this.hunt.quota }} | Draw: {{ (this.hunt.draw_rate * 100).toFixed(2) }} % | Success: {{ (this.hunt.success_rate * 100).toFixed(2) }}%
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'mv-hunt-card-list',
  props: {
    hunt: null
  },
  data () {
    return {
      newHunt: false
    }
  },
  created () {
    this.isNewHunt()
  },
  methods: {
    isNewHunt () {
      if (this.hunt.draw_rate === null) {
        this.newHunt = true
      }
    }
  }

}
</script>
