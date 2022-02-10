<template>
  <div class="w-full overflow-hidden">
    <div class="space-y-4">
      <hf-hunt-card v-for="(hunt, i) in huntFeed" :key="i" :hunt="hunt" />
    </div>
  </div>
</template>

<script>
import HfHuntCard from './hf-hunt-card.vue'

export default {
  name: 'hunt-feed-list-container',
  components: { HfHuntCard },
  props: {
    huntFeed: {
      type: Array,
      required: true
    }
  }
}
</script>
