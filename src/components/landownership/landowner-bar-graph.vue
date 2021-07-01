<template>
  <div v-if="results" class="uppercase">
    <bar-chart
      :data="graphData"
      :min="0"
      :max="100"
      xtitle="Precentage of owernship"
    />
  </div>
</template>

<script>
// see https://chartkick.com/vue
export default {
  name: 'landowner-bar-graph',
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  computed: {
    graphData () {
      return this.results.reduce((prev, curr) => {
        const { surface_mgmt_agency: agency, coverage } = curr
        return [...prev, [agency, Number(coverage)]]
      }, [])
    }
  }
}
</script>
