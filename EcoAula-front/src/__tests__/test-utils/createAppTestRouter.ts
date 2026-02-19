import {
  createMemoryHistory,
  createRouter,
  type RouteRecordRaw,
} from 'vue-router'

import AlertasView from '@/views/AlertasView.vue'
import HomeView from '@/views/HomeView.vue'
import ListadoView from '@/views/ListadoView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrarView from '@/views/RegistrarView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: RegistrarView,
  },
  {
    path: '/listado',
    name: 'listado',
    component: ListadoView,
  },
  {
    path: '/alertas',
    name: 'alertas',
    component: AlertasView,
  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
]

export function createAppTestRouter(initialPath = '/dashboard') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  async function navigateToInitialPath() {
    await router.push(initialPath)
    await router.isReady()
  }

  return {
    router,
    navigateToInitialPath,
  }
}
