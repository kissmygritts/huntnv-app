<template>
  <div class="lg:hidden flex-shrink-0 flex h-16 px-2 bg-oxford-900 shadow">
    <div class="flex flex-1 items-center h-full space-x-4">
      <div class="flex-none flex items-center lg:hidden">
        <button
          type="button"
          class="flex-shrink-0 bg-transparent shadow-lg border-2 border-gray-200/25 rounded p-2 text-gray-100 hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-200"
          @click="open()"
        >
          <span class="sr-only">Open mobile navigation menu</span>
          <menu-alt4-icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div class="flex-1">
        <h1 class="text-xl text-gray-200">HuntNV</h1>
      </div>

      <div class="flex-none flex items-center">
        <router-link
          class="flex-shrink-0 bg-transparent shadow-lg border-2 border-gray-200/25 rounded p-2 text-gray-100 hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-200"
          to="/map"
        >
          <span class="sr-only">Open mobile navigation menu</span>
          <map-icon class="h-6 w-6" aria-hidden="true" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { MenuAlt4Icon, MapIcon } from '@heroicons/vue/outline'
import useMobileMenu from '../composables/use-mobile-menu.js'

export default {
  name: 'ndow-mobile-navbar',
  components: {
    MenuAlt4Icon,
    MapIcon
  },
  setup() {
    const { open } = useMobileMenu()

    return {
      open
    }
  }
}
</script>
