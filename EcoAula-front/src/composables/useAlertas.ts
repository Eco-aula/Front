import { ref, computed } from 'vue'

export type Prioridad = 'alta' | 'media' | 'baja'
export type EstadoAlerta = 'iniciada' | 'proceso' | 'resuelta'

export interface Alerta {
  id: number
  titulo: string
  categoria: string
  fecha: string
  hora: string
  prioridad: Prioridad
  estado: EstadoAlerta
}

export function useAlertas() {
  const filtroPrioridad = ref<'todas' | Prioridad>('todas')

  const alertas = ref<Alerta[]>([
    { id: 1, titulo: 'Orgánico - Exceso de peso',      categoria: 'organico',  fecha: '12/10/2023', hora: '09:45', prioridad: 'alta',  estado: 'iniciada' },
    { id: 2, titulo: 'Papel - Recogida demorada',       categoria: 'papel',     fecha: '11/10/2023', hora: '14:20', prioridad: 'media', estado: 'proceso'  },
    { id: 3, titulo: 'Plástico - Contenedor lleno',     categoria: 'plastico',  fecha: '10/10/2023', hora: '08:30', prioridad: 'baja',  estado: 'resuelta' },
    { id: 4, titulo: 'Vidrio - Rotura en contenedor',   categoria: 'vidrio',    fecha: '09/10/2023', hora: '11:15', prioridad: 'alta',  estado: 'iniciada' },
    { id: 5, titulo: 'Papel - Contenedor saturado',     categoria: 'papel',     fecha: '08/10/2023', hora: '10:00', prioridad: 'media', estado: 'proceso'  },
    { id: 6, titulo: 'Orgánico - Mal almacenamiento',   categoria: 'organico',  fecha: '07/10/2023', hora: '16:45', prioridad: 'alta',  estado: 'iniciada' },
  ])

  // Filtrado por prioridad
  const alertasFiltradas = computed(() =>
    filtroPrioridad.value === 'todas'
      ? alertas.value
      : alertas.value.filter((a) => a.prioridad === filtroPrioridad.value)
  )

  // Paginación
  const currentPage = ref(1)
  const itemsPerPage = 4

  const totalPages = computed(() =>
    Math.ceil(alertasFiltradas.value.length / itemsPerPage)
  )

  const alertasPaginadas = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return alertasFiltradas.value.slice(start, start + itemsPerPage)
  })

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page
  }

  function setFiltro(f: typeof filtroPrioridad.value) {
    filtroPrioridad.value = f
    currentPage.value = 1
  }

  // Estadísticas
  const stats = computed(() => ({
    pendientesCriticas: alertas.value.filter((a) => a.estado === 'iniciada').length,
    enGestion: alertas.value.filter((a) => a.estado === 'proceso').length,
    resueltasHoy: alertas.value.filter((a) => a.estado === 'resuelta').length,
  }))

  // Gestionar una alerta: avanza su estado
  function gestionarAlerta(id: number) {
    const alerta = alertas.value.find((a) => a.id === id)
    if (!alerta) return
    const flujo: EstadoAlerta[] = ['iniciada', 'proceso', 'resuelta']
    const idx = flujo.indexOf(alerta.estado)
    if (idx < flujo.length - 1) {
      const siguiente = flujo[idx + 1]
      if (siguiente) alerta.estado = siguiente
    }
  }

  return {
    filtroPrioridad,
    setFiltro,
    alertasPaginadas,
    alertasFiltradas,
    currentPage,
    totalPages,
    goToPage,
    stats,
    gestionarAlerta,
  }
}
