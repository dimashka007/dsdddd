import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

import CourseWorks from './components/CourseWorks.vue'
import Exams from './components/Exams.vue'
import Graphics from './components/Graphics.vue'
import Marks from './components/Marks.vue'
import Methodicals from './components/Methodicals.vue'
import Protocols from './components/Protocols.vue'
import Teachload from './components/Teachload.vue'
import Teachers from './components/Teachers.vue'
import Eduprocess from './components/Eduprocess.vue'

const routes = [
  { path: '/courseworks', component: CourseWorks },
  { path: '/exams', component: Exams },
  { path: '/graphics', component: Graphics },
  { path: '/marks', component: Marks },
  { path: '/methodicals', component: Methodicals },
  { path: '/protocols', component: Protocols },
  { path: '/teachload', component: Teachload },
  { path: '/teachers', component: Teachers },
  { path: '/eduprocess', component: Eduprocess },
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
  data: {
    user: '',
    users: [
    ]
  },
  created(){
    this.$root.user = document.cookie.split('=')[1]
  }
}).$mount('#app')
