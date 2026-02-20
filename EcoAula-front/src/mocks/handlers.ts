import { http, HttpResponse } from 'msw'

import { DEFAULT_RESIDUOS } from '@/data/defaultResiduos'
import type { WasteCategory } from '@/types/residuos'

const API_BASE = '*/api/v1'

interface SummaryRecord {
  category: WasteCategory
  state: 'EMPTY' | 'LIMIT' | 'FULL' | 'RECYCLING'
}

interface VolumeRecord {
  category: WasteCategory
  totalWeight: number
}

interface UserRecord {
  id: number
  name: string
  email: string
  password: string
}

interface WasteRecord {
  id: number
  name: string
  description: string
  heavy: number
  category: WasteCategory
  date: string
}

const validCategories: WasteCategory[] = [
  'PAPER',
  'PLASTIC',
  'GLASS',
  'ORGANIC',
  'CARDBOARD',
  'METAL',
]

function cloneWastes(seed: WasteRecord[]) {
  return seed.map((item) => ({ ...item }))
}

function cloneUsers(seed: UserRecord[]) {
  return seed.map((item) => ({ ...item }))
}

const defaultWastesSeed: WasteRecord[] = DEFAULT_RESIDUOS.map((item) => ({
  id: item.id,
  name: item.name,
  description: item.description,
  heavy: item.heavy,
  category: item.category,
  date: item.date ?? '01-01-2024',
}))

const defaultUsersSeed: UserRecord[] = [
  {
    id: 1,
    name: 'Usuario Demo',
    email: 'demo@ecoaula.com',
    password: '123456',
  },
]

let usersDb: UserRecord[] = cloneUsers(defaultUsersSeed)
let wastesDb: WasteRecord[] = cloneWastes(defaultWastesSeed)

const defaultContainersSummarySeed: SummaryRecord[] = [
  { category: 'PAPER', state: 'LIMIT' },
  { category: 'PLASTIC', state: 'FULL' },
  { category: 'GLASS', state: 'EMPTY' },
  { category: 'ORGANIC', state: 'RECYCLING' },
]

const defaultCategoryVolumeSeed: VolumeRecord[] = [
  { category: 'PAPER', totalWeight: 120.5 },
  { category: 'PLASTIC', totalWeight: 88.1 },
  { category: 'GLASS', totalWeight: 54.2 },
  { category: 'ORGANIC', totalWeight: 31.8 },
]

let containersSummaryDb: SummaryRecord[] = defaultContainersSummarySeed.map(
  (item) => ({ ...item }),
)
let categoryVolumeDb: VolumeRecord[] = defaultCategoryVolumeSeed.map((item) => ({
  ...item,
}))

export function resetUsersDb(seed = defaultUsersSeed) {
  usersDb = cloneUsers(seed)
}

export function resetWastesDb(seed = defaultWastesSeed) {
  wastesDb = cloneWastes(seed)
}

export function resetContainersSummaryDb(seed = defaultContainersSummarySeed) {
  containersSummaryDb = seed.map((item) => ({ ...item }))
}

export function resetCategoryVolumeDb(seed = defaultCategoryVolumeSeed) {
  categoryVolumeDb = seed.map((item) => ({ ...item }))
}

function getNextId(records: Array<{ id: number }>): number {
  return records.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1
}

function buildErrorPayload(status: number, message: string, path: string) {
  return {
    timestamp: new Date().toISOString(),
    status,
    error:
      status === 400
        ? 'Bad Request'
        : status === 404
          ? 'Not Found'
          : status === 409
            ? 'Conflict'
            : 'Internal Server Error',
    message,
    path,
  }
}

export const handlers = [
  http.get(`${API_BASE}/containers/summary`, () => {
    if (containersSummaryDb.length === 0) {
      return new HttpResponse(null, { status: 204 })
    }

    return HttpResponse.json(containersSummaryDb, { status: 200 })
  }),

  http.get(`${API_BASE}/containers/volume-by-category`, () => {
    if (categoryVolumeDb.length === 0) {
      return new HttpResponse(null, { status: 204 })
    }

    return HttpResponse.json(categoryVolumeDb, { status: 200 })
  }),

  http.post(`${API_BASE}/users`, async ({ request }) => {
    const body = (await request.json()) as Partial<UserRecord>

    if (!body.name || !body.email || !body.password) {
      return HttpResponse.json(
        buildErrorPayload(400, 'Datos de usuario incompletos.', '/api/v1/users'),
        { status: 400 },
      )
    }

    const duplicated = usersDb.find((user) => user.email === body.email)
    if (duplicated) {
      return HttpResponse.json(
        buildErrorPayload(409, 'El correo ya existe.', '/api/v1/users'),
        { status: 409 },
      )
    }

    const createdUser: UserRecord = {
      id: getNextId(usersDb),
      name: body.name,
      email: body.email,
      password: body.password,
    }

    usersDb = [...usersDb, createdUser]

    return HttpResponse.json(createdUser, { status: 201 })
  }),

  http.get(`${API_BASE}/users/:id`, ({ params }) => {
    const id = Number(params.id)
    const user = usersDb.find((item) => item.id === id)

    if (!user) {
      return HttpResponse.json(
        buildErrorPayload(404, 'Usuario no encontrado', `/api/v1/users/${id}`),
        { status: 404 },
      )
    }

    return HttpResponse.json(user, { status: 200 })
  }),

  http.post(`${API_BASE}/wastes`, async ({ request }) => {
    const body = (await request.json()) as Partial<WasteRecord>

    if (
      !body.name ||
      typeof body.heavy !== 'number' ||
      body.heavy <= 0 ||
      !body.category ||
      !validCategories.includes(body.category)
    ) {
      return HttpResponse.json(
        buildErrorPayload(400, 'Datos de residuo invalidos.', '/api/v1/wastes'),
        { status: 400 },
      )
    }

    const createdWaste: WasteRecord = {
      id: getNextId(wastesDb),
      name: body.name,
      description: body.description ?? '',
      heavy: body.heavy,
      category: body.category,
      date: new Date().toISOString().slice(0, 10).split('-').reverse().join('-'),
    }

    wastesDb = [createdWaste, ...wastesDb]

    return HttpResponse.json(createdWaste, { status: 201 })
  }),
]
