import { ref, shallowRef } from 'vue'
import { huntNvApi } from '../../lib/huntnv-client.js'

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

export function useHunt() {
  return {
    loading,
    data,
    error,
    getHunt
  }
}
