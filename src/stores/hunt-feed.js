import { defineStore, acceptHMRUpdate } from 'pinia'
import { huntNvApi } from '../lib/huntnv-client.js'
import { pick, pickTruthy } from '../lib/objects.js'

export const useHuntFeedStore = defineStore({
  id: 'huntFeed',

  state: () => ({
    data: undefined,
    error: undefined,
    loading: false,
    activeHuntGeomIds: [0],
    feedFilters: {
      species: {},
      residency: '',
      weapon: '',
      publicLand: 0,
      harvestRate: 0,
      maturityRate: 0,
      drawDifficulty: 0,
      drawRank: 0,
      medianBp: 0,
      search: null
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
        medianBp: state.feedFilters.medianBp,
        huntUnits: state.feedFilters.search
      }
      return pickTruthy(filters)
    },

    isFiltered() {
      return Object.keys(this.getFeedFilters).length > 0
    },

    isHuntDetailsFiltered() {
      const huntDetails = pickTruthy(
        pick(this.getFeedFilters, [
          'speciesId',
          'residency',
          'weapon',
          'publicLand'
        ])
      )
      return Object.keys(huntDetails).length > 0
    },

    isHarvestFiltered() {
      const harvest = pickTruthy(
        pick(this.getFeedFilters, ['harvestRate', 'maturityRate'])
      )
      return Object.keys(harvest).length > 0
    },

    isDrawFiltered() {
      const draw = pickTruthy(
        pick(this.getFeedFilters, ['drawDifficulty', 'drawRank', 'medianBp'])
      )
      return Object.keys(draw).length > 0
    }
  },

  actions: {
    async getHuntFeed(params = {}) {
      this.loading = true
      const { data, error } = await huntNvApi.getHuntFeed(params)
      this.data = data
      this.error = error
      this.loading = false

      this.setActiveIds()
    },

    setSearchTerm(search) {
      console.log(search)
      this.feedFilters.search = !search
        ? null
        : search.length > 3
        ? search.slice(0, 3)
        : search.length < 3
        ? search.padStart(3, '0')
        : search
    },

    setActiveIds() {
      const huntFeed = this.data.hunt_feed
      if (huntFeed && this.isFiltered) {
        this.activeHuntGeomIds = [...new Set(huntFeed.map((d) => d.id))]
      } else {
        this.activeHuntGeomIds = [0]
      }
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
      this.feedFilters.search = null
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHuntFeedStore, import.meta.hot))
}
