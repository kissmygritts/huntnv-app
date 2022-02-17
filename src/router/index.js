import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'HuntNV Home' }
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map/index.vue'),
    meta: { title: 'HuntNV Map' }
  },
  {
    path: '/hunts/:id',
    name: 'hunts-id',
    component: () => import('../views/hunts/_id.vue'),
    props: true,
    meta: { title: 'HuntNV Hunt' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
