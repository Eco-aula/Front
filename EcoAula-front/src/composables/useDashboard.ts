import { getCurrentInstance, onMounted, ref } from 'vue'

import { ApiError } from '@/api/apiClient'
import {
  getContainersSummary,
  getVolumeByCategory,
  type ContainerSummaryRecord,
  type ContainerState,
} from '@/api/containersApi'
import type { WasteCategory } from '@/types/residuos'

function formatCategoryLabel(category: WasteCategory): string {
  const dictionary: Record<WasteCategory, string> = {
    PAPER: 'Papel y Carton',
    CARDBOARD: 'Papel y Carton',
    PLASTIC: 'Plasticos (PET)',
    ORGANIC: 'Organicos',
    GLASS: 'Vidrio',
    METAL: 'Metal',
  }

  return dictionary[category]
}

function getCategoryColor(category: WasteCategory): string {
  const dictionary: Record<WasteCategory, string> = {
    PAPER: '#1e293b',
    CARDBOARD: '#334155',
    PLASTIC: '#3b82f6',
    ORGANIC: '#10b981',
    GLASS: '#f59e0b',
    METAL: '#6b7280',
  }

  return dictionary[category]
}

function buildAlerts(summary: ContainerSummaryRecord[]) {
  return summary
    .filter((item) => item.state === 'FULL' || item.state === 'LIMIT')
    .slice(0, 3)
    .map((item, index) => ({
      id: index + 1,
      type: item.state === 'FULL' ? 'danger' : 'warning',
      title:
        item.state === 'FULL'
          ? 'Contenedor lleno'
          : 'Contenedor en limite de capacidad',
      location: formatCategoryLabel(item.category),
    }))
}

function countByState(summary: ContainerSummaryRecord[], state: ContainerState) {
  return summary.filter((item) => item.state === state).length
}

export function useDashboard() {
  const stats = ref([
    {
      label: 'Contenedores monitoreados',
      value: '0',
      unit: '',
      trend: '0',
      trendDesc: 'en estado FULL',
      trendUp: true,
    },
  ])

  const topCategory = ref({
    label: 'Categoria Mayor Volumen',
    value: 'Sin datos',
    percentage: 0,
    info: 'Sin volumen registrado.',
  })

  const alerts = ref<
    Array<{ id: number; type: string; title: string; location: string }>
  >([])

  const chartData = ref<Array<{ label: string; value: number; color: string }>>(
    [],
  )

  const history = ref<
    Array<{ date: string; location: string; category: string; amount: string }>
  >([])

  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDashboardData() {
    loading.value = true
    error.value = null

    try {
      const [summary, volumes] = await Promise.all([
        getContainersSummary(),
        getVolumeByCategory(),
      ])

      const fullContainers = countByState(summary, 'FULL')
      const limitContainers = countByState(summary, 'LIMIT')

      stats.value = [
        {
          label: 'Contenedores monitoreados',
          value: String(summary.length),
          unit: '',
          trend: String(fullContainers),
          trendDesc: 'en estado FULL',
          trendUp: fullContainers === 0,
        },
      ]

      alerts.value = buildAlerts(summary)

      const totalWeight = volumes.reduce((sum, item) => {
        return sum + item.totalWeight
      }, 0)

      const sortedVolumes = [...volumes].sort((a, b) => {
        return b.totalWeight - a.totalWeight
      })

      const [top] = sortedVolumes
      if (top) {
        topCategory.value = {
          label: 'Categoria Mayor Volumen',
          value: formatCategoryLabel(top.category),
          percentage:
            totalWeight > 0
              ? Math.round((top.totalWeight / totalWeight) * 100)
              : 0,
          info: `Equivalente a ${top.totalWeight.toFixed(1)} kg de material.`,
        }
      } else {
        topCategory.value = {
          label: 'Categoria Mayor Volumen',
          value: 'Sin datos',
          percentage: 0,
          info: 'Sin volumen registrado.',
        }
      }

      chartData.value = sortedVolumes.map((item) => ({
        label: formatCategoryLabel(item.category),
        value:
          totalWeight > 0 ? Math.round((item.totalWeight / totalWeight) * 100) : 0,
        color: getCategoryColor(item.category),
      }))

      history.value = sortedVolumes.slice(0, 4).map((item) => ({
        date: 'Actual',
        location:
          item.category === 'PAPER' || item.category === 'CARDBOARD'
            ? 'Area papel/carton'
            : 'Area de clasificacion',
        category: item.category,
        amount: `${item.totalWeight.toFixed(1)} kg`,
      }))

      if (alerts.value.length === 0 && summary.length > 0) {
        alerts.value = [
          {
            id: 1,
            type: 'warning',
            title: 'Sin alertas criticas',
            location: 'Todos los contenedores estables',
          },
        ]
      }

      if (summary.length > 0 && limitContainers > 0 && alerts.value.length < 3) {
        alerts.value.push({
          id: alerts.value.length + 1,
          type: 'warning',
          title: 'Contenedores en limite',
          location: `${limitContainers} contenedores en estado LIMIT`,
        })
      }
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        error.value = caughtError.message
      } else {
        error.value = 'No se pudo cargar la informacion del dashboard.'
      }
    } finally {
      loading.value = false
    }
  }

  if (getCurrentInstance()) {
    onMounted(() => {
      void loadDashboardData()
    })
  } else {
    void loadDashboardData()
  }

  return {
    stats,
    topCategory,
    alerts,
    chartData,
    history,
    loading,
    error,
    recargar: loadDashboardData,
  }
}
