<script setup>
import HfHuntCard from './hf-hunt-card.vue'

defineProps({
  huntFeed: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['hunt-card:hover'])

const emitMouseover = (id) => {
  emit('hunt-card:hover', { hunt: id, hover: true })
}

const emitMouseleave = () => {
  emit('hunt-card:hover', { hover: false })
}
</script>

<template>
  <div class="w-full overflow-hidden">
    <div class="space-y-4">
      <hf-hunt-card
        v-for="(hunt, i) in huntFeed"
        :key="i"
        :hunt="hunt"
        @mouseover="emitMouseover(hunt.id)"
        @mouseleave="emitMouseleave"
      />
    </div>
  </div>
</template>
