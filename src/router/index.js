import { createRouter, createWebHistory } from 'vue-router'

// import views
import Home from '../views/home/index.vue'
import HuntDetails from '../views/hunt-details/index.vue'
import MapPage from '@/views/map/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hunts/:id',
    name: 'HuntDetails',
    props: true,
    component: HuntDetails
  },
  {
    path: '/map',
    name: 'Map',
    component: MapPage
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   route level code-splitting
  //   this generates a separate chunk (about.[hash].js) for this route
  //   which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
