import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
//
// firebaseInstance.firebase.auth().onAuthStateChanged((user) =>{
//   if(user){
//     window.user = user;
//
//     localStorage.setItem('uid', user.uid);
//     new Vue({
//       router,
//       vuetify,
//       render: h => h(App)
//     }).$mount('#app')
//   }
//   else {
//     new Vue({
//       router,
//       vuetify,
//       render: h => h(App)
//     }).$mount('#app')
//   }
// })