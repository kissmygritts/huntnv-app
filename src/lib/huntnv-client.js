import axios from 'axios'

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
    getHuntFeed: async () => {
      let data
      let error
      let isOk

      try {
        const response = await client.get('hunts/feed')
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
    }
  }
}

export const huntNvApi = huntNvClient('http://localhost:3333')
