<template>
  <div class="w-full divide-y-2 divide-gray-200 rounded-md shadow-md overflow-hidden">
    <mv-hunt-card
      v-for="hunt in hunts"
      :key="hunt.id"
      :hunt="hunt"
      @mouseover="emitHover(hunt.id)"
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
      const hunt = this.hunts.filter(item => item.id === id)
      this.$emit('hunt-card:hover', { hunt: hunt[0], hover: true })
    },

    emitMouseLeave () {
      this.$emit('hunt-card:hover', { hover: false })
    }
  }
}
</script>
