import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { canAccessProtectedRoutes } from './authGuard'

export const routes = [
  {
    path: '/dashboard',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: () => import('../views/RegistrarView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/listado',
    name: 'listado',
    component: () => import('../views/ListadoView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/alertas',
    name: 'alertas',
    component: () => import('../views/AlertasView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/home',
    redirect: '/dashboard',
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const routerMode = (import.meta.env.VITE_ROUTER_MODE ?? 'history').toLowerCase()
const history =
  routerMode === 'hash'
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !canAccessProtectedRoutes()) {
    return { name: 'login' }
  }

  return true
})

export default router
