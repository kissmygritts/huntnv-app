<template>
  <div class="w-100">
    <div class="flex">
      <label
        class="block ml-1 font-medium text-gray-700"
        for="myRange"
      >
        Success Rate: {{ formatRange }}%
      </label>
      <InformationCircleIcon
        class="flex-shrink-0 mt-1 ml-2 h-5 w-5 text-gray-400"
        aria-hidden="true"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      />
    </div>
    <div class="text-center">
      <input
        v-model="range"
        @change="$emit('update:modelValue', range)"
        type="range"
        min="0"
        max="1"
        step="0.01"
        class="slider"
        id="myRange">
    </div>
    <div
      v-show="hover"
      class="p-4 text-sm"
    >
      The <b>success rate</b> is the number of reported successful hunts divided by the total number of assigned tags.
    </div>
  </div>
</template>

<script>
import { InformationCircleIcon } from '@heroicons/vue/outline'

export default {
  name: 'hnv-range-slider-draw-rate',
  components: {
    InformationCircleIcon
  },
  data () {
    return {
      range: 0,
      hover: false
    }
  },
  computed: {
    formatRange () {
      const formattedRange = (this.range * 100).toFixed(0)
      return formattedRange
    }
  },
  methods: {
    resetRange (value) {
      this.range = value
    }
  }
}
</script>

<style>
/* The slider itself */
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 98%; /* Full-width */
  height: 5px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

.slider:focus::-webkit-slider-thumb {
  border: 2px solid #7a9e7f;
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 1.5rem; /* Set a specific slider handle width */
  height: 1.5rem; /* Slider handle height */
  background: #7a9e7f; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 100%;
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #7a9e7f; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
