<template>
  <div style='max-width: 600px'>
    <vue3-chart-js v-bind='{ ...barChart }' />
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'App',
  components: {
    Vue3ChartJs
  },
  setup () {
    const barChart = {
      type: 'bar',
      options: {
        min: 0,
        max: 100,
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              callback: function (value) {
                return `${value}%`
              }
            }
          }
        }
      },
      data: {
        labels: ['BLM', 'Regional Admin', 'Private', 'BIA'],
        datasets: [
          {
            label: 'Ownership %',
            backgroundColor: ['#1abc9c', '#f1c40f', '#2980b9', '#34495e'],
            data: [81.43, 0, 18.52, 0.05]
          }
        ]
      }
    }

    return {
      barChart
    }
  }
}
</script>
