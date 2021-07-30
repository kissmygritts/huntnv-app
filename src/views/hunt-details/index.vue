<template>
  <div
    v-if="hunt"
    class="w-full p-8 overflow-y-auto"
  >
    <div class="grid grid-cols-3 gap-4">
      <hd-header
        :hunt="hunt"
        class="col-span-3 shadow-md rounded-md"
      />
      <hd-map
        :hunt-units-arr="hunt.hunt_units_arr"
        :bounds="hunt.bounds"
        class="h-96 lg:h-144 col-span-3 lg:col-span-2 shadow-md rounded-md"
      />
      <landowner-tabs
        :landownership="hunt.landownership"
        class="col-span-3 lg:col-span-1 shadow-md rounded-md"
      />
      <hd-similar-hunts-table
        :hunt="hunt"
        class="col-span-3 shadow-md rounded-md"
      />
    </div>
  </div>
</template>

<script>
import HdHeader from '@/views/hunt-details/hd-header.vue'
import HdMap from '@/views/hunt-details/hd-map.vue'
import LandownerTabs from '@/components/landownership/landowner-tabs.vue'
import HdSimilarHuntsTable from '@/views/hunt-details/hd-similar-hunts-table.vue'
import { getHunt } from '@/services/hunt-services.js'

export default {
  components: {
    LandownerTabs,
    HdSimilarHuntsTable,
    HdMap,
    HdHeader
  },
  props: ['id'],
  data () {
    return {
      hunt: null
    }
  },
  async created () {
    const hunt = await getHunt(this.id)
    this.hunt = hunt.data
  }
}
</script>
