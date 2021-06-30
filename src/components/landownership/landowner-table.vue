<template>
  <div v-if="hunt" class="uppercase">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th scope="col" class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Landowner
          </th>
          <th scope="col" class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acres (% Hunt Area)
          </th>
        </tr>
      </thead>
      <tbody v-if="hunt" class="bg-white divide-y divide-gray-200 capitalize">
          <tr v-for="owner in hunt.landownership" :key="owner.hunt_id">
            <td class="px-2 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
              {{ owner.surface_mgmt_agency}}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
              {{ formatAcres(owner.area) }} ({{ formatPrecentage(owner.coverage) }}%)
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'landower-table',
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
