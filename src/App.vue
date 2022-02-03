<template>
  <div class="h-screen flex bg-gray-200">
    <ndow-mobile-menu as="template" :navigation="navigation" />

    <!-- static sidebar for desktop -->
    <ndow-sidebar-nav as="template" :navigation="navigation" />

    <div class="flex-1 min-w-0 flex flex-col">
      <main class="flex-1 flex overflow-hidden">
        <router-view :key="$route.path" />
      </main>
    </div>
  </div>
</template>

<script>
import { GlobeIcon } from '@heroicons/vue/outline'
import NdowSidebarNav from './components/ndow-sidebar-nav.vue'
import NdowMobileMenu from './components/ndow-mobile-menu.vue'

const navigation = [{ name: 'Map', href: '/map', icon: GlobeIcon }]

export default {
  name: 'App',
  components: {
    NdowSidebarNav,
    NdowMobileMenu
  },
  setup() {
    return { navigation }
  }
}
</script>
