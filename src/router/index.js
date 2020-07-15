import Vue from 'vue'
import VueRouter from 'vue-router'
import course from '../views/course.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/courses/:cid',
    name: 'course',
    component: course
  },
    {
      path: '/courseNew/:cid',
      name: 'courseNew',
      component: () => import('../views/CourseNew.vue')
    },
  {
    path: '/courses/:cid/chapters/:chaid/questions/:qid',
    name: 'About',
    component: () => import('../views/Chapter.vue')
  },
    {
      path: '/courses/:cid/chapters/:chaid/score',
      name: 'score',
      component: () => import('../views/Score.vue')
    },
    {
      path: '/clients/:clid',
          name: 'client',
        component: () => import('../views/client.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
