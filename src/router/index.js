import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chapters/:chaid/questions/:qid',
    name: 'About',
    component: () => import('../views/Chapter.vue')
  },
    {
      path: '/chapters/:chaid/score',
      name: 'score' +
          '',
      component: () => import('../views/Score.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
