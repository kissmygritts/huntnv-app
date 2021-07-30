<template>
  <div class="w-full overflow-hidden bg-opacity-0">
    <div class="space-y-4">
      <mv-hunts-container-card
        v-for="(hunt, i) in hunts"
        :key="i"
        :hunt="hunt"
        @mouseover="emitHover(hunt.hunt_geometry_id)"
        @mouseleave="emitMouseLeave"
      />
    </div>
  </div>
</template>

<script>
import mvHuntsContainerCard from './mv-hunts-container-card.vue'

export default {
  name: 'mv-hunts-container',
  components: { mvHuntsContainerCard },
  props: {
    hunts: {
      type: Array,
      required: true
    }
  },
  methods: {
    emitHover (id) {
      this.$emit('hunt-card:hover', { hunt: id, hover: true })
    },

    emitMouseLeave () {
      this.$emit('hunt-card:hover', { hover: false })
    }
  }
}
</script>
