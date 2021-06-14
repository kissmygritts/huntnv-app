<template>
    <div static class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <div class="w-screen max-w-lg">
              <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div v-if="hunt" class="mt-6 relative flex-1 px-4 sm:px-6 capitalize">
                   <div class="text-xl font-bold bg-yellow-500 text-white px-2">
                    {{ hunt.display_name }}
                  </div>
                  <div class="">
                    <div class="text-xl font-bold text-blue-900 px-2">
                      {{ hunt.draw_type }}
                    </div>
                    <div class="text-lg font-medium text-blue-900 px-2">
                      {{ hunt.weapon }}
                    </div>
                  </div>
                  <div class="p-4">
                    <h3 class="font-medium text-gray-900">Hunt Information</h3>
                    <dl class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                      <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Hunt Units</dt>
                        <dd class="text-gray-900">{{ hunt.units }}</dd>
                      </div>
                      <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Season Dates</dt>
                        <dd class="text-gray-900">{{ hunt.season_dates }}</dd>
                      </div>
                      <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Quota</dt>
                        <dd class="text-gray-900">{{ hunt.quota }}</dd>
                      </div>
                      <div class="py-3 flex justify-between text-sm font-medium">
                        <dt class="text-gray-500">Total Acres</dt>
                        <dd class="text-gray-900">{{ formatAcres(hunt.landownership[0].hunt_area) }}</dd>
                      </div>
                    </dl>
                  </div>
                  <div class="p-4">
                    <h3 class="font-medium text-gray-900">Landownership Data</h3>
                    <dl v-for="owner in hunt.landownership" :key="owner.hunt_id" >
                      <div class="py-3 flex justify-between text-sm font-medium mt-2 border-t border-gray-200">
                        <dt class="text-gray-500">{{ owner.surface_mgmt_agency}}</dt>
                        <dd class="text-gray-900">{{ formatAcres(owner.area) }} ({{ formatPrecentage(owner.coverage) }}% )</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <button type="button" class="bg-transparent text-blue-900 p-2 rounded cursor-pointer focus:outline-none">Similar Hunts</button>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['hunt'],
  setup () {
    function formatAcres (areaAcres) {
      const acres = areaAcres / 4047
      return acres.toFixed(2)
    }

    function formatPrecentage (areaPrecent) {
      const precent = areaPrecent * 100
      return precent.toFixed(2)
    }

    return {
      formatAcres,
      formatPrecentage
    }
  }
}
</script>
