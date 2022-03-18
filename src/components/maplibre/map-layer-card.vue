<script setup>
const props = defineProps({
  mapLayer: { type: Object, required: true }
})
const emits = defineEmits(['activate'])

const activate = () => {
  emits('activate', props.mapLayer)
}
</script>

<template>
  <div
    :class="[
      'flex items-center bg-white p-2 rounded cursor-pointer',
      mapLayer.active ? 'border border-green-600' : ''
    ]"
    @click="activate"
  >
    <div class="mr-4 flex-shrink-0">
      <img
        class="h-16 w-16 rounded shadow-sm"
        :src="mapLayer.thumbnail"
        alt="map thumbnail"
      />
    </div>
    <div class="flex-grow">
      <h2 class="text-gray-800 font-medium capitalize">{{ mapLayer.name }}</h2>
      <p class="text-sm text-gray-600 font-light">{{ mapLayer.description }}</p>
    </div>
    <div
      class="w-10 h-10 ml-4 flex-shrink-0 flex items-center justify-center text-gray-400 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        :class="{ 'text-green-600': mapLayer.active }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  </div>
</template>
