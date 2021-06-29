<template>
  <div class="w-full py-2">
    <div class="w-full max-w-md mx-auto">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only">Weapon</RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption
            as="template"
            v-for="plan in plans"
            :key="plan.name"
            :value="plan"
            v-slot="{ active, checked }"
          >
            <div
              :class="[
                active
                  ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                  : '',
                checked ? 'bg-gray-300 bg-opacity-75 text-gray-500 ' : 'bg-white ',
              ]"
              class="relative flex px-3 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
            >
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                  <div class="text-sm capitalize">
                    <RadioGroupLabel
                      as="p"
                      :class="checked ? 'text-black' : 'text-gray-900'"
                      class="font-medium"
                    >
                      {{ plan.name }}
                    </RadioGroupLabel>
                  </div>
                </div>
                <div v-show="checked" class="flex-shrink-0 text-white">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#2e598a"
                    />
                    <path
                      d="M7 13l3 3 7-7"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'

const plans = [
  {
    name: 'any legal weapon'
  },
  {
    name: 'archery'
  },
  {
    name: 'muzzleloader'
  }
]

export default {
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },

  setup () {
    const selected = ref(plans[0])

    return { selected, plans }
  }
}
</script>
