import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createPinia } from 'pinia'

import { createAppTestRouter } from '@/__tests__/test-utils/createAppTestRouter'
import App from '@/App.vue'

describe('App route smoke tests', () => {
  it('renders login route and toggles between login and register forms', async () => {
    const user = userEvent.setup()
    const pinia = createPinia()
    const { router, navigateToInitialPath } = createAppTestRouter('/')

    render(App, {
      global: {
        plugins: [pinia, router],
      },
    })

    await navigateToInitialPath()

    expect(await screen.findByText('Bienvenido de nuevo')).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /Reg/i }))
    expect(await screen.findByText('Crear cuenta')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /Inicie/i }))
    expect(await screen.findByText('Bienvenido de nuevo')).toBeInTheDocument()
  })

  it('renders alertas route and allows progressing alert workflow', async () => {
    const user = userEvent.setup()
    const pinia = createPinia()
    const { router, navigateToInitialPath } = createAppTestRouter('/alertas')

    render(App, {
      global: {
        plugins: [pinia, router],
      },
    })

    await navigateToInitialPath()
    expect(
      await screen.findByRole('heading', { name: /alertas/i }),
    ).toBeInTheDocument()

    const closedBefore = screen.getAllByText('Cerrada').length

    let gestionarButtons = await screen.findAllByRole('button', {
      name: 'Gestionar',
    })
    await user.click(gestionarButtons[0])

    gestionarButtons = await screen.findAllByRole('button', {
      name: 'Gestionar',
    })
    await user.click(gestionarButtons[0])

    const closedAfter = (await screen.findAllByText('Cerrada')).length
    expect(closedAfter).toBe(closedBefore + 1)
  })
})
