<template>
  <div
    style="z-index: 1001;"
    class="absolute bottom-0 right-0 p-8 border-gray-400"
  >
    <div class="flex flex-col items-center">
      <!-- menu open options -->
      <transition
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div v-if="menuVisible" class="flex flex-col items-center mb-3">
          <button
            class="bg-olive-500 text-white mb-2 p-2 w-10 h-10 rounded-full shadow-xl hover:bg-olive-700"
            title="geolocate"
            @click="emitGeolocate()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </button>

          <button
            class="bg-olive-500 text-white mb-2 p-2 w-10 h-10 rounded-full shadow-xl hover:bg-olive-700"
            title="layers and overlays"
            @click="emitOpenLayers()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>

          <button
            class="bg-olive-500 text-white p-2 w-10 h-10 rounded-full shadow-xl hover:bg-olive-700"
            title="add marker"
            @click="emitAddMarker()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </transition>

      <!-- open menu button -->
      <button
        v-if="!menuVisible"
        class="bg-olive-500 text-white p-3 w-14 h-14 rounded-full shadow-xl hover:bg-olive-700"
        @click="toggleMenu()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      <button
        v-else
        class="bg-olive-500 text-white p-3 w-14 h-14 rounded-full shadow-xl hover:bg-olive-700"
        @click="toggleMenu()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapMenuButton',
  data () {
    return {
      menuVisible: false
    }
  },
  methods: {
    emitAddMarker () { this.$emit('map:add-marker') },
    emitGeolocate () { this.$emit('map:geolocate') },
    emitOpenLayers () { this.$emit('map:open-layers') },
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style>
</style>
