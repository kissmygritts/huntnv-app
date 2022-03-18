<script setup>
import { ref } from 'vue'

const emit = defineEmits(['click:faq', 'click:recenter', 'click:layers'])

const menuVisible = ref(false)
const toggle = () => {
  menuVisible.value = !menuVisible.value
}

const recenter = () => emit('click:recenter')
const layers = () => emit('click:layers')
const faq = () => emit('click:faq')
</script>

<template>
  <div class="absolute z-10 bottom-5 right-5 flex flex-col items-center">
    <div
      class="absolute bottom-0 h-64 w-10 flex flex-col justify-end pb-20 space-y-2"
    >
      <transition
        enter-active-class="transition-all transform duration-200 ease-in-out delay-300"
        leave-active-class="transition-all transform duration-200 ease-in-out"
        enter-from-class="opacity-0 translate-y-full"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-full"
      >
        <button
          v-show="menuVisible & ($route.name === 'map')"
          class="bg-saffron-600 text-white p-2 w-10 h-10 rounded-full shadow-xl hover:bg-saffron-500"
          @click="faq"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </transition>

      <transition
        enter-active-class="transition-all transform duration-200 ease-in-out delay-150"
        leave-active-class="transition-all transform duration-200 ease-in-out delay-150"
        enter-from-class="opacity-0 translate-y-full"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-full"
      >
        <button
          v-show="menuVisible"
          class="bg-saffron-600 text-white p-2 w-10 h-10 rounded-full shadow-xl hover:bg-saffron-500"
          @click="recenter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      </transition>

      <transition
        enter-active-class="transition-all transform duration-200 ease-in-out"
        leave-active-class="transition-all transform duration-200 ease-in-out delay-300"
        enter-from-class="opacity-0 translate-y-full"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-full"
      >
        <button
          v-show="menuVisible"
          class="bg-saffron-600 text-white p-2 w-10 h-10 rounded-full shadow-xl hover:bg-saffron-500"
          @click="layers"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 100 100"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M 50.048828,9.5098049 A 4.725134,2.5930375 0 0 0 46.658203,10.269571 L 1.3828123,35.115274 a 4.725134,2.5930375 0 0 0 0,3.667969 L 46.658203,63.628946 a 4.725134,2.5930375 0 0 0 6.683594,0 L 98.617188,38.783243 a 4.725134,2.5930375 0 0 0 0,-3.667969 L 53.341797,10.269571 A 4.725134,2.5930375 0 0 0 50.048828,9.5098049 Z M 50,15.769571 88.595703,36.949258 50,58.128946 11.40625,36.949258 Z m -45.2734377,30.5625 -3.34375,1.833984 a 4.725134,2.5930375 0 0 0 0,3.667969 L 46.658203,76.679727 a 4.725134,2.5930375 0 0 0 6.683594,0 L 98.617188,51.834024 a 4.725134,2.5930375 0 0 0 -0.002,-3.667969 l -3.341796,-1.833984 -6.683594,3.666016 0.0039,0.002 L 50,71.179727 11.404297,50.00004 l 0.0039,-0.002 z m 0,13.050781 -3.34375,1.833985 a 4.725134,2.5930375 0 0 0 0,3.667968 L 46.658203,89.730508 a 4.725134,2.5930375 0 0 0 6.683594,0 L 98.617188,64.884805 a 4.725134,2.5930375 0 0 0 -0.002,-3.667968 l -3.341796,-1.833985 -6.683594,3.666016 0.0039,0.002 L 50,84.230508 11.404297,63.050821 l 0.0039,-0.002 z"
            />
          </svg>
        </button>
      </transition>
    </div>

    <div class="relative h-16 w-16">
      <button
        class="bg-saffron-600 text-white p-3 w-16 h-16 rounded-full shadow-xl hover:bg-saffron-500"
        @click="toggle"
      >
        <transition
          enter-active-class="transition-all transform duration-200 ease-out"
          leave-active-class="transition-all transform duration-200 ease-in"
          enter-from-class="opacity-25 rotate-180 scale-75"
          enter-to-class="opacity-100 rotate-0 scale-100"
          leave-from-class="opacity-100 rotate-0 scale-100"
          leave-to-class="opacity-25 -rotate-180 scale-75"
          mode="out-in"
        >
          <svg
            v-if="!menuVisible"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </transition>
      </button>
    </div>
  </div>
</template>
