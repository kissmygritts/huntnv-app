<template>
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex flex-col w-20">
      <div class="flex flex-col h-0 flex-1 overflow-y-auto bg-oxford-700">
        <div class="flex-1 flex flex-col">
          <div class="flex-shrink-0 bg-oxford-900 py-4 flex items-center justify-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow" />
          </div>
          <nav aria-label="Sidebar" class="py-6 px-2 flex flex-col items-center space-y-3">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group w-full p-3 rounded-lg flex flex-col items-center text-xs text-oxford-100 hover:bg-oxford-600"
              :class="[ item.href === '#' ? 'cursor-not-allowed' : '' ]"
            >
              <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
              <p class="mt-1">{{ item.name }}</p>
            </router-link>
          </nav>
        </div>
        <div class="flex-shrink-0 flex pb-5" title="ndow.org">
          <a href="http://ndow.org" class="flex-shrink-0 w-full" target="_blank" rel="noreferrer noopener">
            <img class="block mx-auto h-20 w-20" src="@/assets/images/ndow-logo.png" alt="to ndow.org website" />
            <div class="sr-only">
              <p>
                To ndow.org website
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hnv-sidebar-nav',
  props: {
    navigation: Array,
    user: Object
  }
}
</script>
