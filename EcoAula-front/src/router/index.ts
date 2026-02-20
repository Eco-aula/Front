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

function resolveRouterMode(): 'hash' | 'history' {
  const explicitMode = (import.meta.env.VITE_ROUTER_MODE ?? '').toLowerCase()
  if (explicitMode === 'hash' || explicitMode === 'history') {
    return explicitMode
  }

  if (
    typeof window !== 'undefined' &&
    window.location.hostname.toLowerCase().endsWith('github.io')
  ) {
    return 'hash'
  }

  return 'history'
}

const routerMode = resolveRouterMode()
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
