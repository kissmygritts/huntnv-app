<template>
  <div class="bg-white relative">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? 'text-saffron-700' : ''"
        class="relative inline-flex items-center p-2 border border-gray-300 text-gray-500 text-sm rounded group hover:text-saffron-600 hover:border-saffron-400 focus:outline-none focus:text-saffron-700 focus:ring-1 focus:ring-saffron-300 focus:border-saffron-400"
      >
        <slot name="label">Label</slot>
        <ChevronDownIcon
          :class="open ? 'rotate-180' : ''"
          class="w-4 h-4 ml-1 transform rotate-0 transition-transform duration-200"
          aria-hidden="true"
        />
        <span
          v-if="showBadge"
          class="absolute inline-flex items-center justify-center bg-saffron-500 h-3 w-3 text-xxs text-white font-bold rounded-full shadow -top-1 -right-1"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute z-10 w-screen max-w-sm px-4 mt-2 transform sm:px-0 right-0"
        >
          <div
            class="overflow-auto rounded shadow-xl ring-1 ring-gray-300 max-h-adj-vh"
          >
            <div class="relative grid gap-8 bg-white p-4">
              <slot name="content">Content goes here</slot>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

export default {
  name: 'filter-popover',
  components: { Popover, PopoverButton, PopoverPanel, ChevronDownIcon },

  props: {
    showBadge: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.max-h-adj-vh {
  max-height: calc(95vh - 5rem);
}
</style>
