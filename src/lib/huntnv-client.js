import axios from 'axios'
import { pickTruthy } from './objects.js'

const huntNvClient = (baseURL, options = {}) => {
  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...options
  }

  const client = axios.create({ baseURL, ...options })

  // client.interceptors.request.use((config) => {
  //   return new Promise((resolve) => setTimeout(() => resolve(config), 2000))
  // })

  return {
    getHuntFeed: async ({
      speciesId,
      residency,
      weapon,
      publicLand,
      harvestRate,
      maturityRate,
      drawDifficulty,
      drawRank,
      medianBp
    } = {}) => {
      const params = pickTruthy({
        species_class_id: speciesId || '',
        draw_type: residency || '',
        weapon: weapon || '',
        percent_public_land: publicLand || 0,
        harvest_rate: harvestRate || 0,
        maturity_value: maturityRate || 0,
        draw_difficulty_qtile: drawDifficulty || 0,
        draw_difficulty_rank: drawRank || 0,
        median_bp_of_successful_applications: medianBp || 0
      })

      let data
      let error
      let isOk

      try {
        const response = await client.get('hunts/feed', {
          params
        })
        data = response.data
        error = undefined
        isOk = true
      } catch (err) {
        data = undefined
        error = err.message
        isOk = false
      }

      return {
        ok: isOk,
        data,
        error
      }
    },

    getHunt: async (id) => {
      try {
        const response = await client.get(`hunts/${id}`)
        return {
          data: response.data,
          error: null,
          ok: true
        }
      } catch (err) {
        return {
          data: null,
          error: err,
          ok: false
        }
      }
    }
  }
}

export const huntNvApi = huntNvClient(
  import.meta.env.VITE_APP_API_URL || 'http://localhost:3333'
)
