<script setup>
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { MultiLineChart } from '../../lib/d3-charts.js'

const chart = ref(null)
const svg = ref(null)

const props = defineProps({
  data: {
    type: Array,
    default() {
      return [
        { hunt_year: 2019, metric: 'Apps', value: 334 },
        { hunt_year: 2019, metric: 'Quota', value: 25 },
        { hunt_year: 2020, metric: 'Apps', value: 278 },
        { hunt_year: 2020, metric: 'Quota', value: 30 },
        { hunt_year: 2021, metric: 'Apps', value: 201 },
        { hunt_year: 2021, metric: 'Quota', value: 25 }
      ]
    }
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const defaultOptions = {
  x: (d) => d.hunt_year,
  y: (d) => d.value,
  z: (d) => d.metric,
  xTitle: 'Hunt Year',
  yTitle: 'Applications',
  width: 400,
  height: 200
}
const mergedOptions = Object.assign({ ...defaultOptions }, props.options)

useResizeObserver(chart, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  const options = Object.assign(
    { ...mergedOptions },
    { width: Math.floor(width), height: Math.floor(height) }
  )

  svg.value = MultiLineChart(props.data, options)
})
</script>

<template>
  <div
    id="chart"
    class="h-full w-full bg-transparent"
    ref="chart"
    v-html="svg"
  />
</template>
