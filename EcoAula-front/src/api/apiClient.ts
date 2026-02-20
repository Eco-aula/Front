type JsonRecord = Record<string, unknown>

export class ApiError extends Error {
  status: number
  payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

const API_V1_PATH = '/api/v1'
const LOCAL_DEV_API_ORIGIN = 'http://localhost:8080'
const PRODUCTION_API_ORIGIN = 'https://ecoaula-backend.onrender.com'
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1'])

function normalizeBaseUrl(rawBaseUrl: string): string {
  const trimmed = rawBaseUrl.replace(/\/$/, '')
  if (trimmed.endsWith(API_V1_PATH)) {
    return trimmed
  }
  return `${trimmed}${API_V1_PATH}`
}

function resolveRuntimeHostname(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  return window.location.hostname.toLowerCase()
}

function resolveDefaultApiOrigin(): string {
  if (import.meta.env.PROD) {
    return PRODUCTION_API_ORIGIN
  }

  const runtimeHostname = resolveRuntimeHostname()
  if (runtimeHostname && LOCAL_HOSTNAMES.has(runtimeHostname)) {
    return LOCAL_DEV_API_ORIGIN
  }

  return PRODUCTION_API_ORIGIN
}

function resolveApiBaseUrl(): string {
  const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
  const rawBaseUrl =
    configuredApiUrl && configuredApiUrl.length > 0
      ? configuredApiUrl
      : resolveDefaultApiOrigin()

  return normalizeBaseUrl(rawBaseUrl)
}

function buildUrl(path: string): string {
  const apiBaseUrl = resolveApiBaseUrl()

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  if (path.startsWith('/')) {
    return `${apiBaseUrl}${path}`
  }
  return `${apiBaseUrl}/${path}`
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const message = (payload as JsonRecord).message
    if (typeof message === 'string' && message.trim().length > 0) {
      return message
    }
  }

  if (typeof payload === 'string' && payload.trim().length > 0) {
    return payload
  }

  return fallback
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  if (response.status === 204) {
    return undefined as T
  }

  const contentType = response.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const fallbackMessage = `Error ${response.status}`
    throw new ApiError(
      extractErrorMessage(payload, fallbackMessage),
      response.status,
      payload,
    )
  }

  return payload as T
}

export const apiClient = {
  get<T>(path: string): Promise<T> {
    return request<T>(path)
  },
  post<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    return request<TResponse>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
  put<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    return request<TResponse>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  },
  patch<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    return request<TResponse>(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  },
  delete(path: string): Promise<void> {
    return request<void>(path, {
      method: 'DELETE',
    })
  },
}
