<template>
  <div class="bg-oxford-700 py-2 px-4 flex items-center justify-between sm:px-6 lg:px-8">
    <div>
      <img class="absolute top-2 left-4 h-20 w-auto z-20 shadow-logo" src="../assets/images/huntnv-logo_200x160.png" alt="Workflow" />
    </div>
    <div>
      <button
        type="button"
        class="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-oxford-700 rounded-md text-oxford-100 hover:bg-oxford-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-oxford-200"
        @click="toggleMenu()"
      >
        <span class="sr-only">Open sidebar</span>
        <MenuIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script>
import { MenuIcon } from '@heroicons/vue/outline'

export default {
  name: 'hnv-mobile-navbar',
  components: {
    MenuIcon
  },
  methods: {
    toggleMenu () {
      this.$emit('toggle-menu')
    }
  }
}
</script>

<style scoped>
  .shadow-logo {
    filter: drop-shadow(0 20px 5px rgb(0 0 0 / 0.1)) drop-shadow(0 8px 4px rgb(0 0 0 / 0.1));
  }
</style>
