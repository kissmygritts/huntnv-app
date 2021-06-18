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

const getHunts = () => {
  return apiClient.get('/hunts')
}

const getHunt = (id) => {
  return apiClient.get(`/hunts/${id}`)
}

const getHuntFeature = (id) => {
  return apiClient.get(`/features/hunts_with_geom/${id}.geojson`)
}

export {
  getHunts,
  getHunt,
  getHuntFeature
}
