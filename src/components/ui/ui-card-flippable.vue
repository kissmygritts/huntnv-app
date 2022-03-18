<script setup>
import { ref } from 'vue'
import { InformationCircleIcon } from '@heroicons/vue/outline'

const flipped = ref(false)
const flip = () => (flipped.value = !flipped.value)
</script>

<template>
  <div class="overflow-hidden p-2">
    <!-- header -->
    <div class="flex items-center justify-between">
      <slot name="title"></slot>
      <!-- flipper -->
      <button @click="flip">
        <slot name="icon">
          <information-circle-icon class="h-5 w-5 text-gray-400" />
        </slot>
      </button>
    </div>
    <!-- main content -->
    <slot v-if="!flipped" name="content"></slot>
    <!-- flipped content -->
    <div v-else>
      <slot name="back">random flipped content </slot>
    </div>
  </div>
</template>
