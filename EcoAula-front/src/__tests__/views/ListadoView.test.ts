import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createPinia } from 'pinia'
import { delay, http, HttpResponse } from 'msw'

import { DEFAULT_RESIDUOS } from '@/data/defaultResiduos'
import { server } from '@/mocks/server'
import ListadoView from '@/views/ListadoView.vue'

describe('ListadoView', () => {
  it('renders loading and then table data', async () => {
    server.use(
      http.get('/api/residuos', async () => {
        await delay(120)
        return HttpResponse.json(DEFAULT_RESIDUOS, { status: 200 })
      }),
    )

    render(ListadoView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(await screen.findByText('Cargando residuos...')).toBeInTheDocument()
    expect(
      await screen.findByRole('cell', { name: /Papel y Carton/i }),
    ).toBeInTheDocument()
  })

  it('renders empty state when api returns no residuos', async () => {
    server.use(
      http.get('/api/residuos', () => {
        return HttpResponse.json([], { status: 200 })
      }),
    )

    render(ListadoView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(
      await screen.findByText(
        'No hay residuos registrados para los filtros seleccionados.',
      ),
    ).toBeInTheDocument()
  })

  it('renders error and retries successfully', async () => {
    const user = userEvent.setup()
    let shouldFail = true

    server.use(
      http.get('/api/residuos', () => {
        if (shouldFail) {
          return HttpResponse.json(
            { message: 'Servicio temporalmente no disponible' },
            { status: 500 },
          )
        }
        return HttpResponse.json(DEFAULT_RESIDUOS, { status: 200 })
      }),
    )

    render(ListadoView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(
      await screen.findByText('Servicio temporalmente no disponible'),
    ).toBeInTheDocument()

    shouldFail = false
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))

    expect(
      await screen.findByRole('cell', { name: /Papel y Carton/i }),
    ).toBeInTheDocument()
  })

  it('renders not found errors from api', async () => {
    server.use(
      http.get('/api/residuos', () => {
        return HttpResponse.json({ message: 'No encontrado' }, { status: 404 })
      }),
    )

    render(ListadoView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(await screen.findByText('No encontrado')).toBeInTheDocument()
  })

  it('filters the table using listado filters interactions', async () => {
    const user = userEvent.setup()

    render(ListadoView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(
      await screen.findByRole('cell', { name: /Papel y Carton/i }),
    ).toBeInTheDocument()

    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[0], 'plastico')
    await user.selectOptions(selects[1], '7dias')
    await user.selectOptions(selects[2], 'pendiente')
    await user.click(screen.getByRole('button', { name: /filtrar/i }))

    expect(screen.queryByRole('cell', { name: /Papel y Carton/i })).toBeNull()
    expect(
      await screen.findByRole('cell', { name: /Plasticos \(PET\)/i }),
    ).toBeInTheDocument()
  })
})
