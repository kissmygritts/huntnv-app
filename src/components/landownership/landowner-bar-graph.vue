<template>
  <div v-if="results" class="uppercase">
    <bar-chart
      :data="results"
      :min="0"
      :max="1"
      xtitle="Precentage of owernship"
    />
  </div>
  {{ results }}
</template>

<script>
// see https://chartkick.com/vue
export default {
  name: 'landowner-bar-graph',
  props: ['results'],
  methods: {
    run () {
      console.log(this.results)
    }
  },
  mounted () {
    this.run()
  }
}
</script>
