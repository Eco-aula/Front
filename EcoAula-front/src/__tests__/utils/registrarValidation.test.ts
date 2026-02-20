import { validateRegistrarForm } from '@/utils/registrarValidation'

describe('validateRegistrarForm', () => {
  it('returns errors for invalid input', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const result = validateRegistrarForm({
      name: 'ab',
      wasteType: 'tipo-invalido',
      quantity: '0',
      date: tomorrow,
      observations: '',
    })

    expect(result.isValid).toBe(false)
    expect(result.errors).toMatchObject({
      name: expect.any(String),
      wasteType: expect.any(String),
      quantity: expect.any(String),
      date: expect.any(String),
    })
  })

  it('accepts a valid form', () => {
    const result = validateRegistrarForm({
      name: 'Maria Rodriguez',
      wasteType: 'papel',
      quantity: '15.5',
      date: new Date('2023-12-01T10:00:00.000Z'),
      observations: 'Ok',
    })

    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
  })
})
