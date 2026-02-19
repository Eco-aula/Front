import type { RegistrarFormData } from '@/types/residuos'
import { WASTE_TYPE_VALUES } from '@/types/residuos'

export interface RegistrarFormErrors {
  name?: string
  wasteType?: string
  quantity?: string
  date?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: RegistrarFormErrors
}

const VALID_WASTE_TYPES = new Set(WASTE_TYPE_VALUES)

export function validateRegistrarForm(
  formData: RegistrarFormData,
): ValidationResult {
  const errors: RegistrarFormErrors = {}
  const quantity = Number.parseFloat(formData.quantity)

  if (formData.name.trim().length < 3) {
    errors.name = 'Ingrese un nombre valido (minimo 3 caracteres).'
  }

  if (!VALID_WASTE_TYPES.has(formData.wasteType)) {
    errors.wasteType = 'Seleccione un tipo de residuo valido.'
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    errors.quantity = 'Ingrese una cantidad mayor que 0.'
  }

  if (!(formData.date instanceof Date) || Number.isNaN(formData.date.getTime())) {
    errors.date = 'Seleccione una fecha valida.'
  } else if (formData.date.getTime() > Date.now()) {
    errors.date = 'La fecha no puede estar en el futuro.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
