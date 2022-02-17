<script setup>
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { MultiLineChart } from '../../lib/d3-charts.js'

const chart = ref(null)
const svg = ref(null)
const data = [
  {
    id: 731,
    hunt_year: 2019,
    n_applications: 334,
    n_fifth_choice_apps: 25,
    n_first_choice_apps: 102,
    n_third_choice_apps: 76,
    draw_difficulty_rank: 14,
    n_fourth_choice_apps: 41,
    n_second_choice_apps: 90,
    draw_difficulty_qtile: 2,
    n_successful_applications: 25,
    median_bp_of_successful_applications: 3
  },
  {
    id: 833,
    hunt_year: 2020,
    n_applications: 278,
    n_fifth_choice_apps: 17,
    n_first_choice_apps: 82,
    n_third_choice_apps: 58,
    draw_difficulty_rank: 12,
    n_fourth_choice_apps: 32,
    n_second_choice_apps: 89,
    draw_difficulty_qtile: 2,
    n_successful_applications: 30,
    median_bp_of_successful_applications: 3
  },
  {
    id: 2267,
    hunt_year: 2021,
    n_applications: 201,
    n_fifth_choice_apps: 22,
    n_first_choice_apps: 50,
    n_third_choice_apps: 45,
    draw_difficulty_rank: 19,
    n_fourth_choice_apps: 30,
    n_second_choice_apps: 54,
    draw_difficulty_qtile: 3,
    n_successful_applications: 25,
    median_bp_of_successful_applications: 4
  }
]

const tidyData = data
  .map((d) => {
    return [
      {
        hunt_year: d.hunt_year,
        metric: 'Apps',
        value: d.n_applications
      },
      {
        hunt_year: d.hunt_year,
        metric: 'Quota',
        value: d.n_successful_applications
      }
    ]
  })
  .flat()

useResizeObserver(chart, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect

  svg.value = MultiLineChart(tidyData, {
    x: (d) => d.hunt_year,
    y: (d) => d.value,
    z: (d) => d.metric,
    color: (z) => {
      const colors = {
        Apps: '#e57310',
        Quota: '#2e598a'
      }
      return colors[z]
    },
    xTitle: 'Hunt Year',
    yTitle: 'Applications',
    width: width,
    height: height
  })
})
</script>

<template>
  <div id="chart" class="h-full w-full bg-transparent" ref="chart" v-html="svg" />
</template>
