import { computed, ref, shallowRef } from 'vue'
import { huntNvApi } from '../../lib/huntnv-client.js'
import {
  sortHuntYear,
  pickHuntData,
  pickHarvestData,
  pickBonusPoints,
  pickDrawData
} from '../../lib/data-utils.js'

const loading = ref(false)
const data = shallowRef()
const error = shallowRef()

const getHunt = (id) => {
  loading.value = true

  huntNvApi
    .getHunt(id)
    .then((response) => {
      data.value = response.data
      error.value = null
    })
    .catch((e) => {
      data.value = null
      error.value = e
    })
    .finally(() => {
      loading.value = false
    })
}

const tidyHuntData = computed(() => {
  const tidy = data.value?.draw_data
    .sort(sortHuntYear('asc'))
    .map(pickHuntData)
    .flat()

  return tidy
})

const tidyHarvestData = computed(() =>
  data.value?.harvest_data
    .sort(sortHuntYear('asc'))
    .map(pickHarvestData(data.value?.species))
    .flat()
)

const tidyBonusPoints = computed(() => {
  const apps = data.value?.draw_data.filter((d) => d.hunt_year === 2021)[0]
    .n_applications

  const tidy = data.value?.bonus_points
    .filter((d) => d.hunt_year === 2021 && d.n_applications > 0)
    .sort(sortHuntYear('asc'))
    .map(pickBonusPoints(apps))
    .flat()

  return tidy
})

const tidyDrawData = computed(() => {
  return data.value?.draw_data
    .sort(sortHuntYear('asc'))
    .map(pickDrawData)
    .flat()
})

export function useHuntId() {
  return {
    loading,
    data,
    error,
    getHunt,

    // computed props: used for hunt figures & tables
    tidyHuntData,
    tidyHarvestData,
    tidyBonusPoints,
    tidyDrawData
  }
}
