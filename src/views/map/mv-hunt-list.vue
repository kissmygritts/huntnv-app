<template>
  <div class="w-full divide-y-2 divide-gray-200 rounded-md overflow-hidden shadow-md">
    <mv-hunt-card v-for="hunt in hunts" :key="hunt.id" :hunt="hunt" />
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
  }
}
</script>
