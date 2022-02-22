<script setup>
defineProps({
  fields: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  naValue: {
    type: String,
    required: false,
    default: 'N/A'
  },
  linkCell: {
    type: Function,
    required: false
  }
})
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div
          class="shadow overflow-hidden border-b border-gray-200 rounded-b-md"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="field in fields"
                  :key="field.label"
                  scope="col"
                  class="px-2 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
                >
                  {{ field.label }}
                </th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="row in rows" :key="row.hunt_year">
                <td
                  v-for="(field, index) in fields"
                  :key="index"
                  class="px-2 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  <router-link
                    v-if="linkCell && index === 0"
                    :to="{ name: 'hunts-id', params: { id: linkCell(row) } }"
                    class="text-saffron-700 cursor-pointer hover:text-saffron-500 hover:underline"
                  >
                    {{ row[field.field] ?? naValue }}
                  </router-link>
                  <span v-else>{{ row[field.field] ?? naValue }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* * {
  outline: solid 1px blue;
} */
</style>
