import type { ResiduoApiRecord } from '@/types/residuos'

export const DEFAULT_RESIDUOS: ResiduoApiRecord[] = [
  {
    id: 1,
    wasteType: 'papel',
    quantityKg: 12.5,
    createdAt: '2023-10-24T10:00:00.000Z',
    status: 'pendiente',
    createdBy: 'Sistema',
  },
  {
    id: 2,
    wasteType: 'plastico',
    quantityKg: 8.2,
    createdAt: '2023-10-23T10:00:00.000Z',
    status: 'recogido',
    createdBy: 'Sistema',
  },
  {
    id: 3,
    wasteType: 'quimico',
    quantityKg: 3,
    createdAt: '2023-10-22T10:00:00.000Z',
    status: 'pendiente',
    createdBy: 'Sistema',
  },
  {
    id: 4,
    wasteType: 'organico',
    quantityKg: 45,
    createdAt: '2023-10-22T08:00:00.000Z',
    status: 'recogido',
    createdBy: 'Sistema',
  },
  {
    id: 5,
    wasteType: 'papel',
    quantityKg: 7.5,
    createdAt: '2023-10-21T09:00:00.000Z',
    status: 'recogido',
    createdBy: 'Sistema',
  },
  {
    id: 6,
    wasteType: 'plastico',
    quantityKg: 5,
    createdAt: '2023-10-20T09:00:00.000Z',
    status: 'pendiente',
    createdBy: 'Sistema',
  },
]
