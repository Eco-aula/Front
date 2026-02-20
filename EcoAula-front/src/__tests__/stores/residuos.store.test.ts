import { createPinia, setActivePinia } from 'pinia'
import { delay, http, HttpResponse } from 'msw'

import { server } from '@/mocks/server'
import { useResiduosStore } from '@/stores/residuos'

describe('useResiduosStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('exposes expected initial state and getter values', () => {
    const store = useResiduosStore()

    expect(store.items).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.creating).toBe(false)
    expect(store.error).toBeNull()
    expect(store.hasLoaded).toBe(false)
    expect(store.hasItems).toBe(false)
  })

  it('loads residuos from api', async () => {
    const store = useResiduosStore()

    await store.fetchResiduos()

    expect(store.error).toBeNull()
    expect(store.items.length).toBeGreaterThan(0)
    expect(store.hasLoaded).toBe(true)
  })

  it('handles api http errors', async () => {
    server.use(
      http.get('*/api/v1/containers/summary', () => {
        return HttpResponse.json(
          { message: 'Error interno del servidor' },
          { status: 500 },
        )
      }),
    )

    const store = useResiduosStore()
    await store.fetchResiduos(true)

    expect(store.items).toEqual([])
    expect(store.error).toBe('Error interno del servidor')
  })

  it('falls back to local seed data on network errors', async () => {
    server.use(
      http.get('*/api/v1/containers/summary', () => {
        return HttpResponse.error()
      }),
    )

    const store = useResiduosStore()
    await store.fetchResiduos(true)

    expect(store.error).toBeNull()
    expect(store.items.length).toBeGreaterThan(0)
  })

  it('does not reload once loaded unless force=true', async () => {
    const store = useResiduosStore()
    await store.fetchResiduos()

    server.use(
      http.get('*/api/v1/containers/summary', () => {
        return HttpResponse.json({ message: 'Fallo en recarga' }, { status: 500 })
      }),
    )

    await store.fetchResiduos()
    expect(store.error).toBeNull()

    await store.fetchResiduos(true)
    expect(store.error).toBe('Fallo en recarga')
  })

  it('avoids duplicate concurrent requests while loading', async () => {
    let requestCount = 0

    server.use(
      http.get('*/api/v1/containers/summary', async () => {
        requestCount += 1
        await delay(120)
        return HttpResponse.json([], { status: 200 })
      }),
    )

    const store = useResiduosStore()

    const fetchA = store.fetchResiduos(true)
    const fetchB = store.fetchResiduos(true)
    await Promise.all([fetchA, fetchB])

    expect(requestCount).toBe(1)
    expect(store.loading).toBe(false)
  })

  it('creates residuos and prepends them to the list', async () => {
    const store = useResiduosStore()
    await store.fetchResiduos()

    const created = await store.createResiduo({
      name: 'QA Bot',
      wasteType: 'metal',
      quantity: 11,
      date: '2024-01-10T10:30:00.000Z',
      observations: 'Integracion',
    })

    expect(store.error).toBeNull()
    expect(store.items[0]?.id).toBe(created.id)
    expect(store.items[0]?.tipo).toBe('Metal')
    expect(store.items[0]?.estado).toBe('pendiente')
    expect(store.hasItems).toBe(true)
  })

  it('surfaces api errors when create fails with backend status', async () => {
    server.use(
      http.post('*/api/v1/wastes', () => {
        return HttpResponse.json({ message: 'No autorizado' }, { status: 500 })
      }),
    )

    const store = useResiduosStore()

    await expect(
      store.createResiduo({
        name: 'QA Bot',
        wasteType: 'metal',
        quantity: 11,
        date: '2024-01-10T10:30:00.000Z',
        observations: 'Integracion',
      }),
    ).rejects.toThrow('No autorizado')

    expect(store.creating).toBe(false)
    expect(store.error).toBe('No autorizado')
  })

  it('creates local fallback item on network errors', async () => {
    server.use(
      http.post('*/api/v1/wastes', () => {
        return HttpResponse.error()
      }),
    )

    const store = useResiduosStore()

    const created = await store.createResiduo({
      name: 'QA Bot',
      wasteType: 'metal',
      quantity: 11,
      date: '2024-01-10T10:30:00.000Z',
      observations: 'Integracion',
    })

    expect(created.id).toBeGreaterThan(0)
    expect(created.tipo).toBe('Metal')
    expect(store.items[0]?.id).toBe(created.id)
    expect(store.creating).toBe(false)
    expect(store.error).toBeNull()
  })
})
