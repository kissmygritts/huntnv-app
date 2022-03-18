<script setup>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { InformationCircleIcon, XIcon } from '@heroicons/vue/outline'

defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['modal:close'])

const close = () => emit('modal:close')
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto" @close="close">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
          >
            <div class="block absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oxford-500"
                @click="close"
              >
                <span class="sr-only">Close</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <div
                class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <information-circle-icon
                  class="h-6 w-6 text-blue-600"
                  aria-hidden="true"
                />
              </div>
              <div>
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  <slot name="modal-title">FAQ</slot>
                </DialogTitle>
              </div>
            </div>
            <div class="mt-4 pl-8 h-120 overflow-y-auto">
              <slot name="modal-content">
                <p class="text-sm text-gray-500">
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed from our servers forever.
                  This action cannot be undone.
                </p>
              </slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
