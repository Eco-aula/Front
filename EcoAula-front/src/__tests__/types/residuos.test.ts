import { RESIDUO_STATUS_VALUES, WASTE_TYPE_VALUES } from '@/types/residuos'

describe('residuos runtime constants', () => {
  it('exposes supported status and waste type values', () => {
    expect(RESIDUO_STATUS_VALUES).toEqual(['pendiente', 'recogido'])
    expect(WASTE_TYPE_VALUES).toEqual(
      expect.arrayContaining([
        'papel',
        'plastico',
        'vidrio',
        'organico',
        'carton',
        'metal',
      ]),
    )
  })
})
