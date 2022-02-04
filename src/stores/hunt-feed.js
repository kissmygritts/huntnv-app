import { defineStore } from 'pinia'
import { huntNvApi } from '../lib/huntnv-client.js'

export const useHuntFeedStore = defineStore({
  id: 'huntFeed',
  state: () => ({
    data: undefined,
    error: undefined,
    loading: false
  }),
  getters: {},
  actions: {
    async getHuntFeed() {
      this.loading = true
      const { data, error } = await huntNvApi.getHuntFeed()
      this.data = data
      this.error = error
      this.loading = false
    }
  }
})
