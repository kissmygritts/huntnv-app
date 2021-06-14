import { createRouter, createWebHistory } from 'vue-router'

// import views
import Home from '../views/Home.vue'
import HuntDetails from '../views/HuntDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hunt/:id',
    name: 'HuntDetails',
    props: true,
    component: HuntDetails
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
