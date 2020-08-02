import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import firebaseInstance from '../middelware/firebase';


Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'Home',meta:{authNotRequired:false}, component: Home},

  {path: '/login', name: 'login',meta:{authNotRequired:true}, component: () => import('../views/LoginScreen.vue')},

  {path: '/courses/:cid', name: 'course',meta:{authNotRequired:false}, component: () => import('../views/course.vue')},

  {path: '/courseNew/:cid', name: 'courseNew',meta:{authNotRequired:true}, component: () => import('../views/CourseNew.vue')},

  {path: '/courses/:cid/chapters/:chaid/questions/:qid', name: 'About',meta: {authNotRequired: false}, component: () => import('../views/Chapter.vue')},

  {path: '/courses/:cid/chapters/:chaid/score', name: 'score',meta: {authNotRequired: false}, component: () => import('../views/Score.vue')},

]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   const currentUser = firebaseInstance.firebase.auth().currentUser;
//   const requiredAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiredAuth && !currentUser) next ('login');
//   else if (!requiredAuth && currentUser) next ('home');
//   else next();
// });
// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  const user =  JSON.parse(localStorage.getItem('UserId'));
  if (!user && !to.meta.authNotRequired) {
    const path = '/login';
    return next(path)
  }
  next()
})


export default router