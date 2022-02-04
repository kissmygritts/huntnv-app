<template>
  <div class="bg-gray-100 group">
    <!-- <router-link
      class="block w-full p-2"
      :to="{ name: 'HuntDetails', params: { id: hunt.hunt_id } }"
    > -->
    <div class="block w-full p-2">
      <div class="w-full flex items-center justify-between">
        <h4
          class="text-lg capitalize text-olive-800 group-hover:text-saffron-600"
        >
          {{ hunt.draw_type }} &bull; {{ hunt.weapon }}
        </h4>
        <div
          v-if="hunt.harvest_rate === null"
          class="flex items-center bg-blue-100 text-blue-500 px-2 py-1 rounded"
        >
          <sparkles-icon class="h-3 w-3" />
          <span class="ml-2 text-xs capitalize">new hunt</span>
        </div>
      </div>

      <div class="inline-flex items-center text-gray-700 font-light text-sm">
        <calendar-icon class="h-4 w-4 text-gray-500" />
        <span class="ml-2 capitalize">{{ hunt.season_dates }}</span>
      </div>

      <dl
        class="mt-2 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-1"
      >
        <div class="flex flex-col">
          <dt class="order-2 text-sm font-light text-gray-500">Quota</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ hunt.quota }}
          </dd>
        </div>
        <div class="flex flex-col sm:mt-0">
          <dt class="order-2 text-sm font-light text-gray-500">Harvest</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{
              hunt.harvest_rate
                ? `${(hunt.harvest_rate * 100).toFixed(2)}%`
                : 'N/A'
            }}
          </dd>
        </div>
        <div class="flex flex-col sm:mt-0">
          <dt class="order-2 text-sm font-light text-gray-500">Maturity</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{
              hunt.maturity_value
                ? `${(hunt.maturity_value * 100).toFixed(2)}%`
                : 'N/A'
            }}
          </dd>
        </div>
        <div class="flex flex-col sm:mt-0">
          <dt class="order-2 text-sm font-light text-gray-500">Median BP</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ hunt.median_bp_of_successful_applications.toFixed(1) }}
          </dd>
        </div>
        <div class="flex flex-col sm:mt-0">
          <dt class="order-2 text-sm font-light text-gray-500">Draw Difficulty</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ hunt.draw_difficulty_qtile }}
          </dd>
        </div>
        <div class="flex flex-col sm:mt-0">
          <dt class="order-2 text-sm font-light text-gray-500">Draw Rank</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ hunt.draw_difficulty_rank }}
          </dd>
        </div>
      </dl>
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
import { SparklesIcon } from '@heroicons/vue/solid'
import { CalendarIcon } from '@heroicons/vue/outline'

export default {
  name: 'hf-hunt-card-hunt-list',
  components: { SparklesIcon, CalendarIcon },
  props: {
    hunt: {
      type: Object,
      required: true
    }
  }
}
</script>
