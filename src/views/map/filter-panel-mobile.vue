<template>
  <transition
    enter-active-class="transition-all transform duration-500 ease-out"
    leave-active-class="transition-all transform duration-500 ease-in"
    enter-from-class="opacity-50 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-50 translate-y-full"
  >
    <div
      v-if="layout === 'filters'"
      class="absolute inset-0 bg-white z-50 flex flex-col overflow-hidden"
    >
      <!-- panel header -->
      <div class="bg-oxford-700 h-16 flex-shrink-0 z-10 shadow">
        <div class="flex h-full px-4 items-center justify-between">
          <h2 class="text-lg font-medium text-gray-100">Filters</h2>
          <div class="ml-3 h-7 flex items-center">
            <button
              type="button"
              class="bg-transparent rounded-md text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              @click="transitionLayout('close')"
            >
              <span class="sr-only">Close panel</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- panel body -->
      <div
        class="bg-gray-200 flex-grow flex flex-col p-2 space-y-2 overflow-y-auto"
      >
        <div class="bg-white rounded-md py-3 px-2">
          <filter-hunt-details />
        </div>
        <div class="bg-white rounded-md py-3 px-2">
          <filter-harvest-stats />
        </div>
        <div class="bg-white rounded-md py-3 px-2">
          <filter-draw-stats />
        </div>
      </div>

      <!-- panel footer -->
      <div class="bg-gray-200 h-16 flex-shrink-0 shadow-above z-10">
        <div class="flex items-center justify-end h-full px-2 space-x-3">
          <button
            class="text-sm text-gray-600 px-3 py-2 hover:text-red-500 hover:underline"
          >
            Reset Filters
          </button>
          <button
            class="bg-saffron-200/75 border border-saffron-600 text-saffron-800 rounded px-3 py-2 hover:bg-saffron-200/50"
            @click="transitionLayout('close')"
          >
            Filter Hunts
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import useMobileMenu from '../../composables/use-mobile-menu.js'

import FilterHuntDetails from './filter-hunt-details.vue'
import FilterHarvestStats from './filter-harvest-stats.vue'
import FilterDrawStats from './filter-draw-stats.vue'

const { layout, transitionLayout } = useMobileMenu()
</script>

<style scoped>
.shadow-above {
  box-shadow: 0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
