import { http, HttpResponse } from 'msw'

import { DEFAULT_RESIDUOS } from '@/data/defaultResiduos'
import type { CreateResiduoRequest, ResiduoApiRecord } from '@/types/residuos'

function cloneResiduoArray(
  residuos: ResiduoApiRecord[],
): ResiduoApiRecord[] {
  return residuos.map((residuo) => ({ ...residuo }))
}

let residuosDb: ResiduoApiRecord[] = cloneResiduoArray(DEFAULT_RESIDUOS)

export function resetResiduosDb(seed = DEFAULT_RESIDUOS) {
  residuosDb = cloneResiduoArray(seed)
}

function getNextResiduoId(): number {
  return (
    residuosDb.reduce((maxId, residuo) => {
      return Math.max(maxId, residuo.id)
    }, 0) + 1
  )
}

export const handlers = [
  http.get('/api/residuos', () => {
    return HttpResponse.json(residuosDb, { status: 200 })
  }),

  http.post('/api/residuos', async ({ request }) => {
    const body = (await request.json()) as Partial<CreateResiduoRequest>

    if (
      !body.name ||
      !body.wasteType ||
      typeof body.quantityKg !== 'number' ||
      body.quantityKg <= 0 ||
      !body.createdAt
    ) {
      return HttpResponse.json(
        { message: 'Datos de residuo invalidos.' },
        { status: 400 },
      )
    }

    const createdResiduo: ResiduoApiRecord = {
      id: getNextResiduoId(),
      wasteType: body.wasteType,
      quantityKg: body.quantityKg,
      createdAt: body.createdAt,
      status: 'pendiente',
      createdBy: body.name,
      observations: body.observations ?? '',
    }

    residuosDb = [createdResiduo, ...residuosDb]

    return HttpResponse.json(createdResiduo, { status: 201 })
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as Partial<{
      email: string
      password: string
    }>

    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: 'Credenciales incompletas.' },
        { status: 400 },
      )
    }

    return HttpResponse.json(
      {
        token: 'mock-token-login',
        user: {
          id: 10,
          name: 'Usuario Login',
          email: body.email,
        },
      },
      { status: 200 },
    )
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as Partial<{
      name: string
      email: string
      password: string
    }>

    if (!body.name || !body.email || !body.password) {
      return HttpResponse.json(
        { message: 'Datos de registro incompletos.' },
        { status: 400 },
      )
    }

    return HttpResponse.json(
      {
        token: 'mock-token-register',
        user: {
          id: 11,
          name: body.name,
          email: body.email,
        },
      },
      { status: 201 },
    )
  }),
]
