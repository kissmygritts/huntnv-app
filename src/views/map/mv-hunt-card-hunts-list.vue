<template>
  <div class="bg-gray-100 group">
    <router-link
      class="block w-full p-2"
      :to="{ name: 'HuntDetails', params: { id: hunt.id } }"
    >
      <div class="w-full flex items-center justify-between">
        <h4 class="text-lg capitalize font-light text-olive-600 group-hover:text-saffron-700">
          {{ hunt.draw_type }} &bull; {{ hunt.weapon }}
        </h4>
        <div v-if="newHunt" class="flex items-center bg-blue-100 text-blue-500 px-2 py-1 rounded-md">
          <sparkles-icon class="h-3 w-3" />
          <span class="ml-2 text-xs capitalize">new hunt</span>
        </div>
      </div>

      <div class="inline-flex items-center text-gray-700 font-light text-sm">
        <calendar-icon class="h-4 w-4 text-gray-500" />
        <span class="ml-2 capitalize">{{ hunt.season_dates }}</span>
      </div>

      <dl class="mt-1 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
        <div class="flex flex-col">
          <dt class="order-2 text-sm font-light text-gray-500">
            Quota
          </dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ hunt.quota }}
          </dd>
        </div>
        <div class="flex flex-col sm:mt-0">
          <dt class="order-2 text-sm font-light text-gray-500">
            Draw
          </dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ (hunt.draw_rate * 100).toFixed(2) }}%
          </dd>
        </div>
        <div class="flex flex-col sm:mt-0">
          <dt class="order-2 text-sm font-light text-gray-500">
            Success
          </dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ (this.hunt.success_rate * 100).toFixed(2) }}%
          </dd>
        </div>
      </dl>
    </router-link>
  </div>
</template>

<script>
import { SparklesIcon } from '@heroicons/vue/solid'
import { CalendarIcon } from '@heroicons/vue/outline'

export default {
  name: 'mv-hunt-card-hunts-list',
  components: { SparklesIcon, CalendarIcon },
  props: {
    hunt: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      newHunt: false
    }
  },
  created () {
    this.isNewHunt()
  },
  methods: {
    isNewHunt () {
      if (this.hunt.draw_rate === null) {
        this.newHunt = true
      }
    }
  }

}
</script>
