<template>
  <div class="w-full overflow-hidden bg-opacity-0">
    <mv-hunt-card
      v-for="hunt in hunts.hunts"
      :key="hunt.hunt_geometry_id"
      :hunt="hunt"
      @mouseover="emitHover(hunts.hunt_geometry_id)"
      @mouseleave="emitMouseLeave"
    />
  </div>
</template>

<script>
import mvHuntCard from './mv-hunt-card.vue'

export default {
  name: 'mv-hunt-list',
  components: { mvHuntCard },
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
