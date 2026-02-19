export const RESIDUO_STATUS_VALUES = ['pendiente', 'recogido'] as const

export type EstadoBadge = (typeof RESIDUO_STATUS_VALUES)[number]

export const WASTE_TYPE_VALUES = [
  'papel',
  'plastico',
  'vidrio',
  'organico',
  'carton',
  'metal',
  'quimico',
] as const

export type WasteTypeValue = (typeof WASTE_TYPE_VALUES)[number]

export interface ResiduoItem {
  id: number
  tipo: string
  icon: string
  cantidad: string
  fecha: string
  estado: EstadoBadge
}

export interface ResiduoApiRecord {
  id: number
  wasteType: string
  quantityKg: number
  createdAt: string
  status: EstadoBadge
  createdBy: string
  observations?: string
}

export interface CreateResiduoInput {
  name: string
  wasteType: string
  quantity: number
  date: string
  observations: string
}

export interface CreateResiduoRequest {
  name: string
  wasteType: string
  quantityKg: number
  createdAt: string
  observations: string
}

export interface RegistrarFormData {
  name: string
  wasteType: string
  quantity: string
  date: Date
  observations: string
}
