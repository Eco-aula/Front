import { useAlertas } from '@/composables/useAlertas'

describe('useAlertas', () => {
  it('filters alerts by priority and resets pagination', () => {
    const alertas = useAlertas()

    alertas.goToPage(2)
    expect(alertas.currentPage.value).toBe(2)

    alertas.setFiltro('alta')
    expect(alertas.currentPage.value).toBe(1)
    expect(alertas.alertasFiltradas.value.every((a) => a.prioridad === 'alta')).toBe(
      true,
    )
  })

  it('advances alert workflow until resolved', () => {
    const alertas = useAlertas()

    const firstAlert = alertas.alertasFiltradas.value[0]
    expect(firstAlert?.estado).toBe('iniciada')

    if (!firstAlert) {
      throw new Error('Expected seeded alert data')
    }

    alertas.gestionarAlerta(firstAlert.id)
    expect(alertas.alertasFiltradas.value[0]?.estado).toBe('proceso')

    alertas.gestionarAlerta(firstAlert.id)
    expect(alertas.alertasFiltradas.value[0]?.estado).toBe('resuelta')

    alertas.gestionarAlerta(firstAlert.id)
    expect(alertas.alertasFiltradas.value[0]?.estado).toBe('resuelta')
  })
})
