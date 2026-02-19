import {
  buildLocalResiduo,
  formatResiduoDate,
  formatResiduoQuantity,
  getWasteTypeKeyFromLabel,
  getWasteTypeMetadata,
  toCreateResiduoRequest,
  toResiduoItem,
} from '@/utils/residuos'

describe('residuos utils', () => {
  it('returns metadata for known waste types and fallback for unknown ones', () => {
    expect(getWasteTypeMetadata('plastico')).toMatchObject({
      label: 'Plasticos (PET)',
      icon: 'recycling',
    })

    expect(getWasteTypeMetadata('desconocido')).toMatchObject({
      label: 'desconocido',
      icon: 'description',
    })
  })

  it('maps labels to normalized keys', () => {
    expect(getWasteTypeKeyFromLabel('Papel y Carton')).toBe('papel')
    expect(getWasteTypeKeyFromLabel('Plasticos (PET)')).toBe('plastico')
    expect(getWasteTypeKeyFromLabel('OTRO TIPO')).toBe('otro tipo')
  })

  it('formats quantity and date for table display', () => {
    expect(formatResiduoQuantity(12.5)).toBe('12,5 kg')
    expect(formatResiduoDate('2023-10-24T10:00:00.000Z')).toContain('2023')
    expect(formatResiduoDate('fecha invalida')).toBe('fecha invalida')
  })

  it('converts create payload and api records', () => {
    expect(
      toCreateResiduoRequest({
        name: '  Maria  ',
        wasteType: ' Plastico ',
        quantity: 9.2,
        date: '2023-10-25T12:00:00.000Z',
        observations: '  Limpio ',
      }),
    ).toEqual({
      name: 'Maria',
      wasteType: 'plastico',
      quantityKg: 9.2,
      createdAt: '2023-10-25T12:00:00.000Z',
      observations: 'Limpio',
    })

    expect(
      toResiduoItem({
        id: 100,
        wasteType: 'quimico',
        quantityKg: 3,
        createdAt: '2023-10-22T10:00:00.000Z',
        status: 'pendiente',
        createdBy: 'Ana',
      }),
    ).toMatchObject({
      id: 100,
      tipo: 'Residuos Quimicos',
      icon: 'science',
      estado: 'pendiente',
    })
  })

  it('builds fallback items for local mode', () => {
    const item = buildLocalResiduo(
      {
        name: 'Test',
        wasteType: 'metal',
        quantity: 2,
        date: '2024-01-01T10:00:00.000Z',
        observations: '',
      },
      77,
    )

    expect(item).toMatchObject({
      id: 77,
      tipo: 'Metal',
      icon: 'hardware',
      estado: 'pendiente',
    })
    expect(item.cantidad).toContain('kg')
  })
})
