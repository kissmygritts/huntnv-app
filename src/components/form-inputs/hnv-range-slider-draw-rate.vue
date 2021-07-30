<template>
  <div class="w-100 mt-1">
    <div class="inline-flex items-center font-medium text-gray-700">
      <label
        class="inline-block ml-1"
        for="myRange"
      >
          Draw Rate: {{ formatRange }}%
      </label>
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
        id="myRange"
      >
    </div>
    <div class="mt-2 px-1 text-sm text-gray-600 font-light">
      Draw rate is available tags divided by total applications.
    </div>
  </div>
</template>

<script>
export default {
  name: 'hnv-range-slider-draw-rate',
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

<style scoped>
/* The slider itself */
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 97%; /* Full-width */
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
  width: 1.5rem; /* Set a specific slider handle width */
  height: 1.5rem; /* Slider handle height */
  background: #7a9e7f; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 100%; /* Cursor on hover */
}
</style>
