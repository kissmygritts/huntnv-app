import axios from 'axios'

const baseURL = process.env.VUE_APP_API_URL

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
  return apiClient.get(`/features/hunt_geometries/${id}.geojson`)
}

const getHuntUnitFeatures = (units) => {
  const data = apiClient.get(`/features/hunt_units.geojson?hunt_units=${units}`)
  console.log(data)
  return data
}

export {
  getHunts,
  getHunt,
  getHuntFeature,
  getHuntUnitFeatures
}
