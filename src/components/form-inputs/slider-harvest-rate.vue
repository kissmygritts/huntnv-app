<template>
  <div class="w-100 mt-1">
    <div class="inline-flex items-center">
      <label class="inline-block ml-1 font-medium text-gray-700">
        Harvest Rate &#8805;
        <span class="text-saffron-600"
          >{{ Math.round(modelValue * 100) }}%</span
        >
      </label>
    </div>
    <div class="text-center">
      <input
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        type="range"
        min="0"
        max="1"
        step="0.01"
        class="slider"
      />
    </div>
    <div class="mt-2 px-1 text-sm text-gray-600 font-light">
      Filter hunts by the harvest success rate of the previous years hunt.
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<style scoped>
/* The slider itself */
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 97%; /* Full-width */
  height: 5px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

.slider:focus::-webkit-slider-thumb {
  border: 2px solid #ef7e1a;
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 1.5rem; /* Set a specific slider handle width */
  height: 1.5rem; /* Slider handle height */
  background: #ef7e1a; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 100%;
}

.slider::-moz-range-thumb {
  width: 1.5rem; /* Set a specific slider handle width */
  height: 1.5rem; /* Slider handle height */
  background: #ef7e1a; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 100%; /* Cursor on hover */
}
</style>
