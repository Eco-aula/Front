import { DEFAULT_RESIDUOS } from '@/data/defaultResiduos'
import { resetResiduosDb } from '@/mocks/handlers'
import type { ResiduoApiRecord } from '@/types/residuos'

describe('msw handlers', () => {
  beforeEach(() => {
    resetResiduosDb()
  })

  it('rejects invalid residuo payloads', async () => {
    const response = await fetch('/api/residuos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      message: 'Datos de residuo invalidos.',
    })
  })

  it('creates residuos and persists them in subsequent GET requests', async () => {
    const createResponse = await fetch('/api/residuos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'QA',
        wasteType: 'metal',
        quantityKg: 3,
        createdAt: '2024-01-01T10:00:00.000Z',
        observations: '',
      }),
    })

    expect(createResponse.status).toBe(201)

    const createdResiduo = (await createResponse.json()) as ResiduoApiRecord
    expect(createdResiduo.id).toBeGreaterThan(0)
    expect(createdResiduo.wasteType).toBe('metal')

    const listResponse = await fetch('/api/residuos')
    const payload = (await listResponse.json()) as ResiduoApiRecord[]

    expect(payload[0]?.id).toBe(createdResiduo.id)
  })

  it('resets internal db with a custom seed', async () => {
    const customSeed: ResiduoApiRecord[] = [
      {
        id: 90,
        wasteType: 'papel',
        quantityKg: 2,
        createdAt: '2024-01-01T09:00:00.000Z',
        status: 'pendiente',
        createdBy: 'Seed',
      },
    ]

    resetResiduosDb(customSeed)

    const response = await fetch('/api/residuos')
    const payload = (await response.json()) as ResiduoApiRecord[]

    expect(payload).toEqual(customSeed)

    resetResiduosDb(DEFAULT_RESIDUOS)
  })

  it('rejects invalid auth payloads for login and register', async () => {
    const loginResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: '' }),
    })

    expect(loginResponse.status).toBe(400)
    expect(await loginResponse.json()).toMatchObject({
      message: 'Credenciales incompletas.',
    })

    const registerResponse = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'qa@example.com' }),
    })

    expect(registerResponse.status).toBe(400)
    expect(await registerResponse.json()).toMatchObject({
      message: 'Datos de registro incompletos.',
    })
  })
})
