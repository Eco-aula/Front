import type {
  CreateResiduoInput,
  CreateResiduoRequest,
  ResiduoApiRecord,
  ResiduoItem,
} from '@/types/residuos'

interface WasteTypeMeta {
  label: string
  icon: string
}

const DEFAULT_WASTE_META: WasteTypeMeta = {
  label: 'Residuo',
  icon: 'description',
}

const WASTE_TYPES: Record<string, WasteTypeMeta> = {
  papel: { label: 'Papel y Carton', icon: 'description' },
  carton: { label: 'Papel y Carton', icon: 'description' },
  plastico: { label: 'Plasticos (PET)', icon: 'recycling' },
  quimico: { label: 'Residuos Quimicos', icon: 'science' },
  organico: { label: 'Organicos', icon: 'restaurant' },
  vidrio: { label: 'Vidrio', icon: 'wine_bar' },
  metal: { label: 'Metal', icon: 'hardware' },
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function getWasteTypeMetadata(rawWasteType: string): WasteTypeMeta {
  const normalizedType = normalizeText(rawWasteType)
  return WASTE_TYPES[normalizedType] ?? {
    ...DEFAULT_WASTE_META,
    label: rawWasteType,
  }
}

export function getWasteTypeKeyFromLabel(label: string): string {
  const normalizedLabel = normalizeText(label)
  const entry = Object.entries(WASTE_TYPES).find(([, meta]) => {
    return normalizeText(meta.label) === normalizedLabel
  })
  return entry?.[0] ?? normalizedLabel
}

export function formatResiduoQuantity(quantityKg: number): string {
  return `${quantityKg.toLocaleString('es-ES', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} kg`
}

export function formatResiduoDate(rawDate: string): string {
  const parsedDate = new Date(rawDate)
  if (Number.isNaN(parsedDate.getTime())) {
    return rawDate
  }
  return DATE_FORMATTER.format(parsedDate)
}

export function toResiduoItem(record: ResiduoApiRecord): ResiduoItem {
  const metadata = getWasteTypeMetadata(record.wasteType)

  return {
    id: record.id,
    tipo: metadata.label,
    icon: metadata.icon,
    cantidad: formatResiduoQuantity(record.quantityKg),
    fecha: formatResiduoDate(record.createdAt),
    estado: record.status,
  }
}

export function toCreateResiduoRequest(
  input: CreateResiduoInput,
): CreateResiduoRequest {
  return {
    name: input.name.trim(),
    wasteType: normalizeText(input.wasteType),
    quantityKg: Number(input.quantity),
    createdAt: input.date,
    observations: input.observations.trim(),
  }
}

export function buildLocalResiduo(
  input: CreateResiduoInput,
  id: number,
): ResiduoItem {
  const metadata = getWasteTypeMetadata(input.wasteType)

  return {
    id,
    tipo: metadata.label,
    icon: metadata.icon,
    cantidad: formatResiduoQuantity(input.quantity),
    fecha: formatResiduoDate(input.date),
    estado: 'pendiente',
  }
}
