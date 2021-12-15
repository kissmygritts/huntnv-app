<template>
  <TransitionRoot as="template" :show="mobileMenuOpen">
    <Dialog as="div" static class="fixed inset-0 flex z-40 lg:hidden" :open="mobileMenuOpen">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
        <div class="relative flex-1 flex flex-col justify-between max-w-xs w-full bg-gray-100 focus:outline-none">
          <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="absolute top-0 right-0 -mr-12 pt-4">
              <button
                type="button"
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="toggleMenu"
              >
                <span class="sr-only">Close sidebar</span>
                <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </TransitionChild>
          <div class="pt-2 pb-4">
            <div class="flex-shrink-0 flex items-end px-4">
              <img class="h-20 w-auto" src="../assets/images/huntnv-logo_200x160.png" alt="HuntNV" />
              <h1 class="text-saffron-600 text-xl font-semibold tracking-wider -ml-2">HuntNV</h1>
            </div>
            <nav aria-label="Sidebar" class="mt-5">
              <div class="px-2 space-y-1">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="group p-2 rounded-md flex items-center text-base font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-saffron-600"
                  :class="[ item.href === '#' ? 'cursor-not-allowed' : '' ]"
                >
                  <component :is="item.icon" class="mr-4 h-6 w-6 text-gray-400 group-hover:text-saffron-600" aria-hidden="true" />
                  {{ item.name }}
                </router-link>
              </div>
            </nav>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center border-t border-gray-200 p-4">
            <a href="http://www.ndow.org" class="flex-shrink-0 group block rounded-md focus:ring-2 focus:ring-saffron-600" alt="to ndow.org website" target="_blank" rel="noreferrer noopener">
              <div class="flex items-center">
                <div>
                  <img class="inline-block h-20 w-20" src="@/assets/images/ndow-logo.png" alt="" />
                </div>
                <div class="ml-3">
                  <p class="text-base font-medium text-gray-700 group-hover:text-gray-900 sr-only">
                    NDOW.org
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'

export default {
  name: 'hnv-mobile-menu',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon
  },
  props: {
    navigation: Array,
    user: Object,
    mobileMenuOpen: Boolean
  },
  methods: {
    toggleMenu () {
      this.$emit('toggle-menu')
    }
  }
}
</script>
