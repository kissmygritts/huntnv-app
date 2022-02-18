<template>
  <div class="flex flex-col flex-1 px-4 overflow-x-auto">
    <ui-loading v-if="loading" />
    <!-- content container -->
    <div v-else class="my-4 min-w-full flex flex-col space-y-4">
      <!-- first row -->
      <div class="flex space-x-2">
        <!-- side hunt details -->
        <div class="flex-0 flex flex-col w-88">
          <!-- header -->
          <div class="space-y-3">
            <div>
              <h1
                class="text-2xl font-semibold leading-7 text-gray-700 capitalize"
              >
                {{ data.display_name.split(' - ')[0] }}
              </h1>
              <h1
                class="text-2xl font-semibold leading-7 text-gray-700 capitalize"
              >
                {{ data.display_name.split(' - ')[1] }}
              </h1>
            </div>

            <div>
              <ul class="text-gray-600 pl-1">
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"
                    ><location-marker-icon class="h-6 w-6"
                  /></span>
                  <span class="capitalize">{{
                    data.hunt_units_arr.join(', ')
                  }}</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"
                    ><identification-icon class="h-6 w-6"
                  /></span>
                  <span class="capitalize">{{ data.draw_type }}</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"
                    ><check-circle-icon class="h-6 w-6"
                  /></span>
                  <span class="capitalize">{{ data.weapon }}</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"
                    ><calendar-icon class="h-6 w-6"
                  /></span>
                  <span class="capitalize">{{ data.season_dates }}</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"
                    ><clock-icon class="h-6 w-6"
                  /></span>
                  <span class="capitalize">{{ data.season_length }} days</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"
                    ><tag-icon class="h-6 w-6"
                  /></span>
                  <span class="capitalize">{{ data.quota }} (2021 quota)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex-1 rounded-md bg-white h-156">hello world</div>
      </div>

      <!-- Row: hero stats -->
      <div class="w-full">
        <dl class="flex flex-wrap space-x-24 justify-center pt-10 pb-4">
          <div class="flex flex-col px-8 text-center">
            <dt class="order-2 text-lg leading-7 text-gray-500">Public Land</dt>
            <dd class="order-1 text-6xl font-extrabold text-saffron-600">
              81.66<small class="text-3xl">%</small>
            </dd>
          </div>
          <div class="flex flex-col px-8 text-center">
            <dt class="order-2 text-lg leading-7 text-gray-500">2021 Quota</dt>
            <dd class="order-1 text-6xl font-extrabold text-saffron-600">25</dd>
          </div>
          <div class="flex flex-col px-8 text-center">
            <dt class="order-2 text-lg leading-7 text-gray-500">Apps</dt>
            <dd class="order-1 text-6xl font-extrabold text-saffron-600">
              148
            </dd>
          </div>
          <div class="flex flex-col px-8 text-center">
            <dt class="order-2 text-lg leading-7 text-gray-500">Harvest</dt>
            <dd class="order-1 text-6xl font-extrabold text-saffron-600">
              12<small class="text-3xl">%</small>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Row: floating header -->
      <div class="w-full h-18 bg-gray-200 sticky top-0 flex items-end">
        <div
          class="flex items-center py-4 bg-white rounded-md shadow w-full text-gray-500 text-center divide-x-2"
        >
          <div class="flex-1 hover:text-saffron-600">Map</div>
          <div class="flex-1 hover:text-saffron-600">Figures</div>
          <div class="flex-1 hover:text-saffron-600">Harvest Tables</div>
          <div class="flex-1 hover:text-saffron-600">Draw Tables</div>
        </div>
      </div>
      <!-- Row: annual figures -->
      <div class="flex gap-4 pt-4">
        <ui-card-flippable class="flex-1 bg-white rounded-md">
          <template v-slot:title>
            <h2 class="font-semibold text-gray-600">Quota & Applications</h2>
          </template>
          <template v-slot:content>
            <multi-line-chart
              class="h-80 text-gray-500"
              :data="tidyHuntData"
              :options="{
                xTitle: 'Hunt Year',
                yTitle: 'Applications'
              }"
            />
          </template>
          <template v-slot:back>
            <div class="h-80 py-2 overflow-y-auto text-gray-600">
              <p>
                This graph shows the quota and number of applications over the
                last few years
              </p>
            </div>
          </template>
        </ui-card-flippable>

        <ui-card-flippable class="flex-1 bg-white rounded-md">
          <template v-slot:title>
            <h2 class="font-semibold text-gray-600">Draw Details</h2>
          </template>
          <template v-slot:content>
            <multi-line-chart
              class="h-80 text-gray-500"
              :data="tidyDrawData"
              :options="{
                xTitle: 'Hunt Year',
                yTitle: ''
              }"
            />
          </template>
          <template v-slot:back>
            <div class="h-80 py-2 overflow-y-auto text-gray-600">
              <p>
                This graph shows the Draw Rank and median bonus points of
                successful applicants for this hunt over the last few years.
              </p>

              <ul class="mt-4 space-y-1 list-disc list-outside pl-4">
                <li>
                  <strong class="font-semibold">Draw Rank</strong> is a rank of
                  how difficult this hunt is to draw compared to all other hunt
                  for this species, residency, sex, and weapon class. The lower
                  the number the harder to draw.
                </li>
                <li>
                  <strong class="font-semibold">BP</strong> is the median
                  (middle) number of bonus points that successful applicants had
                  when they drew this hunt.
                </li>
              </ul>
            </div>
          </template>
        </ui-card-flippable>

        <ui-card-flippable class="flex-1 bg-white rounded-md">
          <template v-slot:title>
            <h2 class="font-semibold text-gray-600">Harvest and Maturity</h2>
          </template>
          <template v-slot:content>
            <multi-line-chart
              class="h-80 text-gray-500"
              :data="tidyHarvestData"
              :options="{
                xTitle: 'Hunt Year',
                yTitle: 'Percentage'
              }"
            />
          </template>
          <template v-slot:back>
            <div class="h-80 py-2 overflow-y-auto text-gray-600">
              <p>
                This graph shows the harvest success rate and maturity rate for
                this hunt over the last few years.
              </p>

              <ul class="mt-4 space-y-1 list-disc list-outside pl-4">
                <li>
                  <strong class="font-semibold">Harvest %</strong> is the
                  percentage of hunters that reported successful hunts from the
                  return card survey for this hunt.
                </li>
                <li>
                  <strong class="font-semibold">Maturity %</strong> represents
                  the percentage of successful hunters that harvested a mature
                  male based on the following maturity classifications:
                  <ul class="pl-4 list-disc list-outside">
                    <li>
                      <strong class="font-medium">Antelope</strong>: 15 inches
                      or greater.
                    </li>
                    <li>
                      <strong class="font-medium">Bighorn Sheep</strong>: 7
                      years or older.
                    </li>
                    <li>
                      <strong class="font-medium">Elk</strong>: 50 inches or
                      greater main beam.
                    </li>
                    <li>
                      <strong class="font-medium">Mule Deer</strong> 4 points or
                      greater
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </template>
        </ui-card-flippable>
      </div>

      <!-- Row: bp figures -->
      <div class="flex gap-4">
        <ui-card-flippable class="flex-1 bg-white rounded-md h-96">
          <template v-slot:title>
            <h2 class="font-semibold text-gray-600">
              Bonus Point Distribution
            </h2>
          </template>
          <template v-slot:content>
            <multi-line-chart
              class="h-80 text-gray-500"
              :data="tidyBonusPoints"
              :options="{
                x: (d) => d.bp,
                xTitle: 'Bonus Points',
                yTitle: 'Pecentage'
              }"
            />
          </template>
          <template v-slot:back>
            <div class="h-80 py-2 overflow-y-auto text-gray-600">
              <p>
                This graph shows the following metrics for each bonus point
                level.
              </p>
              <ul class="mt-4 space-y-1 list-disc list-outside pl-4">
                <li>
                  <strong class="font-semibold">% Apps</strong> is the
                  percentage of all applications at the current bonus point
                  level. Generally, this shows that as bonus points increase
                  there are fewer applications you are competing with.
                </li>
                <li>
                  <strong class="font-semibold">% Drawn</strong> is the
                  percentage of successful applications at the current bonus
                  point level. Generally, this shows that as bonus points
                  increase there you are more likely to draw a tag.
                </li>
              </ul>
            </div>
          </template>
        </ui-card-flippable>
        <div class="h-96 flex-1 bg-white"></div>
      </div>

      <pre><code lang="json">{{ { data } }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import {
  LocationMarkerIcon,
  IdentificationIcon,
  TagIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/vue/outline'
import { useHuntId } from './use-hunt-id.js'
import MultiLineChart from '../../components/charts/multi-line-chart.vue'
import UiLoading from '../../components/ui/ui-loading.vue'
import UiCardFlippable from '../../components/ui/ui-card-flippable.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const {
  data,
  loading,
  getHunt,
  tidyHuntData,
  tidyHarvestData,
  tidyBonusPoints,
  tidyDrawData
} = useHuntId()
getHunt(props.id)
</script>

<style scoped>
/* * { outline: solid 1px blue; } */
</style>
