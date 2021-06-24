<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox as="div" v-model="selected">
    <ListboxLabel class="block ml-1 font-medium text-gray-700">
      Species
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-olive-500 focus:border-olive-500 sm:text-sm">
        <span :class="[selected.id ? 'capitalize' : 'text-gray-500', 'block truncate']">{{ selected.id ? selected.displayName : 'Select a Species...' }}</span>
        <!-- <span v-if="selected.id" class="block truncate">Select a Species</span>
        <span v-else class="block truncate">{{ selected.displayName }}</span> -->
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="species in speciesOptions" :key="species.id" :value="species" v-slot="{ active, selected }">
            <li :class="[active ? 'text-white bg-olive-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4 capitalize']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ species.displayName }}
              </span>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-olive-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const speciesOptions = [
  { id: 1, displayName: 'antelope - horns longer than ears' },
  { id: 2, displayName: 'antelope - horns shorter than ears' },
  { id: 3, displayName: 'california bighorn sheep - any ram' },
  { id: 4, displayName: 'elk - antlered' },
  { id: 5, displayName: 'elk - antlerless' },
  { id: 6, displayName: 'elk - depredation antlered' },
  { id: 7, displayName: 'elk - depredation antlerless' },
  { id: 8, displayName: 'elk - spike' },
  { id: 9, displayName: 'mountain goat - any goat' },
  { id: 10, displayName: 'mule deer - antlered' },
  { id: 11, displayName: 'mule deer - antlered or antlerless' },
  { id: 12, displayName: 'mule deer - antlerless' },
  { id: 13, displayName: 'nelson (desert) bighorn sheep - any ewe' },
  { id: 14, displayName: 'nelson (desert) bighorn sheep - any ram' },
  { id: 15, displayName: 'rocky mountain bighorn sheep - any ram' }
]

export default {
  name: 'hnv-select-species',
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const isEmptyModelValue = Object.keys(props.modelValue).length === 0
    const selectedOption = isEmptyModelValue ? {} : speciesOptions.find((item) => item.id === props.modelValue.id)
    // const selected = ref(props.modelValue)
    const selected = ref(selectedOption)
    watch(selected, () => {
      emit('update:modelValue', selected)
    })

    // const selected = computed({
    //   get: () => props.modelValue,
    //   set: (modelValue) => emit('update:modelValue', modelValue)
    // })

    return {
      speciesOptions,
      selected
    }
  }
}
</script>
