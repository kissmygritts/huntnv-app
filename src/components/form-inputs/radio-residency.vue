<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="font-medium ml-1 text-gray-900">Residency</h2>
    </div>

    <RadioGroup v-model="selected" class="mt-2">
      <RadioGroupLabel class="sr-only">
        Choose a residency option.
      </RadioGroupLabel>
      <div class="flex -space-x-px">
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
                ? 'bg-saffron-200/50 border-transparent text-saffron-800 border-saffron-600 hover:bg-saffron-200 z-10'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
              'relative border first:rounded-l last:rounded-r p-2 flex items-center justify-center flex-1 capitalize text-sm'
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

const options = ['resident', 'non-resident']

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
