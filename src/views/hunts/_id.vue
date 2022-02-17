<template>
  <div class="flex flex-col flex-1 px-4 overflow-x-auto">

    <!-- content container -->
    <div class="my-4 min-w-full flex flex-col space-y-4">

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
                  <span class="text-gray-500"><location-marker-icon class="h-6 w-6"/></span>
                  <span class="capitalize">{{ data.hunt_units_arr.join(', ') }}</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"><identification-icon class="h-6 w-6"/></span>
                  <span class="capitalize">{{ data.draw_type }}</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"><check-circle-icon class="h-6 w-6"/></span>
                  <span class="capitalize">{{ data.weapon }}</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"><calendar-icon class="h-6 w-6"/></span>
                  <span class="capitalize">{{ data.season_dates }}</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"><clock-icon class="h-6 w-6"/></span>
                  <span class="capitalize">{{ data.season_length }} days</span>
                </li>
                <li class="flex items-center space-x-2 py-1">
                  <span class="text-gray-500"><tag-icon class="h-6 w-6"/></span>
                  <span class="capitalize">{{ data.quota }} (2021 quota)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex-1 rounded-md bg-white h-156">hello world</div>
      </div>

      <!-- next row -->
      <div class="w-full h-14 rounded-md bg-white sticky top-0 flex items-center">
        <div class="">sticky</div>
      </div>

      <div class="flex gap-4">
        <div class="flex-1 bg-white rounded-md h-56">blah</div>
        <div class="flex-1 bg-white rounded-md h-56">blah</div>
        <div class="flex-1 bg-white rounded-md h-56">blah</div>
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
import { useHunt } from './use-hunt.js'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const { data, getHunt } = useHunt()
getHunt(props.id)
</script>

<style scoped>
* { outline: solid 1px blue; }
</style>
