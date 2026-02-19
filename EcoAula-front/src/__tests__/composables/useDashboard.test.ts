import { useDashboard } from '@/composables/useDashboard'

describe('useDashboard', () => {
  it('exposes seeded dashboard data', () => {
    const dashboard = useDashboard()

    expect(dashboard.stats.value).toHaveLength(1)
    expect(dashboard.topCategory.value.percentage).toBeGreaterThan(0)
    expect(dashboard.alerts.value.length).toBeGreaterThan(0)
    expect(dashboard.chartData.value.length).toBeGreaterThan(0)
    expect(dashboard.history.value.length).toBeGreaterThan(0)
  })
})
