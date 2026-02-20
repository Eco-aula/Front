export const RESIDUO_STATUS_VALUES = ['pendiente', 'recogido'] as const

export type EstadoBadge = (typeof RESIDUO_STATUS_VALUES)[number]

export type WasteCategory =
  | 'PLASTIC'
  | 'GLASS'
  | 'CARDBOARD'
  | 'ORGANIC'
  | 'PAPER'
  | 'METAL'

export const WASTE_TYPE_VALUES = [
  'papel',
  'plastico',
  'vidrio',
  'organico',
  'carton',
  'metal',
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
  name: string
  description: string
  heavy: number
  category: WasteCategory
  date?: string
  status?: EstadoBadge
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
  description: string
  heavy: number
  category: WasteCategory
}

export interface RegistrarFormData {
  name: string
  wasteType: string
  quantity: string
  date: Date
  observations: string
}
