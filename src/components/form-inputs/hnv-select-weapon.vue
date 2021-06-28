<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox as="div" v-model="selected">
    <ListboxLabel class="block ml-1 font-medium text-gray-700">
      Weapon
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-olive-500 focus:border-olive-500 sm:text-sm">
        <span :class="[selected ? 'capitalize' : 'text-gray-500', 'block truncate']">{{ selected || 'Select a Weapon...' }}</span>
        <!-- <span v-if="selected.id" class="block truncate">Select a Species</span>
        <span v-else class="block truncate">{{ selected.displayName }}</span> -->
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="weapon in weaponOptions" :key="weapon" :value="weapon" v-slot="{ active, selected }">
            <li :class="[active ? 'text-white bg-olive-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4 capitalize']">
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ weapon }}
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

const weaponOptions = [
  'archery',
  'muzzleloader',
  'any legal weapon'
]

export default {
  name: 'hnv-select-weapon',
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
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const isEmptyModelValue = props.modelValue === ''
    const selectedOption = isEmptyModelValue ? '' : weaponOptions.find((item) => item.id === props.modelValue)
    const selected = ref(selectedOption)
    watch(selected, () => {
      emit('update:modelValue', selected)
    })

    // const selected = computed({
    //   get: () => props.modelValue,
    //   set: (modelValue) => emit('update:modelValue', modelValue)
    // })

    return {
      weaponOptions,
      selected
    }
  }
}
</script>
