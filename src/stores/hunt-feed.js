import { defineStore } from 'pinia'
import { huntNvApi } from '../lib/huntnv-client.js'
import { pickTruthy } from '../lib/objects.js'

export const useHuntFeedStore = defineStore({
  id: 'huntFeed',

  state: () => ({
    data: undefined,
    error: undefined,
    loading: false,
    feedFilters: {
      species: {},
      residency: '',
      weapon: ''
    }
  }),

  getters: {
    getFeedFilters: (state) => {
      const filters = {
        speciesId: state.feedFilters.species?.id || '',
        residency: state.feedFilters.residency,
        weapon: state.feedFilters.weapon
      }
      const _filters = pickTruthy(filters)
      return Object.keys(_filters) ? _filters : undefined
    }
  },

  actions: {
    async getHuntFeed(params = {}) {
      this.loading = true
      const { data, error } = await huntNvApi.getHuntFeed(params)
      this.data = data
      this.error = error
      this.loading = false
    },

    clearFilters() {
      this.feedFilters.species = {}
      this.feedFilters.residency = ''
      this.feedFilters.weapon = ''
    }
  }
})
