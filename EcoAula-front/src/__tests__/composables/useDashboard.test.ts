import { waitFor } from '@testing-library/vue'

import { useDashboard } from '@/composables/useDashboard'

describe('useDashboard', () => {
  it('loads dashboard data from containers endpoints', async () => {
    const dashboard = useDashboard()

    await waitFor(() => {
      expect(dashboard.loading.value).toBe(false)
      expect(dashboard.error.value).toBeNull()
      expect(dashboard.stats.value).toHaveLength(1)
      expect(dashboard.topCategory.value.percentage).toBeGreaterThan(0)
      expect(dashboard.alerts.value.length).toBeGreaterThan(0)
      expect(dashboard.chartData.value.length).toBeGreaterThan(0)
      expect(dashboard.history.value.length).toBeGreaterThan(0)
    })
  })
})
