import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {path: '/clients/:clid', name: 'Home', component: Home},

  {path: '/courses/:cid', name: 'course', component: () => import('../views/course.vue')},

  {path: '/courseNew/:cid', name: 'courseNew', component: () => import('../views/CourseNew.vue')},

  {path: '/courses/:cid/chapters/:chaid/questions/:qid', name: 'About', component: () => import('../views/Chapter.vue')},

  {path: '/courses/:cid/chapters/:chaid/score', name: 'score', component: () => import('../views/Score.vue')},

]

const router = new VueRouter({
  routes
})

export default router
