<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex flex-wrap">
      <h3 class="font-bold text-xl text-black uppercase">Landownership Data</h3>
      <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-gray-500 bg-white': openTab !== 1, 'text-white bg-gray-500': openTab === 1}">
                Table
            </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-gray-500 bg-white': openTab !== 2, 'text-white bg-gray-500': openTab === 2}">
                Chart
            </a>
            </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
                <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <landowner-table v-bind:hunt="hunt" />
                </div>
                <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <landowner-bar-graph v-bind:results="results"/>
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
  props: ['hunt', 'results'],
  components: {
    LandownerTable,
    LandownerBarGraph
  },
  data () {
    return {
      openTab: 1
    }
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    }
  }
}
</script>
