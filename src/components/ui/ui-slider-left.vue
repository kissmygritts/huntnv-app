<script setup>
defineProps({
  open: {
    type: Boolean,
    require: true
  },
  portal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<template>
  <transition
    enter-active-class="transform transition ease-in-out duration-1000 sm:duration-700"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition ease-in-out duration-1000 sm:duration-700"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <div
      v-show="open"
      :class="[
        portal ? 'lg:top-16 lg:bottom-0 lg:left-16' : 'lg:inset-y-0',
        'absolute flex max-w-full z-40 lg:z-10 inset-0 lg:inset-auto'
      ]"
    >
      <div class="w-screen lg:max-w-md">
        <div
          class="h-full flex flex-col py-6 bg-gray-100 shadow-xl overflow-y-scroll"
        >
          <div class="px-4">
            <div class="flex items-start justify-between">
              <div class="pr-4">
                <slot name="title">
                  <h2
                    class="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Panel title
                  </h2>
                </slot>
              </div>
              <div class="ml-3 h-7 flex items-center">
                <button
                  type="button"
                  class="bg-transparent rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="close"
                >
                  <span class="sr-only">Close panel</span>
                  <!-- Heroicon name: outline/x -->
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
          <div class="mt-6 relative flex-1 px-4">
            <div class="absolute inset-0 px-4">
              <slot name="content">
                <div
                  class="h-full border-2 border-dashed border-gray-200"
                  aria-hidden="true"
                ></div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
