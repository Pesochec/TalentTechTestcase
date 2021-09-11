import Vue from 'vue'
import VueRouter from 'vue-router'
import WeatherWidget from '../views/WeatherWidget.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Weather Widget',
    component: WeatherWidget
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
