import axios from 'axios'

const baseURL = 'https://huntnv-api-mkvuv.ondigitalocean.app'

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accpest: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getHunts () {
    return apiClient.get('/hunts')
  }
}
