import {
  resetCategoryVolumeDb,
  resetContainersSummaryDb,
  resetUsersDb,
  resetWastesDb,
} from '@/mocks/handlers'

describe('msw handlers', () => {
  beforeEach(() => {
    resetWastesDb()
    resetUsersDb()
    resetContainersSummaryDb()
    resetCategoryVolumeDb()
  })

  it('rejects invalid waste payloads', async () => {
    const response = await fetch('http://localhost:8080/api/v1/wastes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      message: 'Datos de residuo invalidos.',
      path: '/api/v1/wastes',
    })
  })

  it('creates wastes with backend shape', async () => {
    const createResponse = await fetch('http://localhost:8080/api/v1/wastes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'QA',
        description: 'Limpio',
        heavy: 3,
        category: 'METAL',
      }),
    })

    expect(createResponse.status).toBe(201)

    const createdWaste = (await createResponse.json()) as {
      id: number
      category: string
      heavy: number
    }

    expect(createdWaste.id).toBeGreaterThan(0)
    expect(createdWaste.category).toBe('METAL')
    expect(createdWaste.heavy).toBe(3)
  })

  it('returns summary and volume datasets from containers endpoints', async () => {
    const summaryResponse = await fetch(
      'http://localhost:8080/api/v1/containers/summary',
    )
    const volumeResponse = await fetch(
      'http://localhost:8080/api/v1/containers/volume-by-category',
    )

    expect(summaryResponse.status).toBe(200)
    expect(volumeResponse.status).toBe(200)

    const summary = (await summaryResponse.json()) as Array<{
      category: string
      state: string
    }>
    const volumes = (await volumeResponse.json()) as Array<{
      category: string
      totalWeight: number
    }>

    expect(summary.length).toBeGreaterThan(0)
    expect(summary[0]).toHaveProperty('state')
    expect(volumes.length).toBeGreaterThan(0)
    expect(volumes[0]).toHaveProperty('totalWeight')
  })

  it('rejects invalid user payloads and returns 404 for missing user id', async () => {
    const createResponse = await fetch('http://localhost:8080/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'qa@example.com' }),
    })

    expect(createResponse.status).toBe(400)
    expect(await createResponse.json()).toMatchObject({
      message: 'Datos de usuario incompletos.',
      path: '/api/v1/users',
    })

    const getResponse = await fetch('http://localhost:8080/api/v1/users/9999')
    expect(getResponse.status).toBe(404)
    expect(await getResponse.json()).toMatchObject({
      message: 'Usuario no encontrado',
      path: '/api/v1/users/9999',
    })
  })
})
