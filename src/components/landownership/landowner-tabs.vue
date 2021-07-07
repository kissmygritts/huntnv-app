<template>
  <div class="bg-gray-50 p-4">
    <div class="flex flex-wrap">
      <h3 class="font-medium text-xl tracking-wider text-gray-800 uppercase">Landownership Data</h3>
      <div class="w-full">
        <div class="p-4">
          <ul class="flex mb-0 list-none flex-wrap py-2 flex-row">
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 rounded block leading-normal"
                  v-on:click="toggleTabs(1)"
                  :class="{'text-gray-500 bg-gray-200': openTab !== 1, 'text-white bg-gray-500': openTab === 1}"
                >
                    Table
                </a>
              </li>
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold uppercase px-5 py-3 rounded block leading-normal" v-on:click="toggleTabs(2)" :class="{'text-gray-500 bg-gray-200': openTab !== 2, 'text-white bg-gray-500': openTab === 2}">
                    Chart
                </a>
              </li>
          </ul>
        </div>
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded overflow-x-scroll">
          <div class="flex-auto">
            <div class="tab-content tab-space">
                <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                  <landowner-table :landownership="plo" />
                </div>
                <div :class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                  <landowner-bar-graph :results="plo"/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import vue components
import LandownerTable from '@/components/landownership/landowner-table.vue'
import LandownerBarGraph from '@/components/landownership/landowner-bar-graph.vue'

export default {
  name: 'landower-tabs',
  props: {
    landownership: {
      type: Array
    }
  },
  components: {
    LandownerTable,
    LandownerBarGraph
  },
  data () {
    return {
      openTab: 1
    }
  },
  computed: {
    plo () {
      const plo = this.landownership.map(item => {
        const area = (item.area / 2590000).toFixed(0)
        const coverage = (item.coverage * 100).toFixed(2)

        return {
          surface_mgmt_agency: item.surface_mgmt_agency,
          area,
          coverage
        }
      })

      plo.sort((a, b) => b.coverage - a.coverage)
      return plo
    }
  },
  methods: {
    toggleTabs (tabNumber) {
      this.openTab = tabNumber
    }
  }
}
</script>
