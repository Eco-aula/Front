import { ref } from 'vue'

export function useDashboard() {
  const stats = ref([
    {
      label: 'Residuos Totales Mensuales',
      value: '1,245',
      unit: 'kg',
      trend: '12.4%',
      trendDesc: 'respecto al mes anterior',
      trendUp: true
    }
  ])

  const topCategory = ref({
    label: 'Categoría Mayor Volumen',
    value: 'Papel y Cartón',
    percentage: 65,
    info: 'Equivalente a 809 kg de material recolectado.'
  })

  const alerts = ref([
    {
      id: 1,
      type: 'danger',
      title: 'Contenedor Lleno',
      location: 'Punto Limpio - Bloque A (Papel)'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Retirada Pendiente',
      location: 'Patio Central - Programado 14:00'
    }
  ])

  const chartData = ref([
    { label: 'Papel/Cartón', value: 45, color: '#1e293b' },
    { label: 'Plástico', value: 25, color: '#3b82f6' },
    { label: 'Orgánico', value: 20, color: '#10b981' },
    { label: 'Vidrio', value: 10, color: '#f59e0b' }
  ])

  const history = ref([
    { date: '14 May, 09:20', location: 'Bloque A', category: 'PAPEL', amount: '24 kg' },
    { date: '14 May, 08:45', location: 'Patio Central', category: 'ORGÁNICO', amount: '15 kg' },
    { date: '13 May, 16:15', location: 'Laboratorio', category: 'PLÁSTICO', amount: '8 kg' },
    { date: '13 May, 11:30', location: 'Cafetería', category: 'VIDRIO', amount: '32 kg' }
  ])

  return {
    stats,
    topCategory,
    alerts,
    chartData,
    history
  }
}
