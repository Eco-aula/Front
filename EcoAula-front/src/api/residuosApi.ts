import { apiClient } from '@/api/apiClient'
import type {
  CreateResiduoRequest,
  CreateResiduoInput,
  ResiduoApiRecord,
  ResiduoItem,
} from '@/types/residuos'
import { toCreateResiduoRequest, toResiduoItem } from '@/utils/residuos'

export async function getResiduos(): Promise<ResiduoItem[]> {
  const response = await apiClient.get<ResiduoApiRecord[]>('/residuos')
  return response.map(toResiduoItem)
}

export async function createResiduo(
  input: CreateResiduoInput,
): Promise<ResiduoItem> {
  const response = await apiClient.post<ResiduoApiRecord, CreateResiduoRequest>(
    '/residuos',
    toCreateResiduoRequest(input),
  )
  return toResiduoItem(response)
}
