<template>
  <div>
    <dl class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-gray-50 px-4 py-5 sm:p-6 flex shadow-md rounded-md overflow-hidden">
        <div class="px-1">
          <KeyIcon
            class="flex-shrink-0 mr-2 h-8 w-8 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <div>
          <div class="text-lg font-semibold text-gray-900">
            Hunter Access
          </div>
          <div class="text-sm font-medium text-gray-500">
            Travel east from Alturas and Cedarville, California on Highway 299. From Reno and Gerlach, Nevada, travel north on Highway 447. Roads in the unit range from high standard dirt, like Highway 299, to jeep trails. Many of the hunting areas are only accessible by four-wheel drive. Tire chains, extra gas, and extra spare tires are recommended.
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:p-6 flex shadow-md rounded-md overflow-hidden">
        <div class="px-1">
          <SunIcon
            class="flex-shrink-0 mr-2 h-8 w-8 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <div>
          <div class="text-lg font-semibold text-gray-900">
            Weather and Climate
          </div>
          <div class="text-sm font-medium text-gray-500">
            Precipitation in this area comes primarily in the form of snowfall during the months of November through March. Amounts of precipitation range from 8 inches on the valley floors to 18 inches at the highest peaks. Weather during the October hunting season is typically dry for the first two weeks with chances of snowstorms and accumulations of snow increasing during the last half of the season.
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:p-6 flex shadow-md rounded-md overflow-hidden">
        <div class="px-1">
          <InformationCircleIcon
            class="flex-shrink-0 mr-2 h-8 w-8 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <div>
          <div class="text-lg font-semibold text-gray-900">
            Facilities and Services
          </div>
          <div class="text-sm font-medium text-gray-500">
            Fuel, food, vehicle repair facilities, and motels are available in Cedarville and Gerlach. Hunters typically take advantage of tree cover and or perennial water sources adjacent to the area that they are hunting. Tent-type camps are recommended. Trailer or RV-type hunters are confined to better road systems in the valley floors and are required to travel farther each day to reach their hunt area.
          </div>
        </div>
      </div>
    </dl>
  </div>
</template>

<script>
import { KeyIcon, SunIcon, InformationCircleIcon } from '@heroicons/vue/outline'

export default {
  components: {
    KeyIcon,
    SunIcon,
    InformationCircleIcon
  }
}
</script>
