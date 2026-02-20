import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { ApiError } from '@/api/apiClient'
import {
  createResiduo as createResiduoRequest,
  deleteResiduo as deleteResiduoRequest,
  getResiduos,
} from '@/api/residuosApi'
import { DEFAULT_RESIDUOS } from '@/data/defaultResiduos'
import type { CreateResiduoInput, ResiduoItem } from '@/types/residuos'
import { buildLocalResiduo, toResiduoItem } from '@/utils/residuos'

export const useResiduosStore = defineStore('residuos', () => {
  const items = ref<ResiduoItem[]>([])
  const loading = ref(false)
  const creating = ref(false)
  const error = ref<string | null>(null)
  const hasLoaded = ref(false)

  async function fetchResiduos(force = false): Promise<void> {
    if (loading.value || (hasLoaded.value && !force)) {
      return
    }

    loading.value = true
    error.value = null

    try {
      items.value = await getResiduos()
      hasLoaded.value = true
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        items.value = []
        error.value = caughtError.message
        hasLoaded.value = true
        return
      }

      // Fallback local para no romper la experiencia en desarrollo sin backend.
      items.value = DEFAULT_RESIDUOS.map(toResiduoItem)
      error.value = null
      hasLoaded.value = true
    } finally {
      loading.value = false
    }
  }

  function getNextLocalId(): number {
    return (
      items.value.reduce((maxId, currentItem) => {
        return Math.max(maxId, currentItem.id)
      }, 0) + 1
    )
  }

  async function createResiduo(input: CreateResiduoInput): Promise<ResiduoItem> {
    creating.value = true
    error.value = null

    try {
      const created = await createResiduoRequest(input)
      items.value = [created, ...items.value]
      return created
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        error.value = caughtError.message
        throw caughtError
      }

      const localItem = buildLocalResiduo(input, getNextLocalId())
      items.value = [localItem, ...items.value]
      return localItem
    } finally {
      creating.value = false
    }
  }

  async function deleteResiduo(id: number): Promise<void> {
    error.value = null

    const existingIndex = items.value.findIndex((item) => item.id === id)
    if (existingIndex === -1) {
      return
    }

    const removedItem = items.value[existingIndex]!
    items.value.splice(existingIndex, 1)

    // Synthetic items come from container summary and are local-only.
    if (id <= 0) {
      return
    }

    try {
      await deleteResiduoRequest(id)
    } catch (caughtError) {
      items.value.splice(existingIndex, 0, removedItem)

      if (caughtError instanceof ApiError) {
        error.value = caughtError.message
      } else {
        error.value = 'No se pudo eliminar el residuo. Intente nuevamente.'
      }

      throw caughtError
    }
  }

  const hasItems = computed(() => items.value.length > 0)

  return {
    items,
    loading,
    creating,
    error,
    hasLoaded,
    hasItems,
    fetchResiduos,
    createResiduo,
    deleteResiduo,
  }
})
