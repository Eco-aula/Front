import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createPinia } from 'pinia'

import { createAppTestRouter } from '@/__tests__/test-utils/createAppTestRouter'
import App from '@/App.vue'

describe('MVP integration flow', () => {
  it('goes from dashboard to listado, creates a residuo, and sees it listed', async () => {
    const user = userEvent.setup()
    const pinia = createPinia()
    const { router, navigateToInitialPath } = createAppTestRouter('/dashboard')

    render(App, {
      global: {
        plugins: [pinia, router],
      },
    })

    await navigateToInitialPath()
    expect(await screen.findByText('Dashboard General')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Listado' }))
    expect(await screen.findByText('Listado de Residuos')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Registrar' }))
    expect(await screen.findByText('Registro de Residuos')).toBeInTheDocument()

    await user.type(
      screen.getByLabelText('Nombre de quien registra'),
      'Usuario Integracion',
    )
    await user.type(screen.getByLabelText('Cantidad en kilogramos'), '18')
    await user.click(screen.getByText('Metal'))
    await user.click(
      screen.getByRole('button', { name: /Confirmar Registro/i }),
    )

    expect(
      await screen.findByText('Registro creado correctamente.'),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Listado' }))
    expect(await screen.findByRole('cell', { name: 'Metal' })).toBeInTheDocument()
  })
})
