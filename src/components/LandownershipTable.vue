<template>
  <div class="p-4">
    <h3 class="font-medium text-gray-900">Landownership Data</h3>
    <dl v-for="owner in hunt.landownership" :key="owner.hunt_id" >
      <div class="py-3 flex justify-between text-sm font-medium mt-2 border-t border-gray-200">
        <dt class="text-gray-500">{{ owner.surface_mgmt_agency}}</dt>
        <dd class="text-gray-900">{{ formatAcres(owner.area) }} ({{ formatPrecentage(owner.coverage) }}% )</dd>
      </div>
    </dl>
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
