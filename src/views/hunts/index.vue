<template>
  <div class="bg-gray-200 w-full overflow-y-auto">
    <div v-if="hunts" class="p-10">
      <h1 class="font-bold text-3xl">Hunts ({{ huntsCount }})</h1>
      <div>
        <p v-if="loading">LOADING...</p>
        <div v-for="hunt in hunts" :key="hunt.id" :hunt="hunt">
          <router-link :to="{ name: 'HuntDetails', params: { id: hunt.id }}">
            <div class="bg-oxford-700 hover:bg-oxford-500 my-10 p-10 text-white rounded-md">
              <h2 class="font-bold capitalize">
                {{ hunt.display_name }}
              </h2>
              <div class="font-light capitalize">
                <span>{{ hunt.draw_type }}</span>
                <span class="mx-1">&ndash;</span>
                <span>{{ hunt.weapon }}</span>
              </div>
              <div class="flex font-thin">
                <div class="pr-5 capitalize">Season Dates: {{ hunt.season_dates }}</div>
                <div class="pr-5 capitalize">Hunt Units: {{ hunt.unit_group }}</div>
                <div class="pr-5 capitalize">Quota: {{ hunt.quota }}</div>
                <div>Public Land: 50%</div>
              </div>
            </div>
          </router-link>
        </div>
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
  computed: {
    huntsCount () {
      const count = this.hunts.length
      return count
    }
  },
  async created () {
    this.loading = true
    const { data } = await getHunts()
    this.hunts = data.filter(data => (data.species === 'mule deer'))
    this.loading = false
  }
}
</script>
