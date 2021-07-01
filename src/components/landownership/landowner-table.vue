<template>
  <div v-if="landownership" class="uppercase">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th scope="col" class="px-2 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Landownership
          </th>
          <th scope="col" class="px-2 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
            Miles<sup>2</sup> (%)
          </th>
        </tr>
      </thead>
      <tbody v-if="landownership" class="bg-white divide-y divide-gray-200 capitalize">
          <tr v-for="owner in landownership" :key="owner.surface_mgmt_agency">
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800">
              {{ owner.surface_mgmt_agency}}
            </td>
            <td class="px-2 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800 text-right font-mono">
              {{ owner.area }} ({{ owner.coverage }}%)
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'landowner-table',
  props: {
    landownership: {
      type: Array,
      required: true
    }

  }
}
</script>
