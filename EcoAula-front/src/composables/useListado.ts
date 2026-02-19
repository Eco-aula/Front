import { ref, computed } from 'vue'

export type EstadoBadge = 'pendiente' | 'recogido'

export interface ResiduoItem {
  id: number
  tipo: string
  icon: string
  cantidad: string
  fecha: string
  estado: EstadoBadge
}

export function useListado() {
  // Filtros
  const filtroPorTipo = ref('todos')
  const filtroRangoFecha = ref('30dias')
  const filtroEstado = ref('todos')

  // Opciones de filtros
  const opcionesTipo = [
    { value: 'todos', label: 'Todos los tipos' },
    { value: 'papel', label: 'Papel y Cartón' },
    { value: 'plastico', label: 'Plásticos (PET)' },
    { value: 'quimico', label: 'Residuos Químicos' },
    { value: 'organico', label: 'Orgánicos' },
  ]

  const opcionesRango = [
    { value: '7dias', label: 'Últimos 7 días' },
    { value: '30dias', label: 'Últimos 30 días' },
    { value: '90dias', label: 'Últimos 90 días' },
  ]

  const opcionesEstado = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'recogido', label: 'Recogido' },
  ]

  // Datos de ejemplo (en el futuro vendrán de una API)
  const residuos = ref<ResiduoItem[]>([
    { id: 1, tipo: 'Papel y Cartón',      icon: 'description', cantidad: '12.5 kg', fecha: '24 Oct, 2023', estado: 'pendiente' },
    { id: 2, tipo: 'Plásticos (PET)',     icon: 'recycling',   cantidad: '8.2 kg',  fecha: '23 Oct, 2023', estado: 'recogido' },
    { id: 3, tipo: 'Residuos Químicos',   icon: 'science',     cantidad: '3.0 kg',  fecha: '22 Oct, 2023', estado: 'pendiente' },
    { id: 4, tipo: 'Orgánicos',           icon: 'restaurant',  cantidad: '45.0 kg', fecha: '22 Oct, 2023', estado: 'recogido' },
    { id: 5, tipo: 'Papel y Cartón',      icon: 'description', cantidad: '7.5 kg',  fecha: '21 Oct, 2023', estado: 'recogido' },
    { id: 6, tipo: 'Plásticos (PET)',     icon: 'recycling',   cantidad: '5.0 kg',  fecha: '20 Oct, 2023', estado: 'pendiente' },
  ])

  // Residuos filtrados según los filtros activos
  const residuosFiltrados = computed(() => {
    return residuos.value.filter((r) => {
      const tipoOk =
        filtroPorTipo.value === 'todos' ||
        r.tipo.toLowerCase().includes(filtroPorTipo.value)
      const estadoOk =
        filtroEstado.value === 'todos' || r.estado === filtroEstado.value
      return tipoOk && estadoOk
    })
  })

  // Paginación
  const currentPage = ref(1)
  const itemsPerPage = 4

  const totalPages = computed(() =>
    Math.ceil(residuosFiltrados.value.length / itemsPerPage)
  )

  const residuosPaginados = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return residuosFiltrados.value.slice(start, start + itemsPerPage)
  })

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  // Estadísticas del footer
  const stats = computed(() => ({
    pendientes: residuos.value.filter((r) => r.estado === 'pendiente').length,
    recogidos: residuos.value.filter((r) => r.estado === 'recogido').length,
    totalKg: residuos.value
      .reduce((acc, r) => acc + parseFloat(r.cantidad), 0)
      .toLocaleString('es-ES', { minimumFractionDigits: 0 }),
  }))

  function aplicarFiltros() {
    currentPage.value = 1
  }

  return {
    // Filtros
    filtroPorTipo,
    filtroRangoFecha,
    filtroEstado,
    opcionesTipo,
    opcionesRango,
    opcionesEstado,
    aplicarFiltros,
    // Tabla
    residuosPaginados,
    residuosFiltrados,
    // Paginación
    currentPage,
    totalPages,
    goToPage,
    // Stats
    stats,
  }
}
