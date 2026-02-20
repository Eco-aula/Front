import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createPinia } from 'pinia'

import RegistrarForm from '@/components/registrar/RegistrarForm.vue'

describe('RegistrarForm', () => {
  it('validates required form fields before submit', async () => {
    const user = userEvent.setup()

    render(RegistrarForm, {
      global: {
        plugins: [createPinia()],
      },
    })

    await user.click(
      screen.getByRole('button', { name: /Confirmar Registro/i }),
    )

    expect(
      await screen.findByText('Ingrese un nombre valido (minimo 3 caracteres).'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Ingrese una cantidad mayor que 0.'),
    ).toBeInTheDocument()
  })

  it('submits a valid payload and shows success message', async () => {
    const user = userEvent.setup()

    render(RegistrarForm, {
      global: {
        plugins: [createPinia()],
      },
    })

    await user.type(
      screen.getByLabelText('Nombre de quien registra'),
      'Laura QA',
    )
    await user.type(screen.getByLabelText('Cantidad en kilogramos'), '14.7')
    await user.click(screen.getByText('Metal'))
    await user.click(
      screen.getByRole('button', { name: /Confirmar Registro/i }),
    )

    expect(
      await screen.findByText('Registro creado correctamente.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre de quien registra')).toHaveValue('')
  })
})
