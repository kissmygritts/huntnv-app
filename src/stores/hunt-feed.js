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
      weapon: '',
      publicLand: 0,
      harvestRate: 0,
      maturityRate: 0,
      drawDifficulty: 0,
      drawRank: 0,
      medianBp: 0
    }
  }),

  getters: {
    getFeedFilters: (state) => {
      const filters = {
        speciesId: state.feedFilters.species?.id || '',
        residency: state.feedFilters.residency,
        weapon: state.feedFilters.weapon,
        publicLand: state.feedFilters.publicLand,
        harvestRate: state.feedFilters.harvestRate,
        maturityRate: state.feedFilters.maturityRate,
        drawDifficulty: state.feedFilters.drawDifficulty,
        drawRank: state.feedFilters.drawRank,
        medianBp: state.feedFilters.medianBp
      }
      return pickTruthy(filters)
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
      this.feedFilters.publicLand = 0
      this.feedFilters.harvestRate = 0
      this.feedFilters.maturityRate = 0
      this.feedFilters.drawDifficulty = 0
      this.feedFilters.drawRank = 0
      this.feedFilters.medianBp = 0
    }
  }
})
