import { computed, onMounted, ref, watch } from 'vue'

import { useResiduosStore } from '@/stores/residuos'
import { getWasteTypeKeyFromLabel } from '@/utils/residuos'

export type { EstadoBadge, ResiduoItem } from '@/types/residuos'

export function useListado() {
  const residuosStore = useResiduosStore()

  const filtroPorTipo = ref('todos')
  const filtroRangoFecha = ref('30dias')
  const filtroEstado = ref('todos')

  const opcionesTipo = [
    { value: 'todos', label: 'Todos los tipos' },
    { value: 'papel', label: 'Papel y Carton' },
    { value: 'carton', label: 'Carton' },
    { value: 'plastico', label: 'Plasticos (PET)' },
    { value: 'organico', label: 'Organicos' },
    { value: 'vidrio', label: 'Vidrio' },
    { value: 'metal', label: 'Metal' },
  ]

  const opcionesRango = [
    { value: '7dias', label: 'Ultimos 7 dias' },
    { value: '30dias', label: 'Ultimos 30 dias' },
    { value: '90dias', label: 'Ultimos 90 dias' },
  ]

  const opcionesEstado = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'recogido', label: 'Recogido' },
  ]

  const residuosFiltrados = computed(() => {
    return residuosStore.items.filter((residuo) => {
      const tipoKey = getWasteTypeKeyFromLabel(residuo.tipo)
      const tipoOk =
        filtroPorTipo.value === 'todos' || tipoKey === filtroPorTipo.value
      const estadoOk =
        filtroEstado.value === 'todos' || residuo.estado === filtroEstado.value
      return tipoOk && estadoOk
    })
  })

  const currentPage = ref(1)
  const itemsPerPage = 4

  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(residuosFiltrados.value.length / itemsPerPage))
  })

  const residuosPaginados = computed(() => {
    if (residuosFiltrados.value.length === 0) {
      return []
    }

    const start = (currentPage.value - 1) * itemsPerPage
    return residuosFiltrados.value.slice(start, start + itemsPerPage)
  })

  watch(totalPages, (newTotalPages) => {
    if (currentPage.value > newTotalPages) {
      currentPage.value = newTotalPages
    }
  })

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function aplicarFiltros() {
    currentPage.value = 1
  }

  async function eliminarResiduo(id: number) {
    await residuosStore.deleteResiduo(id)
  }

  async function recargar() {
    await residuosStore.fetchResiduos(true)
  }

  const stats = computed(() => ({
    pendientes: residuosStore.items.filter((residuo) => residuo.estado === 'pendiente')
      .length,
    recogidos: residuosStore.items.filter((residuo) => residuo.estado === 'recogido')
      .length,
    totalKg: residuosStore.items
      .reduce((acc, residuo) => {
        return acc + Number.parseFloat(residuo.cantidad)
      }, 0)
      .toLocaleString('es-ES', { minimumFractionDigits: 0 }),
  }))

  const loading = computed(() => residuosStore.loading)
  const error = computed(() => residuosStore.error)
  const isEmpty = computed(() => {
    return (
      residuosStore.hasLoaded &&
      !residuosStore.loading &&
      !residuosStore.error &&
      residuosFiltrados.value.length === 0
    )
  })

  onMounted(() => {
    void residuosStore.fetchResiduos()
  })

  return {
    filtroPorTipo,
    filtroRangoFecha,
    filtroEstado,
    opcionesTipo,
    opcionesRango,
    opcionesEstado,
    aplicarFiltros,
    eliminarResiduo,
    residuosPaginados,
    residuosFiltrados,
    currentPage,
    totalPages,
    goToPage,
    stats,
    loading,
    error,
    isEmpty,
    recargar,
  }
}
