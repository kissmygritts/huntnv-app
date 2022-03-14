<template>
  <div class="bg-gray-100 group">
    <router-link
      class="block w-full p-2"
      :to="{ name: 'hunts-id', params: { id: hunt.hunt_id } }"
    >
      <div class="w-full flex items-center justify-between">
        <h4
          class="text-lg capitalize text-oxford-800 group-hover:text-saffron-600"
        >
          {{ hunt.draw_type }} &bull; {{ hunt.weapon }}
        </h4>
        <div
          v-if="hunt.is_new"
          class="flex items-center bg-blue-100 text-blue-500 px-2 py-1 rounded"
        >
          <sparkles-icon class="h-3 w-3" />
          <span class="ml-2 text-xs capitalize">new hunt</span>
        </div>
      </div>

      <!-- hunt restriction info -->
      <div
        v-if="hunt.hunt_restrictions"
        class="flex items-center space-x-1.5 text-sm font-light text-gray-700 bg-gray-100"
      >
        <span class="text-gray-600/90">
          <information-circle-icon class="h-4 w-4" />
        </span>
        <span>{{ hunt.hunt_restrictions }}</span>
      </div>

      <!-- hunt seasons -->
      <div
        class="flex items-center space-x-1.5 pb-1 text-gray-700 font-light text-sm"
      >
        <span class="text-gray-600/90">
          <calendar-icon class="h-4 w-4" />
        </span>
        <span class="capitalize">{{ hunt.season_dates }}</span>
        <span v-if="hunt.season_order_modifier" class="capitalize">
          - {{ hunt.season_order_modifier }}</span
        >
      </div>

      <!-- hunt stats data -->
      <dl
        v-if="!hunt.is_new"
        class="text-center flex flex-wrap justify-between gap-2"
      >
        <div class="flex flex-col w-[30%]">
          <dt class="order-2 text-sm font-light text-gray-500">2021 Quota</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ hunt.quota }}
          </dd>
        </div>
        <div class="flex flex-col w-[30%]">
          <dt class="order-2 text-sm font-light text-gray-500">Harvest</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{
              hunt.harvest_rate
                ? `${(hunt.harvest_rate * 100).toFixed(1)}%`
                : 'N/A'
            }}
          </dd>
        </div>
        <div class="flex flex-col w-[30%]">
          <dt class="order-2 text-sm font-light text-gray-500">Maturity</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{
              hunt.maturity_value
                ? `${(hunt.maturity_value * 100).toFixed(1)}%`
                : 'N/A'
            }}
          </dd>
        </div>
        <div class="flex flex-col w-[30%]">
          <dt class="order-2 text-sm font-light text-gray-500">Median BP</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{
              hunt.median_bp_of_successful_applications
                ? `${hunt.median_bp_of_successful_applications.toFixed(0)}`
                : 'N/A'
            }}
          </dd>
        </div>
        <div class="flex flex-col w-[30%]">
          <dt class="order-2 text-sm font-light text-gray-500">
            Draw Difficulty
          </dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ drawDifficultyToStr(hunt.draw_difficulty_qtile) }}
          </dd>
        </div>
        <div class="flex flex-col w-[30%]">
          <dt class="order-2 text-sm font-light text-gray-500">Draw Rank</dt>
          <dd class="order-1 text-sm font-bold text-gray-600">
            {{ hunt.draw_difficulty_rank }}/{{ hunt.draw_difficulty_rank_max }}
          </dd>
        </div>
      </dl>

      <div v-else class="text-center flex flex-wrap justify-between gap-2">
        <p class="w-full text-gray-500 text-sm pt-2 py-1 font-light">
          Hunt data isn't available for new hunts.
        </p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { SparklesIcon } from '@heroicons/vue/solid'
import { CalendarIcon, InformationCircleIcon } from '@heroicons/vue/outline'
import { drawDifficultyToStr } from '../../lib/data-utils.js'

defineProps({
  hunt: {
    type: Object,
    required: true
  }
})
</script>
