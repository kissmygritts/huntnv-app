<template>
  <div v-if="results" class="uppercase">
    <h2 class="font-bold">Landownership Chart</h2>
    <pie-chart
      :data="results"
      :min="0"
      :max="1"
      xtitle="Precentage of owernship"
    />
  </div>
</template>

<script>
// see https://chartkick.com/vue
export default {
  name: 'landowner-bar-graph',
  props: ['results']
}
</script>
