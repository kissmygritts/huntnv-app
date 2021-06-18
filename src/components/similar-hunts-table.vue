<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Hunt
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Draw Type
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Weapon
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Season Dates
        </th>
      </tr>
    </thead>
    <tbody v-if="hunt" class="bg-white divide-y divide-gray-200 capitalize">
      <tr v-for="hunts in hunt.similar_hunts" :key="hunts.hunt_id">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ hunts.display_name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ hunts.draw_type }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ hunts.weapon }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ hunts.season_dates }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default ({
  name: 'similar-hunts-table',
  props: ['hunt']
})
</script>
