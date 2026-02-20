import { apiClient } from '@/api/apiClient'
import type { WasteCategory } from '@/types/residuos'

export interface WasteRecord {
  id: number
  name: string
  description: string
  heavy: number
  category: WasteCategory
  date?: string
}

export interface CreateWasteRequest {
  name: string
  description: string
  heavy: number
  category: WasteCategory
}

export interface UpdateWasteRequest {
  name: string
  description: string
  heavy: number
  category: WasteCategory
}

export function createWaste(request: CreateWasteRequest): Promise<WasteRecord> {
  return apiClient.post<WasteRecord, CreateWasteRequest>('/wastes', request)
}

export function updateWaste(
  id: number,
  request: UpdateWasteRequest,
): Promise<WasteRecord> {
  return apiClient.put<WasteRecord, UpdateWasteRequest>(`/wastes/${id}`, request)
}

export function deleteWaste(id: number): Promise<void> {
  return apiClient.delete(`/wastes/${id}`)
}
