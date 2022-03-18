<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="font-medium ml-1 text-gray-900">Weapon</h2>
    </div>

    <RadioGroup v-model="selected" class="mt-2">
      <RadioGroupLabel class="sr-only">
        Choose a weapon option.
      </RadioGroupLabel>
      <div class="flex flex-col -space-y-px">
        <RadioGroupOption
          as="template"
          v-for="option in options"
          :key="option"
          :value="option"
          v-slot="{ checked }"
        >
          <div
            :class="[
              checked
                ? 'z-10 bg-saffron-200/50 border-transparent text-saffron-800 border-saffron-600 hover:bg-saffron-200'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
              'relative border first:rounded-t last:rounded-b p-2 flex items-center justify-center flex-1 capitalize text-sm cursor-pointer'
            ]"
          >
            <RadioGroupLabel as="p">
              {{ option }}
            </RadioGroupLabel>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script>
import { computed } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const options = ['any legal weapon', 'archery', 'muzzleloader']

export default {
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  props: { modelValue: { type: String } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      }
    })

    return {
      options,
      selected
    }
  }
}
</script>
