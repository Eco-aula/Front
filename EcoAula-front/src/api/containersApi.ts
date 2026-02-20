import { apiClient } from '@/api/apiClient'
import type { WasteCategory } from '@/types/residuos'

export type ContainerState = 'EMPTY' | 'LIMIT' | 'FULL' | 'RECYCLING'

export interface ContainerSummaryRecord {
  category: WasteCategory
  state: ContainerState
}

export interface CategoryVolumeRecord {
  category: WasteCategory
  totalWeight: number
}

export interface ContainerStatusRecord {
  id: number
  fillPercentage: number
  state: ContainerState
}

export interface UpdateFillRequest {
  percentage: number
}

export async function getContainersSummary(): Promise<ContainerSummaryRecord[]> {
  const response = await apiClient.get<ContainerSummaryRecord[] | undefined>(
    '/containers/summary',
  )
  return response ?? []
}

export async function getVolumeByCategory(): Promise<CategoryVolumeRecord[]> {
  const response = await apiClient.get<CategoryVolumeRecord[] | undefined>(
    '/containers/volume-by-category',
  )
  return response ?? []
}

export function getContainerStatus(id: number): Promise<ContainerStatusRecord> {
  return apiClient.get<ContainerStatusRecord>(`/containers/${id}/status`)
}

export function updateContainerFill(
  id: number,
  request: UpdateFillRequest,
): Promise<void> {
  return apiClient.put<void, UpdateFillRequest>(`/containers/${id}/fill`, request)
}

export function startContainerRecycling(id: number): Promise<void> {
  return apiClient.patch<void, Record<string, never>>(
    `/containers/${id}/recycling`,
    {},
  )
}

export function emptyContainer(id: number): Promise<void> {
  return apiClient.patch<void, Record<string, never>>(`/containers/${id}/empty`, {})
}
