import { getContainersSummary } from '@/api/containersApi'
import { createWaste, deleteWaste } from '@/api/wastesApi'
import type {
  CreateResiduoRequest,
  CreateResiduoInput,
  ResiduoApiRecord,
  ResiduoItem,
} from '@/types/residuos'
import { toCreateResiduoRequest, toResiduoItem } from '@/utils/residuos'

export async function getResiduos(): Promise<ResiduoItem[]> {
  const summary = await getContainersSummary()
  return summary.map((container, index) => {
    const syntheticRecord: ResiduoApiRecord = {
      id: -(index + 1),
      name: `Contenedor ${index + 1}`,
      description: 'Resumen operativo',
      heavy: 0,
      category: container.category,
      date: new Date().toISOString(),
      status:
        container.state === 'FULL' || container.state === 'LIMIT'
          ? 'pendiente'
          : 'recogido',
    }

    return toResiduoItem(syntheticRecord)
  })
}

export async function createResiduo(
  input: CreateResiduoInput,
): Promise<ResiduoItem> {
  const requestPayload: CreateResiduoRequest = toCreateResiduoRequest(input)
  const response = await createWaste(requestPayload)

  return toResiduoItem({
    ...response,
    status: 'pendiente',
  })
}

export function deleteResiduo(id: number): Promise<void> {
  return deleteWaste(id)
}
