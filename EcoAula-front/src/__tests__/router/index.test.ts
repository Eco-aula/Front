import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router, { routes } from '@/router'
import {
  resetAuthAccessChecker,
  setAuthAccessChecker,
} from '@/router/authGuard'

async function renderWithRouter(initialPath: string) {
  render(App, {
    global: {
      plugins: [createPinia(), router],
    },
  })

  await router.push(initialPath)
  await router.isReady()
}

describe('app router', () => {
  beforeEach(async () => {
    resetAuthAccessChecker()
    await router.push('/')
    await router.isReady()
  })

  afterEach(() => {
    resetAuthAccessChecker()
  })

  it('registers expected routes including redirect and catch-all', () => {
    const routePaths = routes.map((route) => route.path)

    expect(routePaths).toEqual(
      expect.arrayContaining([
        '/',
        '/dashboard',
        '/registrar',
        '/listado',
        '/alertas',
        '/home',
        '/:pathMatch(.*)*',
      ]),
    )
  })

  it('renders each main route component', async () => {
    await renderWithRouter('/dashboard')
    expect(await screen.findByText('Dashboard General')).toBeInTheDocument()

    await router.push('/registrar')
    expect(await screen.findByText('Registro de Residuos')).toBeInTheDocument()

    await router.push('/listado')
    expect(await screen.findByText('Listado de Residuos')).toBeInTheDocument()

    await router.push('/alertas')
    expect(
      await screen.findByRole('heading', { name: /alertas/i }),
    ).toBeInTheDocument()

    await router.push('/')
    expect(await screen.findByText('Bienvenido de nuevo')).toBeInTheDocument()
  })

  it('redirects from /home to /dashboard', async () => {
    await renderWithRouter('/home')

    expect(router.currentRoute.value.path).toBe('/dashboard')
    expect(await screen.findByText('Dashboard General')).toBeInTheDocument()
  })

  it('redirects unknown paths to login', async () => {
    await renderWithRouter('/ruta-inexistente')

    expect(router.currentRoute.value.name).toBe('login')
    expect(await screen.findByText('Bienvenido de nuevo')).toBeInTheDocument()
  })

  it('allows protected route navigation when guard passes', async () => {
    setAuthAccessChecker(() => true)

    await renderWithRouter('/dashboard')

    expect(router.currentRoute.value.path).toBe('/dashboard')
    expect(await screen.findByText('Dashboard General')).toBeInTheDocument()
  })

  it('denies protected route navigation when guard fails', async () => {
    setAuthAccessChecker(() => false)

    await renderWithRouter('/dashboard')

    expect(router.currentRoute.value.name).toBe('login')
    expect(await screen.findByText('Bienvenido de nuevo')).toBeInTheDocument()
  })
})
