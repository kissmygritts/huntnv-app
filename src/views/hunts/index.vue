<template>
  <div class="w-full overflow-y-auto">
    <h1 class="font-bold text-xl">Hunts</h1>
    <p v-if="loading">LOADING...</p>
    <div class="">
      <div v-for="hunt in hunts" :key="hunt.id" :hunt="hunt" class="">
        <router-link :to="{ name: 'HuntDetails', params: { id: hunt.id }}">
          <div class="flex m-10">
            <h2 class="font-medium capitalize">
              {{ hunt.display_name }}
            </h2>
            <div class="text-gray-700 font-light capitalize">
              <span>{{ hunt.draw_type }}</span>
              <span class="mx-1">&ndash;</span>
              <span>{{ hunt.weapon }}</span>
            </div>
            <div class="capitalize">Season Dates: {{ hunt.season_dates }}</div>
            <div class="capitalize">Hunt Units: {{ hunt.unit_group }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getHunts } from '@/services/hunt-services.js'

export default {
  name: 'Hunts',
  data () {
    return {
      loading: false,
      hunts: null
    }
  },
  async created () {
    this.loading = true
    const { data } = await getHunts()
    this.hunts = data
    this.loading = false
  }
}
</script>
