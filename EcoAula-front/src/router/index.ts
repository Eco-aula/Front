import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: () => import('../views/RegistrarView.vue')
    },
    {
      path: '/listado',
      name: 'listado',
      component: () => import('../views/ListadoView.vue')
    },
    {
      path: '/alertas',
      name: 'alertas',
      component: () => import('../views/AlertasView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
